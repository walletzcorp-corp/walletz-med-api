import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TenantsModule } from './application/tenant/tenants.module';
import { UnitModule } from './application/unit/unit.module';
import { OrganizationModule } from './application/organization/organization.module';
import { audit } from 'rxjs';
import { AuditMiddleware } from './infra/middlewares/audit.middleware';
import { OrganizationController } from './apresentation/controllers/organization.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TenantsModule,
    UnitModule,
    OrganizationModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware).forRoutes(OrganizationController);
  }
}
