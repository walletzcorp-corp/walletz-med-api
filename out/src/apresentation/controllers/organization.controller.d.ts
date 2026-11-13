import { OrganizationService } from "../../application/organization/organization.service";
import { PaginationQueryDto } from '../dto/pagination.dto';
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    findAll(query: PaginationQueryDto): Promise<import("../dto/pagination.dto").PaginatedResult<import("../../entities/organization.entity").OrganizationEntity>>;
}
