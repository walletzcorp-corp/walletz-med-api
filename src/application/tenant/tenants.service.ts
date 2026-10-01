import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Tenant } from '../../entities/tenant.entity';
import { Organization } from '../../entities/organization.entity';
import {
  CreateTenantDto,
  UpdateOrganizationDto,
  UpdateTenantStatusDto,
} from '../../apresentation/dto/tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTenantDto) {
    const tenant = Tenant.create();
    const organization = Organization.create({ tenantId: tenant.id, ...dto });

    const tenantRow = {
      id: tenant.id,
      key: tenant.key,
      status: tenant.status,
      createdAt: tenant.createdAt,
    };

    const orgRow = {
      id: organization.id,
      tenantId: organization.tenantId,
      legalName: organization.legalName,
      tradeName: organization.tradeName,
      cnpjDigits: organization.cnpjDigits,
      taxProfile: organization.taxProfile,
      regionalConfigId: organization.regionalConfigId,
      status: organization.status,
      rowVersion: organization.rowVersion,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    };

    await this.prisma.$transaction([
      this.prisma.tenant.create({ data: tenantRow }),
      this.prisma.organization.create({ data: orgRow }),
    ]);

    return { tenant, organization };
  }

  async findAll() {
    const rows = await this.prisma.tenant.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) =>
      Tenant.restore(row.id, {
        key: row.key,
        status: row.status as any,
        createdAt: row.createdAt,
      }),
    );
  }

  async findOne(id: string) {
    const row = await this.prisma.tenant.findUnique({
      where: { id },
      include: { organization: true },
    });

    if (!row) throw new NotFoundException('Tenant não encontrado.');

    const tenant = Tenant.restore(row.id, {
      key: row.key,
      status: row.status as any,
      createdAt: row.createdAt,
    });

    const organization = row.organization
      ? Organization.restore(row.organization.id, {
          tenantId: row.organization.tenantId,
          legalName: row.organization.legalName,
          tradeName: row.organization.tradeName,
          cnpjDigits: row.organization.cnpjDigits,
          taxProfile: row.organization.taxProfile as any,
          regionalConfigId: row.organization.regionalConfigId,
          status: row.organization.status as any,
          rowVersion: row.organization.rowVersion,
          createdAt: row.organization.createdAt,
          updatedAt: row.organization.updatedAt,
        })
      : null;

    return { tenant, organization };
  }

  async updateStatus(id: string, dto: UpdateTenantStatusDto) {
    const row = await this.prisma.tenant.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Tenant não encontrado.');

    const tenant = Tenant.restore(row.id, {
      key: row.key,
      status: row.status as any,
      createdAt: row.createdAt,
    });

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

    const organization = Organization.restore(orgRow.id, {
      tenantId: orgRow.tenantId,
      legalName: orgRow.legalName,
      tradeName: orgRow.tradeName,
      cnpjDigits: orgRow.cnpjDigits,
      taxProfile: orgRow.taxProfile as any,
      regionalConfigId: orgRow.regionalConfigId,
      status: orgRow.status as any,
      rowVersion: orgRow.rowVersion,
      createdAt: orgRow.createdAt,
      updatedAt: orgRow.updatedAt,
    });

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
      data: {
        legalName: organization.legalName,
        tradeName: organization.tradeName,
        cnpjDigits: organization.cnpjDigits,
        taxProfile: organization.taxProfile,
        regionalConfigId: organization.regionalConfigId,
        rowVersion: organization.rowVersion,
        updatedAt: organization.updatedAt,
      },
    });
  }
}
