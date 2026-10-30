import { UnitService } from "../../application/unit/unit.service";
import { CreateUnitDto } from '../dto/unit.dto';
export declare class UnitController {
    private readonly unitService;
    constructor(unitService: UnitService);
    create(organizationId: string, dto: CreateUnitDto): Promise<import("../../entities/unit.entity").UnitEntity>;
}
