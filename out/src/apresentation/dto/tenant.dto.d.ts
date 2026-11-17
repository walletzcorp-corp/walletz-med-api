import { TaxProfile } from '../../entities/organization.entity';
import { TenantStatus } from '../../entities/tenant.entity';
export declare class CreateTenantDto {
    legalName: string;
    tradeName: string;
    cnpjDigits: string;
    taxProfile: TaxProfile;
    regionalConfigId: string;
}
export declare class UpdateTenantStatusDto {
    status: TenantStatus;
}
export declare class UpdateOrganizationDto {
    legalName?: string;
    tradeName?: string;
    cnpjDigits?: string;
    taxProfile?: TaxProfile;
    regionalConfigId?: string;
    rowVersion: number;
}
