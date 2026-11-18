import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, resp: Response, next: NextFunction) {
    const ip = req.ip ?? req.socket.remoteAddress;
    const method = req.method;
    const body = req.body;

    next();
  }
}
