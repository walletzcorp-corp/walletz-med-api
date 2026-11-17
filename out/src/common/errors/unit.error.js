"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitChecklistPendingError = exports.UnitVersionConflictError = exports.InvalidUnitError = exports.UnitNotFoundError = void 0;
const domain_error_1 = require("./domain-error");
class UnitNotFoundError extends domain_error_1.DomainError {
    code = 'NOT FOUND';
    constructor() {
        super('Unidade não encontrada.');
    }
}
exports.UnitNotFoundError = UnitNotFoundError;
class InvalidUnitError extends domain_error_1.DomainError {
    code = 'INVALID';
}
exports.InvalidUnitError = InvalidUnitError;
class UnitVersionConflictError extends domain_error_1.DomainError {
    code = 'CONFLICT';
    constructor(message = 'Conflito de versão') {
        super(message);
    }
}
exports.UnitVersionConflictError = UnitVersionConflictError;
class UnitChecklistPendingError extends domain_error_1.DomainError {
    missingFields;
    code = 'UNPROCESSABLE_ENTITY';
    constructor(missingFields) {
        super(`Não é possível ativar a unidade. Pendências: ${missingFields.join(', ')}`);
        this.missingFields = missingFields;
    }
}
exports.UnitChecklistPendingError = UnitChecklistPendingError;
//# sourceMappingURL=unit.error.js.map