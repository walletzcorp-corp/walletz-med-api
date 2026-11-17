import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  BlockUnitDto,
  CreateUnitDto,
  UpdateUnitDto,
} from 'src/apresentation/dto/unit.dto';
import { UnitEntity } from 'src/entities/unit.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UnitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateUnitDto) {
    //verificando se a organização esta diferente de ativa
    const org = await this.prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (!org) throw new NotFoundException('Organização não encontrada.');

    if (org.status !== 'ACTIVE') {
      throw new BadRequestException(
        'Apenas organizações ativas podem receber novas unidades.',
      );
    }

    //gerando o codigo seguinte sem conflitos de concorrencia
    //$transaction: Abre um bloco de transação no banco de dados
    const createdRow = await this.prisma.$transaction(async (tx) => {
      const code = await this.gerenateNextUnitCode(tx, organizationId);

      const unit = UnitEntity.create({
        organizationId,
        code,
        name: dto.name,
        country: dto.country,
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
    return UnitEntity.restore(createdRow);
  }

  //gerador dos codigos ao criar a unidade
  private async gerenateNextUnitCode(
    tx: Prisma.TransactionClient,
    organizationId: string,
  ): Promise<string> {
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

  //Busca uma unidade garantindo que ela pertence àquela organização.

  private async getUnitOrThrow(id: string, organizationId: string) {
    const row = await this.prisma.unit.findFirst({
      where: { id, organizationId },
    });
    if (!row)
      throw new NotFoundException('Unidade não encontrada nesta organização.');
    return row;
  }

  async findOne(id: string, organizationId: string) {
    const row = await this.getUnitOrThrow(id, organizationId);
    return UnitEntity.restore(row);
  }

  async activate(id: string, organizationId: string) {
    const row = await this.getUnitOrThrow(id, organizationId);
    const unit = UnitEntity.restore(row);

    try {
      unit.activate();
    } catch (err: any) {
      if (err.name === 'UnitChecklistPendingError') {
        throw new UnprocessableEntityException({
          message: err.message,
          missingFields: err.missingFields,
        });
      }
      throw new BadRequestException(err.message);
    }

    await this.prisma.unit.update({
      where: { id: unit.id },
      data: {
        status: unit.status,
        row_version: unit.rowVersion,
        updatedAt: new Date(),
      },
    });
    return unit;
  }

  async block(id: string, organizationId: string, dto: BlockUnitDto) {
    const row = await this.getUnitOrThrow(id, organizationId);
    const unit = UnitEntity.restore(row);

    unit.block(dto.reason);

    await this.prisma.unit.update({
      where: { id: unit.id },
      data: {
        status: unit.status,
        row_version: unit.rowVersion,
        updatedAt: new Date(),
      },
    });
    return unit;
  }

  async findAllByOrganization(organizationId: string) {
    const rows = await this.prisma.unit.findMany({
      where: { organizationId },
      orderBy: { unitCode: 'asc' },
    });
    return rows.map((r) => UnitEntity.restore(r));
  }

  async update(id: string, organizationId: string, dto: UpdateUnitDto) {
    const { rowVersion, ...fields } = dto;
    const row = await this.getUnitOrThrow(id, organizationId);
    const unit = UnitEntity.restore(row);

    try {
      unit.update(fields, rowVersion);
    } catch (err: any) {
      if (err.name === 'UnitVersionConflictError') {
        throw new ConflictException(err.message);
      }
      throw new BadRequestException(err.message);
    }
    await this.prisma.unit.update({
      where: { id: unit.id },
      data: {
        name: unit.name,
        country: unit.country,
        address: unit.address,
        municipality: unit.municipality,
        uf: unit.uf,
        timezone: unit.timezone,
        row_version: unit.rowVersion,
        updatedAt: new Date(),
      },
    });
    return unit;
  }
}
