import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);

function normalizePassword(value: string): string {
  return value.normalize('NFKC');
}

export async function hashPassword(password: string): Promise<string> {
  const normalized = normalizePassword(password);
  const salt = randomBytes(16).toString('hex');
  const derived = (await scrypt(normalized, salt, 64)) as Buffer;
  return `scrypt:${salt}:${derived.toString('hex')}`;
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  const [algorithm, salt, storedHash] = passwordHash.split(':');
  if (algorithm !== 'scrypt' || !salt || !storedHash) {
    return false;
  }

  const normalized = normalizePassword(password);
  const derived = (await scrypt(normalized, salt, 64)) as Buffer;
  const stored = Buffer.from(storedHash, 'hex');
  if (stored.length !== derived.length) {
    return false;
  }

  return timingSafeEqual(stored, derived);
}
