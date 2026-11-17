import { DomainError } from './domain-error';
export declare class UnitNotFoundError extends DomainError {
    readonly code = "NOT FOUND";
    constructor();
}
export declare class InvalidUnitError extends DomainError {
    readonly code = "INVALID";
}
export declare class UnitVersionConflictError extends DomainError {
    readonly code = "CONFLICT";
    constructor(message?: string);
}
export declare class UnitChecklistPendingError extends DomainError {
    readonly missingFields: string[];
    readonly code = "UNPROCESSABLE_ENTITY";
    constructor(missingFields: string[]);
}
