import { PrismaService } from '../../prisma/prisma.service';
import { TenantEntity } from '../../entities/tenant.entity';
import { OrganizationEntity } from '../../entities/organization.entity';
import { CreateTenantDto, UpdateOrganizationDto, UpdateTenantStatusDto } from '../../apresentation/dto/tenant.dto';
import { AuditService } from '../audit/audit.service';
import { HttpClient } from '@nestjs/http-client';
export declare class TenantsService {
    private readonly prisma;
    private readonly audit;
    private readonly http;
    constructor(prisma: PrismaService, audit: AuditService, http: HttpClient);
    create(dto: CreateTenantDto): Promise<TenantEntity>;
    findAll(): Promise<{
        tenant: TenantEntity;
        organization: OrganizationEntity | null;
    }[]>;
    findOne(id: string): Promise<TenantEntity>;
    getOrganization(): Promise<OrganizationEntity[]>;
    updateStatus(id: string, dto: UpdateTenantStatusDto): Promise<void>;
    updateOrganization(tenantId: string, dto: UpdateOrganizationDto): Promise<void>;
    private VerificarSeRegionalConfiExiste;
    private ValidandoCNPJExistente;
}
