import mysql from 'mysql2/promise';

type DbPool = mysql.Pool;

declare global {
  var __anslifeDbPool: DbPool | undefined;
  var __anslifeDbSchemaReady: boolean | undefined;
  var __anslifeDbSchemaPromise: Promise<boolean> | undefined;
}

function createDbPool(): DbPool | null {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    return null;
  }

  return mysql.createPool({
    uri: databaseUrl,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_POOL_LIMIT ?? 5),
    queueLimit: 0,
  });
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getDbPool(): DbPool | null {
  if (!isDatabaseConfigured()) {
    return null;
  }

  if (!globalThis.__anslifeDbPool) {
    globalThis.__anslifeDbPool = createDbPool() ?? undefined;
  }

  return globalThis.__anslifeDbPool ?? null;
}

export async function ensureDatabaseSchema(): Promise<boolean> {
  if (!isDatabaseConfigured()) {
    return false;
  }

  if (globalThis.__anslifeDbSchemaReady) {
    return true;
  }

  if (globalThis.__anslifeDbSchemaPromise) {
    return globalThis.__anslifeDbSchemaPromise;
  }

  globalThis.__anslifeDbSchemaPromise = (async () => {
    const pool = getDbPool();
    if (!pool) {
      return false;
    }

    try {
      const connection = await pool.getConnection();
      try {
        // Schema is managed by Prisma migrations.
        await connection.query('SELECT 1');
      } finally {
        connection.release();
      }

      globalThis.__anslifeDbSchemaReady = true;
      return true;
    } catch (error) {
      console.error('[DB] Failed to initialize schema:', error);
      globalThis.__anslifeDbSchemaReady = false;
      return false;
    }
  })();

  const ready = await globalThis.__anslifeDbSchemaPromise;
  globalThis.__anslifeDbSchemaPromise = undefined;
  return ready;
}
