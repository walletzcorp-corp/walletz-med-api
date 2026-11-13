export declare class PaginationQueryDto {
    page: number;
    limit: number;
}
export declare class PaginationMetaDto {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export interface PaginatedResult<T> {
    data: T[];
    meta: PaginationMetaDto;
}
