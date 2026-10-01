import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { TaxProfile } from '../../entities/organization.entity';
import { TenantStatus } from '../../entities/tenant.entity';
import { ApiProperty } from '@nestjs/swagger';

// ---------------------------------------------------------------------------
// POST /tenants — cria tenant + organização
// ---------------------------------------------------------------------------

export class CreateTenantDto {
  @ApiProperty({
    description: 'Razão Social da empresa',
    example: 'Regencare Med LTDA',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  legalName!: string;

  @ApiProperty({
    description: 'Nome Fantasia da empresa',
    example: 'Regencare Med',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  tradeName!: string;

  @ApiProperty({
    description: 'CNPJ da empresa (somente dígitos, sem formatação)',
    example: '12345678000195',
  })
  @IsString()
  /** 14 dígitos numéricos sem formatação (ex.: 12345678000195). */
  @Matches(/^\d{14}$/, {
    message: 'cnpjDigits deve conter exatamente 14 dígitos numéricos.',
  })
  cnpjDigits!: string;

  @ApiProperty({
    description: 'Perfil tributário da empresa',
    example: 'SIMPLES_NACIONAL',
    enum: ['SIMPLES_NACIONAL', 'LUCRO_PRESUMIDO', 'LUCRO_REAL', 'MEI'],
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsEnum(['SIMPLES_NACIONAL', 'LUCRO_PRESUMIDO', 'LUCRO_REAL', 'MEI'])
  taxProfile!: TaxProfile;

  @ApiProperty({
    description: 'ID da configuração regional',
    example: '12345678-1234-1234-1234-123456789012',
  })
  @IsString()
  @IsNotEmpty()
  regionalConfigId!: string;
}

// ---------------------------------------------------------------------------
// PATCH /tenants/:id/status
// ---------------------------------------------------------------------------

export class UpdateTenantStatusDto {
  @IsEnum(['ACTIVE', 'INACTIVE', 'SUSPENDED'])
  status!: TenantStatus;
}

// ---------------------------------------------------------------------------
// PATCH /tenants/:id/organization
// ---------------------------------------------------------------------------

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  legalName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  tradeName?: string;

  @IsOptional()
  @Matches(/^\d{14}$/, {
    message: 'cnpjDigits deve conter exatamente 14 dígitos numéricos.',
  })
  cnpjDigits?: string;

  @IsOptional()
  @IsEnum(['SIMPLES_NACIONAL', 'LUCRO_PRESUMIDO', 'LUCRO_REAL', 'MEI'])
  taxProfile?: TaxProfile;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  regionalConfigId?: string;

  /** Versão conhecida pelo cliente — obrigatório para controle optimista. */
  @IsInt()
  rowVersion!: number;
}
