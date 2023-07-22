import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Fundraiser } from 'src/fundraisers/entities/fundraiser.entity';
import { Dog } from 'src/dogs/entities/dog.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donation, User, Dog, Fundraiser])],
  controllers: [DonationsController],
  providers: [DonationsService]
})
export class DonationsModule { }
