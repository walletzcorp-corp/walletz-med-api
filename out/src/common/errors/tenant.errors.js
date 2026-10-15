"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTenantError = exports.TenantNotFoundError = void 0;
const domain_error_1 = require("./domain-error");
class TenantNotFoundError extends domain_error_1.DomainError {
    code = 'NOT_FOUND';
    constructor() {
        super('Tenant não encontrado.');
    }
}
exports.TenantNotFoundError = TenantNotFoundError;
class InvalidTenantError extends domain_error_1.DomainError {
    code = 'INVALID';
}
exports.InvalidTenantError = InvalidTenantError;
//# sourceMappingURL=tenant.errors.js.map