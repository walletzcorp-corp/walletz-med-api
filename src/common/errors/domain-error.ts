/**
 * Base de todo erro de regra de negócio. Não conhece HTTP: quem traduz
 * `code` → status é o DomainExceptionFilter (camada de apresentação).
 */
export abstract class DomainError extends Error {
  abstract readonly code: string;

  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}
