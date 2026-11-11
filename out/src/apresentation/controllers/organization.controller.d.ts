import { OrganizationService } from "../../application/organization/organization.service";
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    findAll(): Promise<import("../../entities/organization.entity").OrganizationEntity[]>;
}
