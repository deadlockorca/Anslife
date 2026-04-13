import { NextResponse } from 'next/server';

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

export interface RateLimitInput {
  namespace: string;
  key: string;
  max: number;
  windowMs: number;
  now?: number;
}

export interface RateLimitDecision {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
  resetAt: number;
}

const buckets = new Map<string, RateLimitBucket>();
let operationCount = 0;

function sanitizeKeyPart(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9._:@-]/g, '_').slice(0, 240);
}

function cleanupExpiredBuckets(now: number): void {
  operationCount += 1;
  if (operationCount % 250 !== 0) {
    return;
  }

  for (const [mapKey, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(mapKey);
    }
  }
}

function normalizePositiveInt(value: number, fallback: number): number {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  const parsed = Math.floor(value);
  return parsed > 0 ? parsed : fallback;
}

export function readRateLimitEnv(name: string, fallback: number): number {
  const rawValue = process.env[name];
  if (!rawValue) {
    return fallback;
  }

  const parsed = Number(rawValue);
  return normalizePositiveInt(parsed, fallback);
}

export function consumeRateLimit(input: RateLimitInput): RateLimitDecision {
  const now = input.now ?? Date.now();
  const limit = Math.max(1, Math.floor(input.max));
  const windowMs = Math.max(1000, Math.floor(input.windowMs));
  const mapKey = `${sanitizeKeyPart(input.namespace)}:${sanitizeKeyPart(input.key)}`;

  cleanupExpiredBuckets(now);

  const existing = buckets.get(mapKey);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    const nextBucket: RateLimitBucket = {
      count: 1,
      resetAt,
    };
    buckets.set(mapKey, nextBucket);
    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - 1),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
      resetAt,
    };
  }

  existing.count += 1;
  const remaining = Math.max(0, limit - existing.count);
  if (existing.count > limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
      resetAt: existing.resetAt,
    };
  }

  return {
    allowed: true,
    limit,
    remaining,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    resetAt: existing.resetAt,
  };
}

export function applyRateLimitHeaders(
  response: NextResponse,
  decision: RateLimitDecision,
): NextResponse {
  response.headers.set('X-RateLimit-Limit', String(decision.limit));
  response.headers.set('X-RateLimit-Remaining', String(decision.remaining));
  response.headers.set(
    'X-RateLimit-Reset',
    String(Math.floor(decision.resetAt / 1000)),
  );
  if (!decision.allowed) {
    response.headers.set('Retry-After', String(decision.retryAfterSeconds));
  }

  return response;
}

export function createRateLimitResponse(
  message: string,
  decision: RateLimitDecision,
): NextResponse {
  const response = NextResponse.json(
    {
      ok: false,
      code: 'rate_limit_exceeded',
      message,
    },
    { status: 429 },
  );
  return applyRateLimitHeaders(response, decision);
}
