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
let TenantsService = class TenantsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        await this.assertRegionalConfigAvailable(dto.regionalConfigId);
        const tenant = tenant_entity_1.TenantEntity.create();
        const organization = organization_entity_1.OrganizationEntity.createIsValid({
            tenantId: tenant.id,
            legalName: dto.legalName,
            tradeName: dto.tradeName,
            cnpjDigits: dto.cnpjDigits,
            taxProfile: dto.taxProfile,
            regionalConfigId: dto.regionalConfigId,
        });
        await this.prisma.$transaction([
            this.prisma.tenant.create({ data: tenant }),
            this.prisma.organization.create({ data: organization }),
        ]);
        return { tenant, organization };
    }
    async findAll() {
        const rows = await this.prisma.tenant.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return rows.map((row) => tenant_entity_1.TenantEntity.restore(row));
    }
    async findOne(id) {
        const row = await this.prisma.tenant.findUnique({
            where: { id },
            include: { organization: { include: { regionalConfig: true } } },
        });
        if (!row)
            throw new common_1.NotFoundException('Tenant não encontrado.');
        const tenant = tenant_entity_1.TenantEntity.restore(row);
        const organization = row.organization
            ? organization_entity_1.OrganizationEntity.restore(row.organization)
            : null;
        return { tenant, organization };
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
            await this.assertRegionalConfigAvailable(fields.regionalConfigId);
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
    async assertRegionalConfigAvailable(id) {
        const config = await this.prisma.regionalConfiguration.findUnique({
            where: { id },
        });
        if (!config || !config.active) {
            throw new common_1.BadRequestException('Configuração regional invalida ou indísponivel');
        }
    }
};
exports.TenantsService = TenantsService;
exports.TenantsService = TenantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TenantsService);
//# sourceMappingURL=tenants.service.js.map