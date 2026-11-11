export declare class CreateUnitDto {
    name: string;
    country: string;
    address: string;
    municipality: string;
    uf: string;
    timezone: string;
}
export declare class UpdateUnitDto {
    rowVersion: number;
    name?: string;
    country?: string;
    address?: string;
    municipality?: string;
    uf?: string;
    timezone?: string;
}
export declare class BlockUnitDto {
    reason: string;
}
