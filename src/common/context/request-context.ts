import { NextFunction, Request, Response } from 'express';
import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

export interface RequestContext {
  correlationId: string;
  actorId: string;
  role: string;
  origin: string;
}

const storage = new AsyncLocalStorage<RequestContext>();

const SAFE_ID = /^[A-Za-z0-9._-]{1,64}$/;

function header(req: Request, name: string, fallback: string): string {
  const value = req.header(name);
  return value && SAFE_ID.test(value) ? value : fallback;
}

export function requestContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const correlationId = header(req, 'x-correlation-id', randomUUID());
  res.setHeader('x-correlation-id', correlationId);

  storage.run(
    {
      correlationId,
      // PROVISÓRIO: sem autenticação, ator e papel vêm de cabeçalho
      // Trocar pela identidade validada quando existir
      actorId: header(req, 'x-actor-id', 'anonymous'),
      role: header(req, 'x-actor-role', 'unknown'),
      origin: `${req.method} ${req.path}`,
    },
    next,
  );
}

export function currentContext(): RequestContext {
  return (
    storage.getStore() ?? {
      correlationId: randomUUID(),
      actorId: 'system',
      role: 'system',
      origin: 'internal',
    }
  );
}
