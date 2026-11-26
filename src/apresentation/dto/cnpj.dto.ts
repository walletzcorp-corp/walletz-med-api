import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum CnpjSituation {
  NULA = 'NULA',
  ATIVA = 'ATIVA',
  SUSPENSA = 'SUSPENSA',
  INAPTA = 'INAPTA',
  BAIXADA = 'BAIXADA',
}

export class ValidationCnpj {
  @IsString()
  @IsNotEmpty()
  cnpjDigits: string;

  @IsString()
  LegalName: string;

  @IsString()
  tradeName: string;

  @IsEnum()
  status!: CnpjSituation;
}
