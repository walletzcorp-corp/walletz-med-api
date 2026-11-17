import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsTimeZone,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUnitDto {
  @ApiProperty({
    description: 'Nome da unidade',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name!: string;

  @ApiProperty({
    description:
      'Código do país da unidade (padrão ISO 2 letras). Por enquanto, apenas BR.',
    example: 'BR',
    enum: ['BR'],
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2, {
    message: 'O código do país deve ter exatamente 2 caracteres.',
  })
  country!: string;

  @ApiProperty({
    description: 'Endereço completo da unidade',
    example: 'Av. Paulista, 1000 - Bela Vista',
  })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty({
    description: 'Município da unidade',
    example: 'São Paulo',
  })
  @IsString()
  @IsNotEmpty()
  municipality!: string;

  @ApiProperty({
    description: 'UF (Estado) da unidade',
    example: 'SP',
  })
  @IsString()
  @IsNotEmpty()
  uf!: string;

  @ApiProperty({
    description: 'Fuso horário da unidade',
  })
  @IsTimeZone({ message: 'O timezone deve ser um fuso IANA válido' })
  @IsNotEmpty()
  timezone!: string;
}

export class UpdateUnitDto {
  @ApiProperty({
    description: 'Versão da unidade (rowVersion) para controle de concorrência',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  rowVersion!: number;

  @ApiPropertyOptional({
    description: 'Novo nome da unidade',
    example: 'Unidade Central Jardins - Bloco B',
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  name?: string;

  @ApiPropertyOptional({
    description:
      'Novo código do país da unidade (padrão ISO 2 letras). Por enquanto, apenas BR.',
  })
  @IsString()
  @IsOptional()
  @Length(2, 2)
  country?: string;

  @ApiPropertyOptional({
    description: 'Novo endereço da unidade',
    example: 'Av. Paulista, 1000 - Bela Vista',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    description: 'Novo município da unidade',
    example: 'São Paulo',
  })
  @IsString()
  @IsOptional()
  municipality?: string;

  @ApiPropertyOptional({
    description: 'Nova UF (Estado) da unidade',
    example: 'SP',
  })
  @ApiPropertyOptional({
    description: 'Nova UF (Estado) da unidade',
    example: 'SP',
  })
  @IsString()
  @IsOptional()
  uf?: string;

  @ApiPropertyOptional({
    description: 'Novo fuso horário da unidade',
    example: 'America/Sao_Paulo',
  })
  @IsTimeZone()
  @IsOptional()
  timezone?: string;
}

export class BlockUnitDto {
  @ApiProperty({
    description: 'Motivo do bloqueio da unidade',
    example: 'Manutenção programada',
  })
  @IsString()
  @IsNotEmpty({ message: 'O motivo do bloqueio é obrigatório.' })
  reason!: string;
}
