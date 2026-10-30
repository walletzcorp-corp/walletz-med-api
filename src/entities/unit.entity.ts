import { randomUUID } from 'node:crypto';
import {
  InvalidUnitError,
  UnitChecklistPendingError,
  UnitVersionConflictError,
} from 'src/common/errors/unit.error';

export type UnitStatus = 'RASCUNHO' | 'ATIVA' | 'INATIVA' | 'BLOQUEADA';

export class UnitEntity {
  readonly id: string;
  readonly organizationId: string;
  readonly code: string; //readonly = imutável
  name: string;
  address: string;
  municipality: string;
  uf: string;
  timezone: string;
  status: UnitStatus;
  rowVersion: number;
  readonly createdAt: Date;
  updatedAt: Date;

  private constructor(
    data: Omit<UnitEntity, 'activate' | 'block' | 'inactivate' | 'update'>,
  ) {
    this.id = data.id;
    this.organizationId = data.organizationId;
    this.code = data.code;
    this.name = data.name;
    this.address = data.address;
    this.municipality = data.municipality;
    this.uf = data.uf;
    this.timezone = data.timezone;
    this.status = data.status;
    this.rowVersion = data.rowVersion;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static create(input: {
    organizationId: string;
    code: string;
    name: string;
    address: string;
    municipality: string;
    uf: string;
    timezone: string;
  }): UnitEntity {
    const now = new Date();

    return new UnitEntity({
      id: randomUUID(),
      organizationId: input.organizationId,
      code: input.code.trim(),
      name: input.name.trim(),
      address: input.address.trim(),
      municipality: input.municipality.trim(),
      uf: input.uf.trim().toUpperCase(),
      timezone: input.timezone.trim(),
      status: 'RASCUNHO', //unidade sempre nasce como rascunho
      rowVersion: 1,
      createdAt: now,
      updatedAt: now,
    });
  }
  static restore(data: {
    id: string;
    organizationId: string;
    unitCode: string;
    name: string | null;
    address: string | null;
    municipality: string | null;
    uf: string | null;
    timezone: string | null;
    status: UnitStatus;
    row_version: number;
    createdAt: Date;
    updatedAt: Date;
  }): UnitEntity {
    return new UnitEntity({
      id: data.id,
      organizationId: data.organizationId,
      code: data.unitCode,
      name: data.name ?? '',
      address: data.address ?? '',
      municipality: data.municipality ?? '',
      uf: data.uf ?? '',
      timezone: data.timezone ?? '',
      status: data.status,
      rowVersion: data.row_version,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  activate(): void {
    if (this.status === 'ATIVA') return; //trava contra ação desnecessaria se unit ja estiver ativa

    if (this.status === 'INATIVA') {
      //SE ESTIVER INATIVA, FAZ O CHECK LIST DE VERIFICAÇÃO P/ ATIVAR
      throw new InvalidUnitError(
        'Unidade inativa não pode ser ativada diretamente.',
      );
    }

    const pendingFields: string[] = [];
    if (!this.name?.trim()) pendingFields.push('nome');
    if (!this.code?.trim()) pendingFields.push('código');
    if (!this.address?.trim()) pendingFields.push('endereço');
    if (!this.municipality?.trim()) pendingFields.push('município');
    if (!this.uf?.trim()) pendingFields.push('UF');
    if (!this.timezone?.trim()) pendingFields.push('fuso horário');

    if (pendingFields.length > 0) {
      throw new UnitChecklistPendingError(pendingFields);
    }

    this.status = 'ATIVA';
    this.rowVersion += 1;
    this.updatedAt = new Date();
  }

  block(reason: string): void {
    if (!reason?.trim()) {
      throw new InvalidUnitError('O motivo do bloqueio é obrigatório.');
    }
    if (this.status === 'INATIVA') {
      throw new InvalidUnitError('Unidade inativa não pode ser bloqueada.');
    }
    this.status = 'BLOQUEADA';
    this.rowVersion += 1;
    this.updatedAt = new Date();
  }

  inactivate(): void {
    this.status = 'INATIVA';
    this.rowVersion += 1;
    this.updatedAt = new Date();
  }

  update(
    fields: Partial<
      Pick<UnitEntity, 'name' | 'address' | 'municipality' | 'uf' | 'timezone'>
    >,
    expectedVersion: number,
  ): void {
    if (this.rowVersion !== expectedVersion) {
      throw new UnitVersionConflictError(
        `Conflito de versão: esperado ${expectedVersion}, atual ${this.rowVersion}.`,
      );
    }

    if (fields.timezone) UnitEntity.assertTimezone(fields.timezone);

    if (fields.uf) UnitEntity.assertUf(fields.uf);

    Object.assign(this, fields);
    this.rowVersion += 1;
    this.updatedAt = new Date();
  }

  private static assertTimezone(tz: string): void {
    if (!Intl.supportedValuesOf('timeZone').includes(tz)) {
      throw new InvalidUnitError(`Fuso horário IANA '${tz}' é inválido.`);
    }
  }

  private static assertUf(uf: string): void {
    if (!/^[A-Z]{2}$/.test(uf.toUpperCase())) {
      throw new InvalidUnitError('UF deve conter exatamente 2 letras.');
    }
  }
}
