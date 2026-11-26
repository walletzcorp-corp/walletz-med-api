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
import { AuditService } from '../audit/audit.service';
import { error } from 'console';
import { HttpClient } from '@nestjs/http-client';

@Injectable()
export class TenantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly http: HttpClient,
  ) {}

  async create(dto: CreateTenantDto) {
    //chamando o metodo de validação, parametro sendo o cnpj vindo do dto(que vem da requisição)
    await this.ValidandoCNPJExistente(dto.cnpjDigits);

    //metodo apenas verifica se esta valido o reginalConfig, baseado no id recebido
    await this.VerificarSeRegionalConfiExiste(dto.regionalConfigId);
    // se esta ok, segue

    const tenant = TenantEntity.create();
    //tenant recebe o que o metodo create faz

    //essa const recebe a função e o retorno da nova organização
    const organization = OrganizationEntity.createIsValid({
      tenantId: tenant.id,
      legalName: dto.legalName,
      tradeName: dto.tradeName,
      cnpjDigits: dto.cnpjDigits,
      taxProfile: dto.taxProfile,
      regionalConfigId: dto.regionalConfigId,
    });

    //INICIO DE AUDITORIA
    const eventId = await this.audit.create({
      tenantId: organization.tenantId,
      action: 'CREATE_TENANT',
      object: `Tenant:${tenant.id}`,
    });

    // transaction faz funçoes conjuntas, se uma falhar, todo o resto é desfeito
    //nesse caso esta salvando no banco de dados
    await this.prisma.$transaction([
      this.prisma.tenant.create({
        data: {
          id: tenant.id,
          key: tenant.key,
          status: tenant.status,
          createdAt: tenant.createdAt,
        },
      }),
      this.prisma.organization.create({
        data: {
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
        },
      }),
    ]);

    //colocamos a organização criada na propriedade organização do tenant
    tenant.organization = organization;

    // retorna o tenant requerido ao controller q retornara a requisição
    return tenant;
  }

  async findAll() {
    const rows = await this.prisma.tenant.findMany({
      orderBy: { createdAt: 'desc' },
      include: { organization: true },
    });

    return rows.map((row) => ({
      tenant: TenantEntity.restore(row),
      organization: row.organization
        ? OrganizationEntity.restore(row.organization)
        : null,
    }));
  }

  async findOne(id: string) {
    const row = await this.prisma.tenant.findUnique({
      where: { id },
      include: { organization: true },
    });

    if (!row) throw new NotFoundException('Tenant não encontrado.');

    return TenantEntity.restore(row);
  }

  async getOrganization() {
    const row = await this.prisma.organization.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return row.map((row) => OrganizationEntity.restore(row));
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

    if (fields.regionalConfigId) {
      await this.VerificarSeRegionalConfiExiste(fields.regionalConfigId);
    }

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

  private async VerificarSeRegionalConfiExiste(id: string) {
    //metodo recebe um id, e verifica se está valido o regionalConfig, se esta ok, segue
    const entityRegionalConfig =
      await this.prisma.regionalConfiguration.findUnique({
        where: { id },
      });

    if (!entityRegionalConfig || !entityRegionalConfig.active) {
      throw new BadRequestException(
        'Configuração regional invalida ou indísponivel',
      );
    }
  }

  private async ValidandoCNPJExistente(cnpj: string): Promise<any[]> {
    //Fazer requisição GET neste endpoint: https://brasilapi.com.br/api/cnpj/v1/65621091000128

    var route = '/' + cnpj;
    const { data } = await this.http.get<any[]>(cnpj);
    return data;

    //para capturar o erro ou suscesso, analisar o status code!!!!!!!!!!
  }
}
