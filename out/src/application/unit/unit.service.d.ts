import { BlockUnitDto, CreateUnitDto, UpdateUnitDto } from "../../apresentation/dto/unit.dto";
import { UnitEntity } from "../../entities/unit.entity";
import { PrismaService } from "../../prisma/prisma.service";
export declare class UnitService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(organizationId: string, dto: CreateUnitDto): Promise<UnitEntity>;
    private gerenateNextUnitCode;
    private getUnitOrThrow;
    findOne(id: string, organizationId: string): Promise<UnitEntity>;
    activate(id: string, organizationId: string): Promise<UnitEntity>;
    block(id: string, organizationId: string, dto: BlockUnitDto): Promise<UnitEntity>;
    findAllByOrganization(organizationId: string): Promise<UnitEntity[]>;
    update(id: string, organizationId: string, dto: UpdateUnitDto): Promise<UnitEntity>;
}
