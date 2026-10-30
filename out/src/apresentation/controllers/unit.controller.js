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
exports.UnitController = UnitController = __decorate([
    (0, swagger_1.ApiTags)('Unit'),
    (0, common_1.Controller)('organizations/:organizationId/units'),
    __metadata("design:paramtypes", [unit_service_1.UnitService])
], UnitController);
//# sourceMappingURL=unit.controller.js.map