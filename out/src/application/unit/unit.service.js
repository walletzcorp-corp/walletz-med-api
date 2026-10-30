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
exports.UnitService = void 0;
const common_1 = require("@nestjs/common");
const unit_entity_1 = require("../../entities/unit.entity");
const prisma_service_1 = require("../../prisma/prisma.service");
let UnitService = class UnitService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(organizationId, dto) {
        const org = await this.prisma.organization.findUnique({
            where: { id: organizationId },
        });
        if (!org)
            throw new common_1.NotFoundException('Organização não encontrada.');
        if (org.status !== 'ACTIVE') {
            throw new common_1.BadRequestException('Apenas organizações ativas podem receber novas unidades.');
        }
        const createdRow = await this.prisma.$transaction(async (tx) => {
            const code = await this.gerenateNextUnitCode(tx, organizationId);
            const unit = unit_entity_1.UnitEntity.create({
                organizationId,
                code,
                name: dto.name,
                address: dto.address,
                municipality: dto.municipality,
                uf: dto.uf,
                timezone: dto.timezone,
            });
            return tx.unit.create({
                data: {
                    id: unit.id,
                    organizationId: unit.organizationId,
                    unitCode: unit.code,
                    name: unit.name,
                    address: unit.address,
                    municipality: unit.municipality,
                    uf: unit.uf,
                    timezone: unit.timezone,
                    status: unit.status,
                    row_version: unit.rowVersion,
                    createdAt: unit.createdAt,
                    updatedAt: unit.updatedAt,
                },
            });
        });
        return unit_entity_1.UnitEntity.restore(createdRow);
    }
    async gerenateNextUnitCode(tx, organizationId) {
        const lastUnit = await tx.unit.findFirst({
            where: { organizationId },
            orderBy: { unitCode: 'desc' },
            select: { unitCode: true },
        });
        if (!lastUnit || !lastUnit.unitCode) {
            return 'UN-0001';
        }
        const match = lastUnit.unitCode.match(/UN-(\d+)/);
        const currentNumber = match ? parseInt(match[1], 10) : 0;
        const nextNumber = currentNumber + 1;
        return `UN-${String(nextNumber).padStart(4, '0')}`;
    }
    async activate() { }
    async block() { }
    async update(id, organizationId, dto) { }
};
exports.UnitService = UnitService;
exports.UnitService = UnitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UnitService);
//# sourceMappingURL=unit.service.js.map