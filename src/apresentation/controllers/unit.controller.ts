import { Body, Controller, Param, Post } from '@nestjs/common';
import { UnitService } from 'src/application/unit/unit.service';
import { CreateUnitDto } from '../dto/unit.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Unit') //Agrupa as rotas sob a seção "Units" no Swagger
@Controller('organizations/:organizationId/units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar uma nova Unidade',
    description:
      'Cadastra uma nova unidade em estado RASCUNHO vinculada à organização informada.',
  })
  @ApiParam({
    name: 'organizationId',
    description: 'UUID da organização à qual a unidade pertencerá',
  })
  @ApiResponse({
    status: 201,
    description: 'Unidade criada com sucesso (status RASCUNHO).',
  })
  @ApiResponse({
    status: 400,
    description: 'Organização inativa ou dados inválidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Organização não encontrada.',
  })
  async create(
    @Param('organizationId') organizationId: string,
    @Body() dto: CreateUnitDto,
  ) {
    return this.unitService.create(organizationId, dto);
  }
}
