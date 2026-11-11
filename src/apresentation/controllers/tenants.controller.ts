import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TenantsService } from 'src/application/tenant/tenants.service';
import {
  CreateTenantDto,
  UpdateOrganizationDto,
  UpdateTenantStatusDto,
} from '../dto/tenant.dto';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo Tenant',
    description:
      'Cria um tenant e sua respectiva organização atrelada simultaneamente.',
  })
  @ApiResponse({
    status: 201,
    description: 'Tenant e Organização criados com sucesso.',
  })
  async create(@Body() dto: CreateTenantDto) {
    return this.tenantsService.create(dto);
  }

  @ApiOperation({
    summary: 'Listar todos os Tenants',
    description: 'Retorna uma lista de todos os tenants existentes.',
  })
  @Get()
  async findAll() {
    const items = await this.tenantsService.findAll();
    return items.map(({ tenant, organization }) => ({
      id: tenant.id,
      key: tenant.key,
      status: tenant.status,
      createdAt: tenant.createdAt,
      organization,
    }));
  }

  @ApiOperation({
    summary: 'Obter detalhes de Tenant específico',
    description:
      'Retorna os detalhes de um tenant específico, incluindo sua organização associada.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualizar o status de um Tenant',
    description:
      'Atualiza o status de um tenant específico. O status pode ser ACTIVE, INACTIVE ou SUSPENDED.',
  })
  @Patch(':id/status')
  @HttpCode(204)
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTenantStatusDto,
  ) {
    await this.tenantsService.updateStatus(id, dto);
  }

  @ApiOperation({
    summary: 'Atualizar os detalhes da organização de um Tenant',
    description:
      'Atualiza os detalhes da organização associada a um tenant específico.',
  })
  @Patch(':id/organization')
  @HttpCode(204)
  async updateOrganization(
    @Param('id') id: string,
    @Body() dto: UpdateOrganizationDto,
  ) {
    await this.tenantsService.updateOrganization(id, dto);
  }

  @ApiOperation({
    summary: 'Obter detalhes da organização de um Tenant específico',
    description:
      'Retorna os detalhes da organização associada a um tenant específico.',
  })
  @Get(':id/organization')
  async getOrganization(@Param('id') id: string) {
    const tenant = await this.tenantsService.findOne(id);
    return tenant.organization;
  }

  @ApiOperation({
    summary: 'Atualizar os detalhes da organização de um Tenant',
    description:
      'Atualiza os detalhes da organização associada a um tenant específico.',
  })
  @Patch(':id/organization')
  @HttpCode(204)
  async updateOrg(@Param('id') id: string, @Body() dto: UpdateOrganizationDto) {
    await this.tenantsService.updateOrganization(id, dto);
  }
}
