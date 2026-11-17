import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TenantsModule } from './application/tenant/tenants.module';
import { UnitModule } from './application/unit/unit.module';
import { OrganizationModule } from './application/organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TenantsModule,
    UnitModule,
    OrganizationModule,
  ],
})
export class AppModule {}
