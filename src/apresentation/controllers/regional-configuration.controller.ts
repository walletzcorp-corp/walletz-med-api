import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RegionalConfigurationService } from 'src/application/regional.configuration/regional-configuration.service';

@ApiTags('Regional Configurations')
@Controller('regional-configurations')
export class RegionalConfigurationController {
  constructor(private readonly service: RegionalConfigurationService) {}

  @ApiOperation({
    summary: 'Listar configurações regionais disponíveis',
    description:
      'Retorna as configurações ativas para o usuário escolher no cadastro.',
  })
  @Get()
  findAll() {
    return this.service.findAllActive();
  }
}
