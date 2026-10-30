import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsTimeZone,
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
    description: 'Endereço completo da unidade',
    example: 'Av. Paulista, 1000 - Bela Vista',
  })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty({
    description: 'Municício da unidade',
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
  @IsInt()
  @IsNotEmpty()
  rowVersio!: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  municipality?: string;

  @IsString()
  @IsOptional()
  uf?: string;

  @IsTimeZone()
  @IsOptional()
  timezone?: string;
}

export class BlockUnitDto {
  @IsString()
  @IsNotEmpty({ message: 'O motivo do bloqueio é obrigatório.' })
  reason!: string;
}
