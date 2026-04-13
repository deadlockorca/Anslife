import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __anslifePrisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'production'
        ? ['error']
        : ['query', 'info', 'warn', 'error'],
  });
}

export const prisma = globalThis.__anslifePrisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__anslifePrisma = prisma;
}
