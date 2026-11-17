import { DomainError } from './domain-error';
export declare class OrganizationNotFoundError extends DomainError {
    readonly code = "NOT_FOUND";
    constructor();
}
export declare class InvalidOrganizationError extends DomainError {
    readonly code = "INVALID";
}
export declare class OrganizationVersionConflictError extends DomainError {
    readonly code = "CONFLICT";
    constructor(message?: string);
}
