import { NestMiddleware } from '@nestjs/common';
import { PrismaService } from "../../prisma/prisma.service";
export declare class AuditMiddleware implements NestMiddleware {
    private readonly prisma;
    constructor(prisma: PrismaService);
    use(req: Request, resp: Response, next: Function): Promise<void>;
}
