import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) { }

  @Post()
  create(@Body() dto: CreateDonationDto) {
    return this.donationsService.create(dto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.donationsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateDonationDto) {
    return this.donationsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donationsService.remove(+id);
  }
}
