import { Module } from '@nestjs/common';
import { TenantsController } from './apresentation/controllers/tenants.controller';
import { TenantsService } from './application/tenant/tenants.service';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule {}
