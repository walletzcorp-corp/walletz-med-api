import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationService } from 'src/application/organization/organization.service';

@ApiTags('Organization')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas as Organizações',
    description: 'Retorna uma lista de todas as organizações existentes.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de organizações retornada com sucesso.',
  })
  async findAll() {
    return this.organizationService.getOrganization();
  }
}
