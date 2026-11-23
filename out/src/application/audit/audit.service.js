"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_entity_1 = require("../../entities/audit.entity");
const crypto_1 = require("crypto");
let AuditService = class AuditService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(params) {
        if (params.tenantId == null || params.tenantId == '')
            throw new common_1.NotFoundException(`tenantId "${params.tenantId}" não pode ser nulo ou vazio`);
        if (params.action == null || params.action == '')
            throw new common_1.NotFoundException(`action "${params.action}" não pode ser nulo ou vazio`);
        const createAt = new Date();
        var auditEntity = new audit_entity_1.AuditEntity();
        auditEntity.eventId = (0, crypto_1.randomUUID)();
        auditEntity.action = params.action;
        auditEntity.actor = params.actor;
        auditEntity.tenantId = params.tenantId;
        auditEntity.object = params.object ?? 'Sem body';
        auditEntity.result = 'In Progress';
        auditEntity.unitId = params.unitId;
        auditEntity.occurredAt = createAt;
        auditEntity.correlationId = (0, crypto_1.randomUUID)();
        await this.prisma.audit.create({
            data: auditEntity,
        });
        return auditEntity.eventId;
    }
    async update(eventId) {
        await this.prisma.audit.update({
            where: { eventId },
            data: {
                result: 'Success',
            },
        });
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditService);
//# sourceMappingURL=audit.service.js.map