import { DomainError } from './domain-error';

export class UnitNotFoundError extends DomainError {
  readonly code = 'NOT FOUND';
  constructor() {
    super('Unidade não encontrada.');
  }
}

export class InvalidUnitError extends DomainError {
  readonly code = 'INVALID';
}

export class UnitVersionConflictError extends DomainError {
  readonly code = 'CONFLICT';
  constructor(message = 'Conflito de versão') {
    super(message);
  }
}

export class UnitChecklistPendingError extends DomainError {
  readonly code = 'UNPROCESSABLE_ENTITY';
  constructor(public readonly missingFields: string[]) {
    super(
      `Não é possível ativar a unidade. Pendências: ${missingFields.join(', ')}`,
    );
  }
}
