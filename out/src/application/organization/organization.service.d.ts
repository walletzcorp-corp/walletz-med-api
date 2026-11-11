import { OrganizationEntity } from "../../entities/organization.entity";
import { PrismaService } from "../../prisma/prisma.service";
export declare class OrganizationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getOrganization(): Promise<OrganizationEntity[]>;
}
