export class AuditEntity {
  readonly id: string;
  tenantId: string;
  unitId: string;
  actor?: string | null;
  action: string;
  object: string;
  result: string;
  occurredAt: Date;
  correlationId: string;

  private constructor(data: AuditEntity) {
    this.id = data.id;
    this.tenantId = data.tenantId;
    this.unitId = data.unitId;
    this.actor = data.actor;
    this.action = data.action;
    this.object = data.object;
    this.result = data.result;
    this.occurredAt = data.occurredAt;
    this.correlationId = data.correlationId;
  }
}
