import { RegionalConfigurationService } from "../../application/regional.configuration/regional.configuration.service";
export declare class RegionalConfigurationController {
    private readonly service;
    constructor(service: RegionalConfigurationService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        code: string;
        name: string;
        timezone: string;
        createdAt: Date;
        currency: string;
        locale: string;
        active: boolean;
    }[]>;
}
