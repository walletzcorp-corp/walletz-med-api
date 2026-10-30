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
        description: 'Endereço completo da unidade',
        example: 'Av. Paulista, 1000 - Bela Vista',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUnitDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Municício da unidade',
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
    rowVersio;
    name;
    address;
    municipality;
    uf;
    timezone;
}
exports.UpdateUnitDto = UpdateUnitDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateUnitDto.prototype, "rowVersio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUnitDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUnitDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUnitDto.prototype, "municipality", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUnitDto.prototype, "uf", void 0);
__decorate([
    (0, class_validator_1.IsTimeZone)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUnitDto.prototype, "timezone", void 0);
class BlockUnitDto {
    reason;
}
exports.BlockUnitDto = BlockUnitDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O motivo do bloqueio é obrigatório.' }),
    __metadata("design:type", String)
], BlockUnitDto.prototype, "reason", void 0);
//# sourceMappingURL=unit.dto.js.map