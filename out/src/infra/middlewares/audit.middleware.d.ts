import { NestMiddleware } from '@nestjs/common';
import { PrismaService } from "../../prisma/prisma.service";
import { Request, Response, NextFunction } from 'express';
export declare class AuditMiddleware implements NestMiddleware {
    private readonly prisma;
    constructor(prisma: PrismaService);
    use(req: Request, resp: Response, next: NextFunction): Promise<void>;
}
