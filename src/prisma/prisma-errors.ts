import { Prisma } from '@prisma/client';

/** FK violada ao excluir linha ainda referenciada (P2003). */
export function isForeignKeyViolation(err: unknown): boolean {
  return (
    err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2003'
  );
}
