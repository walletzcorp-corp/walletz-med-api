import { PrismaService } from '../../prisma/prisma.service';
export declare class AuditService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(params: {
        tenantId: string;
        unitId?: string;
        actor?: string;
        action: string;
        object?: string;
        result?: string;
    }): Promise<string>;
    update(eventId: string): Promise<void>;
}
