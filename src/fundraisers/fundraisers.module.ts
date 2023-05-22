import { Module } from '@nestjs/common';
import { FundraisersService } from './fundraisers.service';
import { FundraisersController } from './fundraisers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fundraiser } from './entities/fundraiser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fundraiser])],
  controllers: [FundraisersController],
  providers: [FundraisersService]
})
export class FundraisersModule { }
