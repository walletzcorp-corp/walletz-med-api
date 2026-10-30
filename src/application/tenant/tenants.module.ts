import { Module } from '@nestjs/common';
import { TenantsController } from '../../apresentation/controllers/tenants.controller';
import { TenantsService } from './tenants.service';
import { RegionalConfigurationController } from '../../apresentation/controllers/regional-configuration.controller';
import { RegionalConfigurationService } from '../regional.configuration/regional-configuration.service';

@Module({
  controllers: [TenantsController, RegionalConfigurationController],
  providers: [TenantsService, RegionalConfigurationService],
})
export class TenantsModule {}
