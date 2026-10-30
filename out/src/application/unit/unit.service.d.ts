import { CreateUnitDto, UpdateUnitDto } from "../../apresentation/dto/unit.dto";
import { UnitEntity } from "../../entities/unit.entity";
import { PrismaService } from "../../prisma/prisma.service";
export declare class UnitService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(organizationId: string, dto: CreateUnitDto): Promise<UnitEntity>;
    private gerenateNextUnitCode;
    activate(): Promise<void>;
    block(): Promise<void>;
    update(id: string, organizationId: string, dto: UpdateUnitDto): Promise<void>;
}
