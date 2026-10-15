import { TenantsService } from "../../application/tenant/tenants.service";
import { CreateTenantDto, UpdateOrganizationDto, UpdateTenantStatusDto } from '../dto/tenant.dto';
export declare class TenantsController {
    private readonly tenantsService;
    constructor(tenantsService: TenantsService);
    create(dto: CreateTenantDto): Promise<{
        id: string;
        key: string;
        status: import("../../entities/tenant.entity").TenantStatus;
        createdAt: Date;
        organization: import("../../entities/organization.entity").OrganizationEntity;
    }>;
    findAll(): Promise<{
        id: string;
        key: string;
        status: import("../../entities/tenant.entity").TenantStatus;
        createdAt: Date;
        organization: null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        key: string;
        status: import("../../entities/tenant.entity").TenantStatus;
        createdAt: Date;
        organization: import("../../entities/organization.entity").OrganizationEntity | null;
    }>;
    updateStatus(id: string, dto: UpdateTenantStatusDto): Promise<void>;
    updateOrganization(id: string, dto: UpdateOrganizationDto): Promise<void>;
    getOrganization(id: string): Promise<import("../../entities/organization.entity").OrganizationEntity | null>;
    updateOrg(id: string, dto: UpdateOrganizationDto): Promise<void>;
}
