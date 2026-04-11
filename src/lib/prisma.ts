/**
 * @file prisma.ts
 * @brief Singleton do cliente Prisma.
 * @description Garante que apenas uma instância do PrismaClient seja criada durante
 *   o ciclo de vida da aplicação, evitando problemas de conexão no modo de
 *   desenvolvimento com hot-reload do Next.js.
 * @module lib/prisma
 */

import { PrismaClient } from '@prisma/client';

/** @brief Extensão do objeto global para persistir a instância do Prisma em dev. */
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

/**
 * @brief Instância singleton do PrismaClient.
 * @description Reutiliza a instância global em desenvolvimento para evitar o
 *   esgotamento do pool de conexões durante o hot-reload do Next.js.
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
