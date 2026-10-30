import { randomUUID } from 'node:crypto';
import { InvalidOrganizationError } from '../common/errors/organization.errors';

export type OrgStatus = 'ACTIVE' | 'INACTIVE';

export type TaxProfile =
  'SIMPLES_NACIONAL' | 'LUCRO_PRESUMIDO' | 'LUCRO_REAL' | 'MEI';

export class OrganizationEntity {
  // PROPRIEDADES
  readonly id: string;
  readonly tenantId: string;
  legalName: string;
  tradeName: string;
  cnpjDigits: string;
  taxProfile: TaxProfile;
  regionalConfigId: string;
  status: OrgStatus;
  rowVersion: number;
  readonly createdAt: Date;
  updatedAt: Date;

  //FIM DAS PROPRIEDADES

  private constructor(data: Omit<OrganizationEntity, 'update' | 'deactivate'>) {
    this.id = data.id;
    this.tenantId = data.tenantId;
    this.legalName = data.legalName;
    this.tradeName = data.tradeName;
    this.cnpjDigits = data.cnpjDigits;
    this.taxProfile = data.taxProfile;
    this.regionalConfigId = data.regionalConfigId;
    this.status = data.status;
    this.rowVersion = data.rowVersion;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static createIsValid(
    input: Pick<
      OrganizationEntity,
      | 'tenantId'
      | 'legalName'
      | 'tradeName'
      | 'cnpjDigits'
      | 'taxProfile'
      | 'regionalConfigId'
    >,
  ): OrganizationEntity {
    OrganizationEntity.assertCnpj(input.cnpjDigits);
    OrganizationEntity.assertNonEmpty(input.legalName, 'Razão social');
    OrganizationEntity.assertNonEmpty(input.tradeName, 'Nome fantasia');
    const now = new Date();
    return new OrganizationEntity({
      ...input,
      id: randomUUID(),
      status: 'ACTIVE',
      rowVersion: 1,
      createdAt: now,
      updatedAt: now,
    });
  }

  /* Reidrata a entidade a partir do registro do banco. */
  static restore(
    data: Omit<OrganizationEntity, 'update' | 'deactivate'>,
  ): OrganizationEntity {
    return new OrganizationEntity(data);
  }

  /**
   * Atualiza campos com controle de concorrência optimista.
   * @throws OrganizationVersionConflictError se expectedVersion !== rowVersion atual.
   */
  update(
    fields: Partial<
      Pick<
        OrganizationEntity,
        | 'legalName'
        | 'tradeName'
        | 'cnpjDigits'
        | 'taxProfile'
        | 'regionalConfigId'
      >
    >,
    expectedVersion: number,
  ): void {
    if (this.rowVersion !== expectedVersion) {
      throw new OrganizationVersionConflictError(
        `Conflito de versão: esperado ${expectedVersion}, atual ${this.rowVersion}.`,
      );
    }
    if (fields.cnpjDigits !== undefined)
      OrganizationEntity.assertCnpj(fields.cnpjDigits);
    if (fields.legalName !== undefined)
      OrganizationEntity.assertNonEmpty(fields.legalName, 'Razão social');
    if (fields.tradeName !== undefined)
      OrganizationEntity.assertNonEmpty(fields.tradeName, 'Nome fantasia');

    Object.assign(this, fields);
    this.rowVersion += 1;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.status = 'INACTIVE';
    this.rowVersion += 1;
    this.updatedAt = new Date();
  }

  private static assertCnpj(cnpjDigits: string): void {
    if (!/^[A-Za-z0-9]{12}\d{2}$/.test(cnpjDigits)) {
      throw new InvalidOrganizationError(
        'CNPJ deve conter exatamente 14 caracteres alfanuméricos válidos.',
      );
    }
  }

  private static assertNonEmpty(value: string, field: string): void {
    if (!value?.trim()) {
      throw new InvalidOrganizationError(`${field} é obrigatório.`);
    }
  }
}

// Re-exportado aqui para evitar importação circular nos erros da entidade
export class OrganizationVersionConflictError extends Error {
  readonly code = 'CONFLICT';
  constructor(message: string) {
    super(message);
    this.name = 'OrganizationVersionConflictError';
  }
}
