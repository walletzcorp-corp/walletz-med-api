import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from 'src/apresentation/controllers/organization.controller';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
