export declare class AuditEntity {
    eventId: string;
    tenantId: string;
    unitId?: string;
    actor?: string | null;
    action: string;
    object: string;
    result: string;
    occurredAt: Date;
    correlationId: string;
}
