import { RegionalConfigurationService } from "../../application/regional.configuration/regional-configuration.service";
export declare class RegionalConfigurationController {
    private readonly service;
    constructor(service: RegionalConfigurationService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        name: string;
        code: string;
        currency: string;
        locale: string;
        timezone: string;
        active: boolean;
    }[]>;
}
