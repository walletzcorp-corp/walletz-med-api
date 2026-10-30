import { PrismaService } from '../../prisma/prisma.service';
import { TenantEntity } from '../../entities/tenant.entity';
import { OrganizationEntity } from '../../entities/organization.entity';
import { CreateTenantDto, UpdateOrganizationDto, UpdateTenantStatusDto } from '../../apresentation/dto/tenant.dto';
export declare class TenantsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTenantDto): Promise<{
        tenant: TenantEntity;
        organization: OrganizationEntity;
    }>;
    findAll(): Promise<TenantEntity[]>;
    findOne(id: string): Promise<{
        tenant: TenantEntity;
        organization: OrganizationEntity | null;
    }>;
    updateStatus(id: string, dto: UpdateTenantStatusDto): Promise<void>;
    updateOrganization(tenantId: string, dto: UpdateOrganizationDto): Promise<void>;
    private assertRegionalConfigAvailable;
}
