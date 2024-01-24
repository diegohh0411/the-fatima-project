import { Module } from '@nestjs/common';
import { MassService } from './mass.service';
import { MassController } from './mass.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Mass } from './entities/mass.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Mass,
      User
    ])
  ],
  controllers: [MassController],
  providers: [MassService],
})
export class MassModule {}
