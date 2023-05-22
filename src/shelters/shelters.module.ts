import { Module } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { SheltersController } from './shelters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shelter } from './entities/shelter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shelter])],
  controllers: [SheltersController],
  providers: [SheltersService]
})
export class SheltersModule {}
