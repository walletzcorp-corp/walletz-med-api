import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TenantEntity } from '../../entities/tenant.entity';
import { OrganizationEntity } from '../../entities/organization.entity';
import {
  CreateTenantDto,
  UpdateOrganizationDto,
  UpdateTenantStatusDto,
} from '../../apresentation/dto/tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTenantDto) {
    const tenant = TenantEntity.create();

    const organization = OrganizationEntity.createIsValid({
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
    return rows.map((row) => TenantEntity.restore(row));
  }

  async findOne(id: string) {
    const row = await this.prisma.tenant.findUnique({
      where: { id },
      include: { organization: true },
    });

    if (!row) throw new NotFoundException('Tenant não encontrado.');

    const tenant = TenantEntity.restore(row);

    const organization = row.organization
      ? OrganizationEntity.restore(row.organization)
      : null;

    return { tenant, organization };
  }

  async updateStatus(id: string, dto: UpdateTenantStatusDto) {
    const row = await this.prisma.tenant.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Tenant não encontrado.');

    const tenant = TenantEntity.restore(row);

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
        throw new BadRequestException(`Status inválido: ${dto.status}.`);
    }

    await this.prisma.tenant.update({
      where: { id },
      data: { status: tenant.status },
    });
  }

  async updateOrganization(tenantId: string, dto: UpdateOrganizationDto) {
    const { rowVersion, ...fields } = dto;
    const orgRow = await this.prisma.organization.findUnique({
      where: { tenantId },
    });

    if (!orgRow)
      throw new NotFoundException(
        'Organização não encontrada para este tenant.',
      );

    const organization = OrganizationEntity.restore(orgRow);

    try {
      organization.update(fields, rowVersion);
    } catch (err: any) {
      if (err.name === 'OrganizationVersionConflictError') {
        throw new ConflictException(err.message);
      }
      throw new BadRequestException(err.message);
    }

    await this.prisma.organization.update({
      where: { id: organization.id },
      data: organization,
    });
  }
}
