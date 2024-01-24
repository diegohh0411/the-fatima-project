import { Module } from '@nestjs/common';
import { MassService } from './mass.service';
import { MassController } from './mass.controller';

@Module({
  controllers: [MassController],
  providers: [MassService],
})
export class MassModule {}
