import { Module } from '@nestjs/common';
import { UnitController } from 'src/apresentation/controllers/unit.controller';
import { UnitService } from './unit.service';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [AuditModule],

  controllers: [UnitController],
  providers: [UnitService],
  exports: [UnitService],
})
export class UnitModule {}
