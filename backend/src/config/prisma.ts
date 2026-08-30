import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient instance across hot reloads in dev instead of
// opening a new connection pool on every file change.
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
