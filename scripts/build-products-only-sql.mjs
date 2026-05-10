#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_SOURCE_SQL = '/Users/bowthoois/Downloads/toamhoanhao-3.sql';
const DEFAULT_OUTPUT_SQL = 'prisma/sql/toamhoanhao-products-only.sql';
const PRODUCT_TABLES = ['category', 'product', 'productimage', 'productspec'];

const PRODUCT_SCHEMA_SQL = `
-- ======================================================
-- ANSLIFE Products-Only schema (from toamhoanhao)
-- Tables: category, product, productimage, productspec
-- ======================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS \`productspec\`;
DROP TABLE IF EXISTS \`productimage\`;
DROP TABLE IF EXISTS \`product\`;
DROP TABLE IF EXISTS \`category\`;

CREATE TABLE \`category\` (
  \`id\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`name\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`slug\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`description\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`sortOrder\` int NOT NULL DEFAULT '0',
  \`isActive\` tinyint(1) NOT NULL DEFAULT '1',
  \`parentId\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` datetime(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`Category_slug_key\` (\`slug\`),
  KEY \`Category_parentId_idx\` (\`parentId\`),
  CONSTRAINT \`Category_parentId_fkey\`
    FOREIGN KEY (\`parentId\`) REFERENCES \`category\` (\`id\`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`product\` (
  \`id\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`name\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`slug\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`sku\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`description\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`imageUrl\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`price\` int NOT NULL,
  \`originalPrice\` int DEFAULT NULL,
  \`badge\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`tab\` enum('NEW','BEST','SALE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NEW',
  \`isFeatured\` tinyint(1) NOT NULL DEFAULT '0',
  \`inStock\` tinyint(1) NOT NULL DEFAULT '1',
  \`categoryId\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` datetime(3) NOT NULL,
  \`brand\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`dimensions\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`isPublished\` tinyint(1) NOT NULL DEFAULT '1',
  \`material\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`seoDescription\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`seoTitle\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`shortDescription\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`status\` enum('DRAFT','ACTIVE','ARCHIVED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  \`totalSold\` int NOT NULL DEFAULT '0',
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`Product_slug_key\` (\`slug\`),
  UNIQUE KEY \`Product_sku_key\` (\`sku\`),
  KEY \`Product_tab_createdAt_idx\` (\`tab\`,\`createdAt\`),
  KEY \`Product_categoryId_idx\` (\`categoryId\`),
  KEY \`Product_status_isPublished_idx\` (\`status\`,\`isPublished\`),
  CONSTRAINT \`Product_categoryId_fkey\`
    FOREIGN KEY (\`categoryId\`) REFERENCES \`category\` (\`id\`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`productimage\` (
  \`id\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`productId\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`variantId\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`url\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`alt\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  \`isPrimary\` tinyint(1) NOT NULL DEFAULT '0',
  \`sortOrder\` int NOT NULL DEFAULT '0',
  \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` datetime(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`ProductImage_productId_sortOrder_idx\` (\`productId\`,\`sortOrder\`),
  KEY \`ProductImage_variantId_idx\` (\`variantId\`),
  CONSTRAINT \`ProductImage_productId_fkey\`
    FOREIGN KEY (\`productId\`) REFERENCES \`product\` (\`id\`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`productspec\` (
  \`id\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`productId\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`name\` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`value\` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  \`sortOrder\` int NOT NULL DEFAULT '0',
  \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` datetime(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`ProductSpec_productId_sortOrder_idx\` (\`productId\`,\`sortOrder\`),
  CONSTRAINT \`ProductSpec_productId_fkey\`
    FOREIGN KEY (\`productId\`) REFERENCES \`product\` (\`id\`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`.trim();

function parseArgs(argv) {
  const args = {
    source: DEFAULT_SOURCE_SQL,
    output: DEFAULT_OUTPUT_SQL,
  };

  for (let index = 2; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    if (current === '--source' && next) {
      args.source = next;
      index += 1;
      continue;
    }
    if (current === '--output' && next) {
      args.output = next;
      index += 1;
      continue;
    }
  }

  return args;
}

function extractInsertStatements(fullSql, tableName) {
  const pattern = new RegExp(`INSERT INTO \\\`${tableName}\\\`[\\s\\S]*?;`, 'g');
  return fullSql.match(pattern) ?? [];
}

async function main() {
  const { source, output } = parseArgs(process.argv);
  const sourceSql = await fs.readFile(source, 'utf8');

  const insertsByTable = {};
  for (const table of PRODUCT_TABLES) {
    const inserts = extractInsertStatements(sourceSql, table);
    if (inserts.length === 0) {
      throw new Error(
        `Không tìm thấy INSERT cho bảng "${table}" trong file nguồn: ${source}`,
      );
    }
    insertsByTable[table] = inserts;
  }

  const joinedInsertSql = PRODUCT_TABLES.map((table) => {
    const sectionTitle = `-- Data for table \`${table}\``;
    const statements = insertsByTable[table].join('\n\n');
    return `${sectionTitle}\n${statements}`;
  }).join('\n\n');

  const outputSql = `${PRODUCT_SCHEMA_SQL}
${joinedInsertSql}

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
`;

  const absoluteOutput = path.resolve(process.cwd(), output);
  await fs.mkdir(path.dirname(absoluteOutput), { recursive: true });
  await fs.writeFile(absoluteOutput, outputSql, 'utf8');

  console.log(`[build-products-only-sql] Source: ${source}`);
  console.log(`[build-products-only-sql] Output: ${absoluteOutput}`);
  for (const table of PRODUCT_TABLES) {
    console.log(
      `[build-products-only-sql] ${table}: ${insertsByTable[table].length} INSERT statement(s)`,
    );
  }
}

main().catch((error) => {
  console.error('[build-products-only-sql] Failed:', error);
  process.exit(1);
});
