export type OrgStatus = 'ACTIVE' | 'INACTIVE';
export type TaxProfile = 'SIMPLES_NACIONAL' | 'LUCRO_PRESUMIDO' | 'LUCRO_REAL' | 'MEI';
export declare class OrganizationEntity {
    readonly id: string;
    readonly tenantId: string;
    legalName: string;
    tradeName: string;
    cnpjDigits: string;
    taxProfile: TaxProfile;
    regionalConfigId: string;
    status: OrgStatus;
    rowVersion: number;
    readonly createdAt: Date;
    updatedAt: Date;
    private constructor();
    static createIsValid(input: Pick<OrganizationEntity, 'tenantId' | 'legalName' | 'tradeName' | 'cnpjDigits' | 'taxProfile' | 'regionalConfigId'>): OrganizationEntity;
    static restore(data: Omit<OrganizationEntity, 'update' | 'deactivate'>): OrganizationEntity;
    update(fields: Partial<Pick<OrganizationEntity, 'legalName' | 'tradeName' | 'cnpjDigits' | 'taxProfile' | 'regionalConfigId'>>, expectedVersion: number): void;
    deactivate(): void;
    private static assertCnpj;
    private static assertNonEmpty;
}
export declare class OrganizationVersionConflictError extends Error {
    readonly code = "CONFLICT";
    constructor(message: string);
}
