import { Module } from '@nestjs/common';
import { FundraisersService } from './fundraisers.service';
import { FundraisersController } from './fundraisers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fundraiser } from './entities/fundraiser.entity';
import { User } from 'src/user-auth/user/user.entity';
import { Shelter } from 'src/shelters/entities/shelter.entity';
import { Dog } from 'src/dogs/entities/dog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fundraiser, User, Shelter, Dog])],
  controllers: [FundraisersController],
  providers: [FundraisersService]
})
export class FundraisersModule { }
