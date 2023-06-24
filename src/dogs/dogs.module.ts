import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Shelter } from 'src/shelters/entities/shelter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dog, Shelter])],
  controllers: [DogsController],
  providers: [DogsService]
})
export class DogsModule { }
