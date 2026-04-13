import type { NextRequest } from 'next/server';
import type { ActorScope, AppRole } from './authorization';
import { SESSION_COOKIE_NAME, revokeSessionToken, verifySessionToken } from './session';
import { getUserAuthContextById } from '../repositories/userRepository';

export interface AuthActor {
  userId: number;
  email: string;
  fullName: string;
  roles: AppRole[];
  scopes: ActorScope[];
}

export function hasRole(actor: AuthActor, role: AppRole): boolean {
  return actor.roles.includes(role);
}

export function isSuperAdmin(actor: AuthActor): boolean {
  return hasRole(actor, 'super_admin');
}

export function isSystemAdmin(actor: AuthActor): boolean {
  return hasRole(actor, 'system_admin');
}

export function getRequestIp(request: NextRequest): string | null {
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0]?.trim() ?? null;
  }

  return null;
}

export async function getAuthActor(request: NextRequest): Promise<AuthActor | null> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    return null;
  }

  const user = await getUserAuthContextById(payload.userId);
  if (!user || !user.isActive) {
    await revokeSessionToken(token);
    return null;
  }

  return {
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    roles: user.roles,
    scopes: user.scopes,
  };
}
