import { OrganizationEntity } from './organization.entity';
export type TenantStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
export declare class TenantEntity {
    readonly id: string;
    readonly key: string;
    status: TenantStatus;
    readonly createdAt: Date;
    organization?: OrganizationEntity | null;
    private constructor();
    static create(): TenantEntity;
    static restore(data: {
        id: string;
        key: string;
        status: TenantStatus;
        createdAt: Date;
        organization?: Parameters<typeof OrganizationEntity.restore>[0] | null;
    }): TenantEntity;
    activate(): void;
    deactivate(): void;
    suspend(): void;
    private assertNotSuspended;
}
