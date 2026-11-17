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
exports.BlockUnitDto = exports.UpdateUnitDto = exports.CreateUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUnitDto {
    name;
    country;
    address;
    municipality;
    uf;
    timezone;
}
exports.CreateUnitDto = CreateUnitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome da unidade',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateUnitDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Código do país da unidade (padrão ISO 2 letras). Por enquanto, apenas BR.',
        example: 'BR',
        enum: ['BR'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 2, {
        message: 'O código do país deve ter exatamente 2 caracteres.',
    }),
    __metadata("design:type", String)
], CreateUnitDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Endereço completo da unidade',
        example: 'Av. Paulista, 1000 - Bela Vista',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUnitDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Município da unidade',
        example: 'São Paulo',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUnitDto.prototype, "municipality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UF (Estado) da unidade',
        example: 'SP',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUnitDto.prototype, "uf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fuso horário da unidade',
    }),
    (0, class_validator_1.IsTimeZone)({ message: 'O timezone deve ser um fuso IANA válido' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUnitDto.prototype, "timezone", void 0);
class UpdateUnitDto {
    rowVersion;
    name;
    country;
    address;
    municipality;
    uf;
    timezone;
}
exports.UpdateUnitDto = UpdateUnitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Versão da unidade (rowVersion) para controle de concorrência',
        example: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateUnitDto.prototype, "rowVersion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Novo nome da unidade',
        example: 'Unidade Central Jardins - Bloco B',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateUnitDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Novo código do país da unidade (padrão ISO 2 letras). Por enquanto, apenas BR.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(2, 2),
    __metadata("design:type", String)
], UpdateUnitDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Novo endereço da unidade',
        example: 'Av. Paulista, 1000 - Bela Vista',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUnitDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Novo município da unidade',
        example: 'São Paulo',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUnitDto.prototype, "municipality", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Nova UF (Estado) da unidade',
        example: 'SP',
    }),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Nova UF (Estado) da unidade',
        example: 'SP',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUnitDto.prototype, "uf", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Novo fuso horário da unidade',
        example: 'America/Sao_Paulo',
    }),
    (0, class_validator_1.IsTimeZone)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUnitDto.prototype, "timezone", void 0);
class BlockUnitDto {
    reason;
}
exports.BlockUnitDto = BlockUnitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Motivo do bloqueio da unidade',
        example: 'Manutenção programada',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O motivo do bloqueio é obrigatório.' }),
    __metadata("design:type", String)
], BlockUnitDto.prototype, "reason", void 0);
//# sourceMappingURL=unit.dto.js.map