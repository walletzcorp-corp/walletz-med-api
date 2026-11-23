import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditEntity } from '../../entities/audit.entity';
import { randomUUID } from 'crypto';
import { TenantEntity } from 'src/entities/tenant.entity';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  //O params solicita para qualquer item/serviço/classe  esses dados para salvar os dados na auditoria
  async create(params: {
    tenantId: string;
    unitId?: string;
    actor?: string;
    action: string;
    object?: string;
    result?: string;
  }) {
    if (params.tenantId == null || params.tenantId == '')
      throw new NotFoundException(
        `tenantId "${params.tenantId}" não pode ser nulo ou vazio`,
      );

    if (params.action == null || params.action == '')
      throw new NotFoundException(
        `action "${params.action}" não pode ser nulo ou vazio`,
      );

    const createAt = new Date();

    var auditEntity = new AuditEntity();

    auditEntity.eventId = randomUUID();
    auditEntity.action = params.action;
    auditEntity.actor = params.actor;
    auditEntity.tenantId = params.tenantId;
    auditEntity.object = params.object ?? 'Sem body'; // BODY QUANDO EXISTIR
    auditEntity.result = 'In Progress';
    auditEntity.unitId = params.unitId;
    auditEntity.occurredAt = createAt;
    auditEntity.correlationId = randomUUID();

    await this.prisma.audit.create({
      data: auditEntity,
    });

    return auditEntity.eventId;
  }

  async update(eventId: string) {
    await this.prisma.audit.update({
      where: { eventId },
      data: {
        result: 'Success',
      },
    });
  }
}
