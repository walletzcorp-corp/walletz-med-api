import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUnitDto, UpdateUnitDto } from 'src/apresentation/dto/unit.dto';
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

  async activate() {}

  async block() {}

  async update(id: string, organizationId: string, dto: UpdateUnitDto) {}
}
