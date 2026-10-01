import { DomainError } from './domain-error';

export class OrganizationNotFoundError extends DomainError {
  readonly code = 'NOT_FOUND';
  constructor() {
    super('Organização não encontrada.');
  }
}

export class InvalidOrganizationError extends DomainError {
  readonly code = 'INVALID';
}

export class OrganizationVersionConflictError extends DomainError {
  readonly code = 'CONFLICT';
  constructor(message = 'Conflito de versão: a organização foi modificada por outra operação.') {
    super(message);
  }
}
