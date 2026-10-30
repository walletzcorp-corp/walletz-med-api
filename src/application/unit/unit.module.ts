import { Module } from '@nestjs/common';
import { UnitController } from 'src/apresentation/controllers/unit.controller';
import { UnitService } from './unit.service';
('src/apresentation/controllers/units.controller');

@Module({
  controllers: [UnitController],
  providers: [UnitService],
  exports: [UnitService],
})
export class UnitModule {}
