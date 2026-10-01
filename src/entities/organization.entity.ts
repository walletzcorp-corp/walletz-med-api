import { randomUUID } from 'node:crypto';
import { InvalidOrganizationError } from '../common/errors/organization.errors';

export type OrgStatus = 'ACTIVE' | 'INACTIVE';

export type TaxProfile =
  | 'SIMPLES_NACIONAL'
  | 'LUCRO_PRESUMIDO'
  | 'LUCRO_REAL'
  | 'MEI';

export interface OrganizationProps {
  tenantId: string;
  legalName: string;
  tradeName: string;
  /** Exatamente 14 dígitos numéricos, sem pontuação. */
  cnpjDigits: string;
  taxProfile: TaxProfile;
  regionalConfigId: string;
  status: OrgStatus;
  /** Versão para controle de concorrência optimista. */
  rowVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrganizationInput {
  tenantId: string;
  legalName: string;
  tradeName: string;
  cnpjDigits: string;
  taxProfile: TaxProfile;
  regionalConfigId: string;
}

export interface UpdateOrganizationFields {
  legalName?: string;
  tradeName?: string;
  cnpjDigits?: string;
  taxProfile?: TaxProfile;
  regionalConfigId?: string;
}

/**
 * Organização vinculada 1-para-1 a um Tenant.
 * Criada sempre junto com o Tenant. Histórico nunca é deletado.
 */
export class Organization {
  private constructor(
    public readonly id: string,
    private props: OrganizationProps,
  ) {}

  static create(input: CreateOrganizationInput): Organization {
    Organization.assertCnpj(input.cnpjDigits);
    Organization.assertNonEmpty(input.legalName, 'Razão social');
    Organization.assertNonEmpty(input.tradeName, 'Nome fantasia');
    const now = new Date();
    return new Organization(randomUUID(), {
      ...input,
      status: 'ACTIVE',
      rowVersion: 1,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(id: string, props: OrganizationProps): Organization {
    return new Organization(id, props);
  }

  get tenantId(): string { return this.props.tenantId; }
  get legalName(): string { return this.props.legalName; }
  get tradeName(): string { return this.props.tradeName; }
  get cnpjDigits(): string { return this.props.cnpjDigits; }
  get taxProfile(): TaxProfile { return this.props.taxProfile; }
  get regionalConfigId(): string { return this.props.regionalConfigId; }
  get status(): OrgStatus { return this.props.status; }
  get rowVersion(): number { return this.props.rowVersion; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  /**
   * Atualiza campos com controle de concorrência optimista.
   * @throws OrganizationVersionConflictError se expectedVersion !== rowVersion atual.
   */
  update(fields: UpdateOrganizationFields, expectedVersion: number): void {
    if (this.props.rowVersion !== expectedVersion) {
      throw new OrganizationVersionConflictError(
        `Conflito de versão: esperado ${expectedVersion}, atual ${this.props.rowVersion}.`,
      );
    }
    if (fields.cnpjDigits !== undefined) Organization.assertCnpj(fields.cnpjDigits);
    if (fields.legalName !== undefined) Organization.assertNonEmpty(fields.legalName, 'Razão social');
    if (fields.tradeName !== undefined) Organization.assertNonEmpty(fields.tradeName, 'Nome fantasia');

    Object.assign(this.props, fields);
    this.props.rowVersion += 1;
    this.props.updatedAt = new Date();
  }

  deactivate(): void {
    this.props.status = 'INACTIVE';
    this.props.rowVersion += 1;
    this.props.updatedAt = new Date();
  }

  private static assertCnpj(cnpjDigits: string): void {
    if (!/^\d{14}$/.test(cnpjDigits)) {
      throw new InvalidOrganizationError('CNPJ deve conter exatamente 14 dígitos numéricos.');
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
