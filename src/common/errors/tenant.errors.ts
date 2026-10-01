import { DomainError } from './domain-error';

export class TenantNotFoundError extends DomainError {
  readonly code = 'NOT_FOUND';
  constructor() {
    super('Tenant não encontrado.');
  }
}

export class InvalidTenantError extends DomainError {
  readonly code = 'INVALID';
}
