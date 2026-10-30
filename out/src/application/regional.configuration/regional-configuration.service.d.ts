import { PrismaService } from "../../prisma/prisma.service";
export declare class RegionalConfigurationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllActive(): import(".prisma/client").Prisma.PrismaPromise<{
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
