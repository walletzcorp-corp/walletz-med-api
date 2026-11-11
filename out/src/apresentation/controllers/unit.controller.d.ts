import { UnitService } from "../../application/unit/unit.service";
import { BlockUnitDto, CreateUnitDto, UpdateUnitDto } from '../dto/unit.dto';
export declare class UnitController {
    private readonly unitService;
    constructor(unitService: UnitService);
    create(organizationId: string, dto: CreateUnitDto): Promise<import("../../entities/unit.entity").UnitEntity>;
    findAll(organizationId: string): Promise<import("../../entities/unit.entity").UnitEntity[]>;
    findOne(organizationId: string, id: string): Promise<import("../../entities/unit.entity").UnitEntity>;
    update(organizationId: string, id: string, dto: UpdateUnitDto): Promise<import("../../entities/unit.entity").UnitEntity>;
    activate(organizationId: string, id: string): Promise<import("../../entities/unit.entity").UnitEntity>;
    block(organizationId: string, id: string, dto: BlockUnitDto): Promise<import("../../entities/unit.entity").UnitEntity>;
}
