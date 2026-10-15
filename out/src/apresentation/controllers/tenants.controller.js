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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tenants_service_1 = require("../../application/tenant/tenants.service");
const tenant_dto_1 = require("../dto/tenant.dto");
let TenantsController = class TenantsController {
    tenantsService;
    constructor(tenantsService) {
        this.tenantsService = tenantsService;
    }
    async create(dto) {
        const { tenant, organization } = await this.tenantsService.create(dto);
        return {
            id: tenant.id,
            key: tenant.key,
            status: tenant.status,
            createdAt: tenant.createdAt,
            organization,
        };
    }
    async findAll() {
        const tenants = await this.tenantsService.findAll();
        return tenants.map((tenant) => ({
            id: tenant.id,
            key: tenant.key,
            status: tenant.status,
            createdAt: tenant.createdAt,
            organization: null,
        }));
    }
    async findOne(id) {
        const { tenant, organization } = await this.tenantsService.findOne(id);
        return {
            id: tenant.id,
            key: tenant.key,
            status: tenant.status,
            createdAt: tenant.createdAt,
            organization,
        };
    }
    async updateStatus(id, dto) {
        await this.tenantsService.updateStatus(id, dto);
    }
    async updateOrganization(id, dto) {
        await this.tenantsService.updateOrganization(id, dto);
    }
    async getOrganization(id) {
        const { organization } = await this.tenantsService.findOne(id);
        return organization;
    }
    async updateOrg(id, dto) {
        await this.tenantsService.updateOrganization(id, dto);
    }
};
exports.TenantsController = TenantsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar um novo Tenant',
        description: 'Cria um tenant e sua respectiva organização atrelada simultaneamente.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Tenant e Organização criados com sucesso.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tenant_dto_1.CreateTenantDto]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Listar todos os Tenants',
        description: 'Retorna uma lista de todos os tenants existentes.',
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Obter detalhes de Tenant específico',
        description: 'Retorna os detalhes de um tenant específico, incluindo sua organização associada.',
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar o status de um Tenant',
        description: 'Atualiza o status de um tenant específico. O status pode ser ACTIVE, INACTIVE ou SUSPENDED.',
    }),
    (0, common_1.Patch)(':id/status'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tenant_dto_1.UpdateTenantStatusDto]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "updateStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar os detalhes da organização de um Tenant',
        description: 'Atualiza os detalhes da organização associada a um tenant específico.',
    }),
    (0, common_1.Patch)(':id/organization'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tenant_dto_1.UpdateOrganizationDto]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "updateOrganization", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Obter detalhes da organização de um Tenant específico',
        description: 'Retorna os detalhes da organização associada a um tenant específico.',
    }),
    (0, common_1.Get)(':id/organization'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "getOrganization", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar os detalhes da organização de um Tenant',
        description: 'Atualiza os detalhes da organização associada a um tenant específico.',
    }),
    (0, common_1.Patch)(':id/organization'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tenant_dto_1.UpdateOrganizationDto]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "updateOrg", null);
exports.TenantsController = TenantsController = __decorate([
    (0, swagger_1.ApiTags)('Tenants'),
    (0, common_1.Controller)('tenants'),
    __metadata("design:paramtypes", [tenants_service_1.TenantsService])
], TenantsController);
//# sourceMappingURL=tenants.controller.js.map