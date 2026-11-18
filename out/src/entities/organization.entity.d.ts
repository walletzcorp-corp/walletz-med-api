import { UnitEntity } from './unit.entity';
export type OrgStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'CLOSED';
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
    Unit?: UnitEntity[] | null;
    private constructor();
    static createIsValid(input: Pick<OrganizationEntity, 'tenantId' | 'legalName' | 'tradeName' | 'cnpjDigits' | 'taxProfile' | 'regionalConfigId'>): OrganizationEntity;
    static restore(data: any): OrganizationEntity;
    update(fields: Partial<Pick<OrganizationEntity, 'legalName' | 'tradeName' | 'cnpjDigits' | 'taxProfile' | 'regionalConfigId'>>, expectedVersion: number): void;
    deactivate(): void;
    private static assertCnpj;
    private static assertNonEmpty;
}
export declare class OrganizationVersionConflictError extends Error {
    readonly code = "CONFLICT";
    constructor(message: string);
}
