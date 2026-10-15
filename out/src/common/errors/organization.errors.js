"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationVersionConflictError = exports.InvalidOrganizationError = exports.OrganizationNotFoundError = void 0;
const domain_error_1 = require("./domain-error");
class OrganizationNotFoundError extends domain_error_1.DomainError {
    code = 'NOT_FOUND';
    constructor() {
        super('Organização não encontrada.');
    }
}
exports.OrganizationNotFoundError = OrganizationNotFoundError;
class InvalidOrganizationError extends domain_error_1.DomainError {
    code = 'INVALID';
}
exports.InvalidOrganizationError = InvalidOrganizationError;
class OrganizationVersionConflictError extends domain_error_1.DomainError {
    code = 'CONFLICT';
    constructor(message = 'Conflito de versão: a organização foi modificada por outra operação.') {
        super(message);
    }
}
exports.OrganizationVersionConflictError = OrganizationVersionConflictError;
//# sourceMappingURL=organization.errors.js.map