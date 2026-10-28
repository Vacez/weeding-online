import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

function resolveDatabaseUrl(): string {
  // If an explicit non-file DATABASE_URL is provided (e.g. Postgres / Turso / Neon / MySQL), use it
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('file:')) {
    return process.env.DATABASE_URL;
  }

  // On Vercel or AWS Lambda serverless runtime
  const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
  if (isServerless) {
    const tmpDbPath = '/tmp/dev.db';
    if (!fs.existsSync(tmpDbPath)) {
      const candidates = [
        path.join(process.cwd(), 'prisma', 'dev.db'),
        path.join(process.cwd(), 'dev.db'),
        path.resolve('./prisma/dev.db'),
        path.resolve('./dev.db'),
      ];

      for (const candidate of candidates) {
        if (fs.existsSync(/*turbopackIgnore: true*/ candidate)) {
          try {
            fs.copyFileSync(candidate, tmpDbPath);
            console.log(`[prisma] Copied sqlite database from ${candidate} to ${tmpDbPath}`);
            break;
          } catch (e) {
            console.error(`[prisma] Error copying database from ${candidate}:`, e);
          }
        }
      }
    }

    if (fs.existsSync(tmpDbPath)) {
      return `file:${tmpDbPath}`;
    }
  }

  // Local development / standard server runtime
  const localPrismaDb = path.join(process.cwd(), 'prisma', 'dev.db');
  if (fs.existsSync(localPrismaDb)) {
    return `file:${localPrismaDb}`;
  }

  const localRootDb = path.join(process.cwd(), 'dev.db');
  if (fs.existsSync(localRootDb)) {
    return `file:${localRootDb}`;
  }

  return process.env.DATABASE_URL || 'file:./prisma/dev.db';
}

const dbUrl = resolveDatabaseUrl();
process.env.DATABASE_URL = dbUrl;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
