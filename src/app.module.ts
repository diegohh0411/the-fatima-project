import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MassModule } from './mass/mass.module';

import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'pass1234',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule, 
    MassModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
