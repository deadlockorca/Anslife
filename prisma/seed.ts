import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Single-admin mode does not require RBAC seed data.
  await prisma.$queryRaw`SELECT 1`;
  console.log('[seed] Single-admin mode: no RBAC seed required.');
}

main()
  .catch((error) => {
    console.error('[seed] Failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
