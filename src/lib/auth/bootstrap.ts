import type { ActorScope, AppRole } from './authorization';
import { hashPassword } from './password';
import {
  createUser,
  getUserAuthContextByEmail,
  updateUser,
} from '../repositories/userRepository';
import { writeAuditLog } from '../repositories/auditRepository';

declare global {
  var __anslifeAuthBootstrapReady: boolean | undefined;
  var __anslifeAuthBootstrapPromise: Promise<void> | undefined;
}

interface BootstrapConfig {
  email: string;
  password: string;
  fullName: string;
  roles: AppRole[];
  scopes: ActorScope[];
  rotatePassword: boolean;
}

function getEnvFirst(keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) {
      return value;
    }
  }
  return undefined;
}

function parseFlag(value: string | undefined): boolean {
  return String(value ?? '').trim() === '1';
}

function parseRoles(): AppRole[] {
  return ['super_admin'];
}

function parseScopes(): ActorScope[] {
  return [{ type: 'global', value: '*' }];
}

function getBootstrapConfig(): BootstrapConfig | null {
  const email = getEnvFirst([
    'ADMIN_USERNAME',
    'ADMIN_EMAIL',
    'APP_BOOTSTRAP_ADMIN_EMAIL',
  ])?.toLowerCase();
  const password = getEnvFirst(['ADMIN_PASSWORD', 'APP_BOOTSTRAP_ADMIN_PASSWORD']) ?? '';
  if (!email || !password) {
    return null;
  }

  const rotatePasswordRaw = getEnvFirst([
    'ADMIN_ROTATE_PASSWORD',
    'APP_BOOTSTRAP_ADMIN_ROTATE_PASSWORD',
  ]);

  return {
    email,
    password,
    fullName: getEnvFirst(['ADMIN_FULL_NAME', 'APP_BOOTSTRAP_ADMIN_NAME']) || 'ANSLIFE Super Admin',
    roles: parseRoles(),
    scopes: parseScopes(),
    rotatePassword: parseFlag(rotatePasswordRaw),
  };
}

function mergeRoles(current: AppRole[], target: AppRole[]): AppRole[] {
  return Array.from(new Set([...current, ...target]));
}

function mergeScopes(current: ActorScope[], target: ActorScope[]): ActorScope[] {
  const map = new Map<string, ActorScope>();
  for (const scope of [...current, ...target]) {
    const key = `${scope.type}:${scope.value}`;
    map.set(key, scope);
  }
  return Array.from(map.values());
}

function shouldSyncName(): boolean {
  const syncNameRaw = getEnvFirst(['ADMIN_SYNC_NAME', 'APP_BOOTSTRAP_ADMIN_SYNC_NAME']);
  return parseFlag(syncNameRaw);
}

export async function ensureAuthBootstrap(): Promise<void> {
  if (globalThis.__anslifeAuthBootstrapReady) {
    return;
  }

  if (globalThis.__anslifeAuthBootstrapPromise) {
    await globalThis.__anslifeAuthBootstrapPromise;
    return;
  }

  globalThis.__anslifeAuthBootstrapPromise = (async () => {
    const config = getBootstrapConfig();
    if (!config) {
      globalThis.__anslifeAuthBootstrapReady = true;
      return;
    }

    const existing = await getUserAuthContextByEmail(config.email);
    if (!existing) {
      const passwordHash = await hashPassword(config.password);
      const created = await createUser({
        email: config.email,
        fullName: config.fullName,
        passwordHash,
        isActive: true,
        roles: config.roles,
        scopes: config.scopes,
      });

      await writeAuditLog({
        action: 'bootstrap_create_admin',
        resource: 'user',
        resourceId: String(created.id),
        after: {
          email: created.email,
          roles: created.roles,
          scopes: created.scopes,
        },
      });
      globalThis.__anslifeAuthBootstrapReady = true;
      return;
    }

    const mergedRoles = mergeRoles(existing.roles, config.roles);
    const mergedScopes = mergeScopes(existing.scopes, config.scopes);
    const passwordHash = config.rotatePassword
      ? await hashPassword(config.password)
      : undefined;

    const hasRoleDelta = mergedRoles.length !== existing.roles.length;
    const hasScopeDelta = mergedScopes.length !== existing.scopes.length;
    const nameShouldChange = shouldSyncName() && existing.fullName !== config.fullName;
    const requiresUpdate =
      !existing.isActive ||
      hasRoleDelta ||
      hasScopeDelta ||
      nameShouldChange ||
      Boolean(passwordHash);

    if (!requiresUpdate) {
      globalThis.__anslifeAuthBootstrapReady = true;
      return;
    }

    const updated = await updateUser(existing.id, {
      ...(nameShouldChange ? { fullName: config.fullName } : {}),
      ...(passwordHash ? { passwordHash } : {}),
      isActive: true,
      roles: mergedRoles,
      scopes: mergedScopes,
    });

    await writeAuditLog({
      actorUserId: existing.id,
      action: 'bootstrap_update_admin',
      resource: 'user',
      resourceId: String(existing.id),
      before: {
        roles: existing.roles,
        scopes: existing.scopes,
        isActive: existing.isActive,
      },
      after: {
        roles: updated?.roles ?? mergedRoles,
        scopes: updated?.scopes ?? mergedScopes,
        isActive: true,
      },
    });

    globalThis.__anslifeAuthBootstrapReady = true;
  })();

  try {
    await globalThis.__anslifeAuthBootstrapPromise;
  } catch (error) {
    globalThis.__anslifeAuthBootstrapReady = false;
    throw error;
  } finally {
    globalThis.__anslifeAuthBootstrapPromise = undefined;
  }
}
