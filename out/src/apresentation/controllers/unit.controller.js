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
exports.UnitController = void 0;
const common_1 = require("@nestjs/common");
const unit_service_1 = require("../../application/unit/unit.service");
const unit_dto_1 = require("../dto/unit.dto");
const swagger_1 = require("@nestjs/swagger");
let UnitController = class UnitController {
    unitService;
    constructor(unitService) {
        this.unitService = unitService;
    }
    async create(organizationId, dto) {
        return this.unitService.create(organizationId, dto);
    }
    async findAll(organizationId) {
        return this.unitService.findAllByOrganization(organizationId);
    }
    async findOne(organizationId, id) {
        return this.unitService.findOne(id, organizationId);
    }
    async update(organizationId, id, dto) {
        return this.unitService.update(id, organizationId, dto);
    }
    async activate(organizationId, id) {
        return this.unitService.activate(id, organizationId);
    }
    async block(organizationId, id, dto) {
        return this.unitService.block(id, organizationId, dto);
    }
};
exports.UnitController = UnitController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar uma nova Unidade',
        description: 'Cadastra uma nova unidade em estado RASCUNHO vinculada à organização informada.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'organizationId',
        description: 'UUID da organização à qual a unidade pertencerá',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Unidade criada com sucesso (status RASCUNHO).',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Organização inativa ou dados inválidos.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Organização não encontrada.',
    }),
    __param(0, (0, common_1.Param)('organizationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, unit_dto_1.CreateUnitDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar Unidades de uma Organização',
        description: 'Retorna uma lista de todas as unidades associadas à organização especificada.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'organizationId',
        description: 'UUID da organização cujas unidades serão listadas',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de unidades retornada com sucesso.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Organização não encontrada.' }),
    __param(0, (0, common_1.Param)('organizationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obter detalhes de uma Unidade',
    }),
    (0, swagger_1.ApiParam)({
        name: 'organizationId',
        description: 'UUID da organização à qual a unidade pertence',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'UUID da unidade que deseja consultar',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Unidade encontrada com sucesso.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Unidade não encontrada nesta organização.',
    }),
    __param(0, (0, common_1.Param)('organizationId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar uma Unidade',
        description: 'Atualiza os dados de uma unidade específica associada à organização informada.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'organizationId',
        description: 'UUID da organização dona da unidade',
        example: '681fd794-7645-4fe6-aa9e-f1034e12e15a',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'UUID da unidade que será atualizada',
        example: '47a7b933-2f5b-4aa4-86f9-87dc7e8319ec',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Unidade atualizada com sucesso (retorna dados e novo rowVersion).',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados inválidos ou fuso horário inexistente.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Unidade ou organização não encontrada.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflito de versão (rowVersion desatualizado).',
    }),
    __param(0, (0, common_1.Param)('organizationId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, unit_dto_1.UpdateUnitDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/activate'),
    (0, swagger_1.ApiOperation)({
        summary: 'Ativar uma Unidade',
        description: 'Ativa uma unidade específica associada à organização informada.',
    }),
    __param(0, (0, common_1.Param)('organizationId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "activate", null);
__decorate([
    (0, common_1.Patch)(':id/block'),
    (0, swagger_1.ApiOperation)({
        summary: 'Bloquear uma Unidade',
        description: 'Bloqueia uma unidade específica associada à organização informada.',
    }),
    __param(0, (0, common_1.Param)('organizationId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, unit_dto_1.BlockUnitDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "block", null);
exports.UnitController = UnitController = __decorate([
    (0, swagger_1.ApiTags)('Unit'),
    (0, common_1.Controller)('Unit/:organizationId/units'),
    __metadata("design:paramtypes", [unit_service_1.UnitService])
], UnitController);
//# sourceMappingURL=unit.controller.js.map