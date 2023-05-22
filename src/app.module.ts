import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { SheltersModule } from './shelters/shelters.module';
import { FundraisersModule } from './fundraisers/fundraisers.module';

@Module({
  imports: [DogsModule, SheltersModule, FundraisersModule, TypeOrmModule.forRoot({
    ...dataSourceOptions,
    autoLoadEntities: true,
    migrations: ['dist/db/migrations/*.js'],
    synchronize: true,
  }), FundraisersModule, FundraisersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
