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
exports.UpdateOrganizationDto = exports.UpdateTenantStatusDto = exports.CreateTenantDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateTenantDto {
    legalName;
    tradeName;
    cnpjDigits;
    taxProfile;
    regionalConfigId;
}
exports.CreateTenantDto = CreateTenantDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Razão Social da empresa',
        example: 'Regencare Med LTDA',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateTenantDto.prototype, "legalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome Fantasia da empresa',
        example: 'Regencare Med',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateTenantDto.prototype, "tradeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'CNPJ da empresa (somente dígitos, sem formatação)',
        example: '12345678000195',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{14}$/, {
        message: 'cnpjDigits deve conter exatamente 14 dígitos numéricos.',
    }),
    __metadata("design:type", String)
], CreateTenantDto.prototype, "cnpjDigits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Perfil tributário da empresa',
        example: 'SIMPLES_NACIONAL',
        enum: ['SIMPLES_NACIONAL', 'LUCRO_PRESUMIDO', 'LUCRO_REAL', 'MEI'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.IsEnum)(['SIMPLES_NACIONAL', 'LUCRO_PRESUMIDO', 'LUCRO_REAL', 'MEI']),
    __metadata("design:type", String)
], CreateTenantDto.prototype, "taxProfile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID da configuração regional',
        example: '12345678-1234-1234-1234-123456789012',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTenantDto.prototype, "regionalConfigId", void 0);
class UpdateTenantStatusDto {
    status;
}
exports.UpdateTenantStatusDto = UpdateTenantStatusDto;
__decorate([
    (0, class_validator_1.IsEnum)(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
    __metadata("design:type", String)
], UpdateTenantStatusDto.prototype, "status", void 0);
class UpdateOrganizationDto {
    legalName;
    tradeName;
    cnpjDigits;
    taxProfile;
    regionalConfigId;
    rowVersion;
}
exports.UpdateOrganizationDto = UpdateOrganizationDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateOrganizationDto.prototype, "legalName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateOrganizationDto.prototype, "tradeName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{14}$/, {
        message: 'cnpjDigits deve conter exatamente 14 dígitos numéricos.',
    }),
    __metadata("design:type", String)
], UpdateOrganizationDto.prototype, "cnpjDigits", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['SIMPLES_NACIONAL', 'LUCRO_PRESUMIDO', 'LUCRO_REAL', 'MEI']),
    __metadata("design:type", String)
], UpdateOrganizationDto.prototype, "taxProfile", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateOrganizationDto.prototype, "regionalConfigId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateOrganizationDto.prototype, "rowVersion", void 0);
//# sourceMappingURL=tenant.dto.js.map