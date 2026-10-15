import { randomBytes, randomUUID } from 'node:crypto';
import { InvalidTenantError } from '../common/errors/tenant.errors';

export type TenantStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export class TenantEntity {
  // PROPRIEDADES

  readonly id: string;
  readonly key: string;
  status: TenantStatus;
  readonly createdAt: Date;

  //FIM DAS PROPRIEDADES

  private constructor(
    data: Omit<TenantEntity, 'activate' | 'deactivate' | 'suspend'>,
  ) {
    this.id = data.id;
    this.key = data.key;
    this.status = data.status;
    this.createdAt = data.createdAt;
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
  static restore(
    data: Omit<TenantEntity, 'activate' | 'deactivate' | 'suspend'>,
  ): TenantEntity {
    return new TenantEntity(data);
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
