import { DomainError } from './domain-error';
export declare class TenantNotFoundError extends DomainError {
    readonly code = "NOT_FOUND";
    constructor();
}
export declare class InvalidTenantError extends DomainError {
    readonly code = "INVALID";
}
