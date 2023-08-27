import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Shelter } from 'src/shelters/entities/shelter.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dog, Shelter, Donation, User])],
  controllers: [DogsController],
  providers: [DogsService]
})
export class DogsModule { }
