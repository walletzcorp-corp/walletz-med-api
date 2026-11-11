import { PrismaService } from "../../prisma/prisma.service";
export declare class RegionalConfigurationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllActive(): import(".prisma/client").Prisma.PrismaPromise<{
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
