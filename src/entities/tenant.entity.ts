import { randomBytes, randomUUID } from 'node:crypto';
import { InvalidTenantError } from '../common/errors/tenant.errors';

export type TenantStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface TenantProps {
  /** Token aleatório de 32 bytes (hex-64 chars) — imprevisível e não reutilizável. */
  key: string;
  status: TenantStatus;
  createdAt: Date;
}

/**
 * Entidade raiz de agregado.
 * A key é obrigatória em toda consulta/evento/arquivo e nunca é alterada.
 */
export class Tenant {
  private constructor(
    public readonly id: string,
    private props: TenantProps,
  ) {}

  /** Cria novo tenant com key segura gerada automaticamente. */
  static create(): Tenant {
    return new Tenant(randomUUID(), {
      key: randomBytes(32).toString('hex'),
      status: 'ACTIVE',
      createdAt: new Date(),
    });
  }

  /** Reidrata do banco (já validado antes de ser persistido). */
  static restore(id: string, props: TenantProps): Tenant {
    return new Tenant(id, props);
  }

  get key(): string { return this.props.key; }
  get status(): TenantStatus { return this.props.status; }
  get createdAt(): Date { return this.props.createdAt; }

  activate(): void {
    if (this.props.status === 'ACTIVE') return;
    this.props.status = 'ACTIVE';
  }

  deactivate(): void {
    if (this.props.status === 'INACTIVE') return;
    this.assertNotSuspended();
    this.props.status = 'INACTIVE';
  }

  suspend(): void {
    this.props.status = 'SUSPENDED';
  }

  private assertNotSuspended(): void {
    if (this.props.status === 'SUSPENDED') {
      throw new InvalidTenantError('Tenant suspenso não pode ser desativado diretamente. Use reativação.');
    }
  }
}
