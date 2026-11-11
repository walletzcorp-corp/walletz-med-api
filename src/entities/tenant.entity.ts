import { randomBytes, randomUUID } from 'node:crypto';
import { InvalidTenantError } from '../common/errors/tenant.errors';
import { OrganizationEntity } from './organization.entity';

export type TenantStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export class TenantEntity {
  // PROPRIEDADES

  readonly id: string;
  readonly key: string;
  status: TenantStatus;
  readonly createdAt: Date;
  organization?: OrganizationEntity | null;

  //FIM DAS PROPRIEDADES

  private constructor(
    data: Omit<TenantEntity, 'activate' | 'deactivate' | 'suspend'>,
  ) {
    this.id = data.id;
    this.key = data.key;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.organization = data.organization ?? null;
  }

  /** Cria novo tenant com key segura gerada automaticamente. */
  static create(): TenantEntity {
    return new TenantEntity({
      id: randomUUID(),
      key: randomBytes(32).toString('hex'),
      status: 'ACTIVE',
      createdAt: new Date(),
    });
  }

  /** Reidrata do banco (já validado antes de ser persistido). */
  static restore(data: {
    id: string;
    key: string;
    status: TenantStatus;
    createdAt: Date;
    organization?: Parameters<typeof OrganizationEntity.restore>[0] | null;
  }): TenantEntity {
    return new TenantEntity({
      id: data.id,
      key: data.key,
      status: data.status,
      createdAt: data.createdAt,
      organization: data.organization
        ? OrganizationEntity.restore(data.organization)
        : null,
    });
  }

  activate(): void {
    if (this.status === 'ACTIVE') return;
    this.status = 'ACTIVE';
  }

  deactivate(): void {
    if (this.status === 'INACTIVE') return;
    this.assertNotSuspended();
    this.status = 'INACTIVE';
  }

  suspend(): void {
    this.status = 'SUSPENDED';
  }

  private assertNotSuspended(): void {
    if (this.status === 'SUSPENDED') {
      throw new InvalidTenantError(
        'Tenant suspenso não pode ser desativado diretamente. Use reativação.',
      );
    }
  }
}
