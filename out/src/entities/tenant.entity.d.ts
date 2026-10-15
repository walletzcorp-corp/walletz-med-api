export type TenantStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
export declare class TenantEntity {
    readonly id: string;
    readonly key: string;
    status: TenantStatus;
    readonly createdAt: Date;
    private constructor();
    static create(): TenantEntity;
    static restore(data: Omit<TenantEntity, 'activate' | 'deactivate' | 'suspend'>): TenantEntity;
    activate(): void;
    deactivate(): void;
    suspend(): void;
    private assertNotSuspended;
}
