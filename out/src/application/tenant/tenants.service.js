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
exports.TenantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const tenant_entity_1 = require("../../entities/tenant.entity");
const organization_entity_1 = require("../../entities/organization.entity");
const audit_service_1 = require("../audit/audit.service");
let TenantsService = class TenantsService {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async create(dto) {
        await this.VerificarSeRegionalConfiExiste(dto.regionalConfigId);
        const tenant = tenant_entity_1.TenantEntity.create();
        const organization = organization_entity_1.OrganizationEntity.createIsValid({
            tenantId: tenant.id,
            legalName: dto.legalName,
            tradeName: dto.tradeName,
            cnpjDigits: dto.cnpjDigits,
            taxProfile: dto.taxProfile,
            regionalConfigId: dto.regionalConfigId,
        });
        const eventId = await this.audit.create({
            tenantId: organization.tenantId,
            action: 'CREATE_TENANT',
            object: `Tenant:${tenant.id}`,
        });
        await this.prisma.$transaction([
            this.prisma.tenant.create({
                data: {
                    id: tenant.id,
                    key: tenant.key,
                    status: tenant.status,
                    createdAt: tenant.createdAt,
                },
            }),
            this.prisma.organization.create({
                data: {
                    id: organization.id,
                    tenantId: organization.tenantId,
                    legalName: organization.legalName,
                    tradeName: organization.tradeName,
                    cnpjDigits: organization.cnpjDigits,
                    taxProfile: organization.taxProfile,
                    regionalConfigId: organization.regionalConfigId,
                    status: organization.status,
                    rowVersion: organization.rowVersion,
                    createdAt: organization.createdAt,
                    updatedAt: organization.updatedAt,
                },
            }),
        ]);
        tenant.organization = organization;
        return tenant;
    }
    async findAll() {
        const rows = await this.prisma.tenant.findMany({
            orderBy: { createdAt: 'desc' },
            include: { organization: true },
        });
        return rows.map((row) => ({
            tenant: tenant_entity_1.TenantEntity.restore(row),
            organization: row.organization
                ? organization_entity_1.OrganizationEntity.restore(row.organization)
                : null,
        }));
    }
    async findOne(id) {
        const row = await this.prisma.tenant.findUnique({
            where: { id },
            include: { organization: true },
        });
        if (!row)
            throw new common_1.NotFoundException('Tenant não encontrado.');
        return tenant_entity_1.TenantEntity.restore(row);
    }
    async getOrganization() {
        const row = await this.prisma.organization.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return row.map((row) => organization_entity_1.OrganizationEntity.restore(row));
    }
    async updateStatus(id, dto) {
        const row = await this.prisma.tenant.findUnique({ where: { id } });
        if (!row)
            throw new common_1.NotFoundException('Tenant não encontrado.');
        const tenant = tenant_entity_1.TenantEntity.restore(row);
        switch (dto.status) {
            case 'ACTIVE':
                tenant.activate();
                break;
            case 'INACTIVE':
                tenant.deactivate();
                break;
            case 'SUSPENDED':
                tenant.suspend();
                break;
            default:
                throw new common_1.BadRequestException(`Status inválido: ${dto.status}.`);
        }
        await this.prisma.tenant.update({
            where: { id },
            data: { status: tenant.status },
        });
    }
    async updateOrganization(tenantId, dto) {
        const { rowVersion, ...fields } = dto;
        const orgRow = await this.prisma.organization.findUnique({
            where: { tenantId },
        });
        if (fields.regionalConfigId) {
            await this.VerificarSeRegionalConfiExiste(fields.regionalConfigId);
        }
        if (!orgRow)
            throw new common_1.NotFoundException('Organização não encontrada para este tenant.');
        const organization = organization_entity_1.OrganizationEntity.restore(orgRow);
        try {
            organization.update(fields, rowVersion);
        }
        catch (err) {
            if (err.name === 'OrganizationVersionConflictError') {
                throw new common_1.ConflictException(err.message);
            }
            throw new common_1.BadRequestException(err.message);
        }
        await this.prisma.organization.update({
            where: { id: organization.id },
            data: organization,
        });
    }
    async VerificarSeRegionalConfiExiste(id) {
        const entityRegionalConfig = await this.prisma.regionalConfiguration.findUnique({
            where: { id },
        });
        if (!entityRegionalConfig || !entityRegionalConfig.active) {
            throw new common_1.BadRequestException('Configuração regional invalida ou indísponivel');
        }
    }
};
exports.TenantsService = TenantsService;
exports.TenantsService = TenantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], TenantsService);
//# sourceMappingURL=tenants.service.js.map