export type UnitStatus = 'RASCUNHO' | 'ATIVA' | 'INATIVA' | 'BLOQUEADA';
export declare class UnitEntity {
    readonly id: string;
    readonly organizationId: string;
    readonly code: string;
    name: string;
    address: string;
    municipality: string;
    uf: string;
    timezone: string;
    status: UnitStatus;
    rowVersion: number;
    readonly createdAt: Date;
    updatedAt: Date;
    private constructor();
    static create(input: {
        organizationId: string;
        code: string;
        name: string;
        address: string;
        municipality: string;
        uf: string;
        timezone: string;
    }): UnitEntity;
    static restore(data: {
        id: string;
        organizationId: string;
        unitCode: string;
        name: string | null;
        address: string | null;
        municipality: string | null;
        uf: string | null;
        timezone: string | null;
        status: UnitStatus;
        row_version: number;
        createdAt: Date;
        updatedAt: Date;
    }): UnitEntity;
    activate(): void;
    block(reason: string): void;
    inactivate(): void;
    update(fields: Partial<Pick<UnitEntity, 'name' | 'address' | 'municipality' | 'uf' | 'timezone'>>, expectedVersion: number): void;
    private static assertTimezone;
    private static assertUf;
}
