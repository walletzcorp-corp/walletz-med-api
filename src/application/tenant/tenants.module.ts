import { Module } from '@nestjs/common';
import { TenantsController } from '../../apresentation/controllers/tenants.controller';
import { TenantsService } from './tenants.service';
import { RegionalConfigurationController } from '../../apresentation/controllers/regional-configuration.controller';
import { RegionalConfigurationService } from '../regional.configuration/regional.configuration.service';
import { AuditService } from '../audit/audit.service';
import { AuditModule } from '../audit/audit.module';
import { HttpClientModule } from '@nestjs/http-client';

@Module({
  imports: [
    AuditModule,
    HttpClientModule.register({
      //baseUrl: 'https://viacep.com.br/ws',
      baseUrl: 'https://brasilapi.com.br/api/cnpj/v1/',
      timeout: '5s',
      headers: {
        accept: 'application/json',
        'user-agent': 'walletz-med-api/1.0',
      },
    }),
  ],

  controllers: [TenantsController, RegionalConfigurationController],
  providers: [TenantsService, RegionalConfigurationService],
})
export class TenantsModule {}
