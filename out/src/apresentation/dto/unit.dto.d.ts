export declare class CreateUnitDto {
    name: string;
    address: string;
    municipality: string;
    uf: string;
    timezone: string;
}
export declare class UpdateUnitDto {
    rowVersio: number;
    name?: string;
    address?: string;
    municipality?: string;
    uf?: string;
    timezone?: string;
}
export declare class BlockUnitDto {
    reason: string;
}
