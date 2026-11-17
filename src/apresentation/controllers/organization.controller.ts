import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationService } from 'src/application/organization/organization.service';
import { PaginationQueryDto } from '../dto/pagination.dto';

@ApiTags('Organization')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar Organizações (paginado)',
    description:
      'Retorna uma lista paginada das organizações, ordenada da mais recente para a mais antiga.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Lista paginada de organizações retornada com sucesso. Formato: { data: [...], meta: { page, limit, total, totalPages } }.',
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros de paginação inválidos.',
  })
  async findAll(@Query() query: PaginationQueryDto) {
    return this.organizationService.getOrganization(query);
  }
}
