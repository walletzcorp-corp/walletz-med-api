import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UnitService } from 'src/application/unit/unit.service';
import { BlockUnitDto, CreateUnitDto, UpdateUnitDto } from '../dto/unit.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Unit') //Agrupa as rotas sob a seção "Units" no Swagger
@Controller('Unit/:organizationId/units')
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

  @Get()
  @ApiOperation({
    summary: 'Listar Unidades de uma Organização',
    description:
      'Retorna uma lista de todas as unidades associadas à organização especificada.',
  })
  @ApiParam({
    name: 'organizationId',
    description: 'UUID da organização cujas unidades serão listadas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de unidades retornada com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Organização não encontrada.' })
  async findAll(@Param('organizationId') organizationId: string) {
    return this.unitService.findAllByOrganization(organizationId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter detalhes de uma Unidade',
  })
  @ApiParam({
    name: 'organizationId',
    description: 'UUID da organização à qual a unidade pertence',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID da unidade que deseja consultar',
  })
  @ApiResponse({
    status: 200,
    description: 'Unidade encontrada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Unidade não encontrada nesta organização.',
  })
  async findOne(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
  ) {
    return this.unitService.findOne(id, organizationId);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar uma Unidade',
    description:
      'Atualiza os dados de uma unidade específica associada à organização informada.',
  })
  @ApiParam({
    name: 'organizationId',
    description: 'UUID da organização dona da unidade',
    example: '681fd794-7645-4fe6-aa9e-f1034e12e15a',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID da unidade que será atualizada',
    example: '47a7b933-2f5b-4aa4-86f9-87dc7e8319ec',
  })
  @ApiResponse({
    status: 200,
    description:
      'Unidade atualizada com sucesso (retorna dados e novo rowVersion).',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou fuso horário inexistente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Unidade ou organização não encontrada.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflito de versão (rowVersion desatualizado).',
  })
  async update(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
    @Body() dto: UpdateUnitDto,
  ) {
    return this.unitService.update(id, organizationId, dto);
  }

  @Patch(':id/activate')
  @ApiOperation({
    summary: 'Ativar uma Unidade',
    description:
      'Ativa uma unidade específica associada à organização informada.',
  })
  async activate(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
  ) {
    return this.unitService.activate(id, organizationId);
  }

  @Patch(':id/block')
  @ApiOperation({
    summary: 'Bloquear uma Unidade',
    description:
      'Bloqueia uma unidade específica associada à organização informada.',
  })
  async block(
    @Param('organizationId') organizationId: string,
    @Param('id') id: string,
    @Body() dto: BlockUnitDto,
  ) {
    return this.unitService.block(id, organizationId, dto);
  }
}
