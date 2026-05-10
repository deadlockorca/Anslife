import { createHash, randomBytes } from 'node:crypto';
import type { NextResponse } from 'next/server';
import {
  createUserSession,
  deleteUserSessionByTokenHash,
  getUserSessionByTokenHash,
} from '../repositories/sessionRepository';

export const SESSION_COOKIE_NAME = 'anslife_session';
const SESSION_TTL_DAYS_DEFAULT = 7;
const SECONDS_PER_DAY = 24 * 60 * 60;
const SESSION_TOKEN_BYTES = 32;

function shouldUseSecureCookie(): boolean {
  const explicit = process.env.APP_SESSION_COOKIE_SECURE?.trim();
  if (explicit === '1') {
    return true;
  }
  if (explicit === '0') {
    return false;
  }

  if (process.env.NODE_ENV !== 'production') {
    return false;
  }

  const siteUrlRaw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (siteUrlRaw) {
    try {
      const siteUrl = new URL(siteUrlRaw);
      return siteUrl.protocol === 'https:';
    } catch {
      // Fall through to safe production default.
    }
  }

  return true;
}

export interface SessionPayload {
  sessionId: number;
  userId: number;
  expiresAt: Date;
}

interface SessionIssueInput {
  userId: number;
  ttlDays?: number;
}

function hashSessionToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export async function issueSessionToken(input: SessionIssueInput): Promise<string> {
  const token = randomBytes(SESSION_TOKEN_BYTES).toString('hex');
  const ttlSeconds = Math.max(1, (input.ttlDays ?? SESSION_TTL_DAYS_DEFAULT) * SECONDS_PER_DAY);
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

  await createUserSession({
    userId: input.userId,
    tokenHash: hashSessionToken(token),
    expiresAt,
  });

  return token;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  const normalizedToken = token.trim();
  if (!normalizedToken) {
    return null;
  }

  const session = await getUserSessionByTokenHash(hashSessionToken(normalizedToken));
  if (!session) {
    return null;
  }

  return {
    sessionId: session.id,
    userId: session.userId,
    expiresAt: session.expiresAt,
  };
}

export async function revokeSessionToken(token: string): Promise<void> {
  const normalizedToken = token.trim();
  if (!normalizedToken) {
    return;
  }
  await deleteUserSessionByTokenHash(hashSessionToken(normalizedToken));
}

export function attachSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: shouldUseSecureCookie(),
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_DAYS_DEFAULT * SECONDS_PER_DAY,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: shouldUseSecureCookie(),
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
