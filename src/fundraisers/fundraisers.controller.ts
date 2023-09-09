import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FundraisersService } from './fundraisers.service';
import { CreateFundraiserDto } from './dto/create-fundraiser.dto';
import { UpdateFundraiserDto } from './dto/update-fundraiser.dto';
import { FundraiserPaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('fundraisers')
export class FundraisersController {
  constructor(private readonly fundraisersService: FundraisersService) { }

  @Post()
  create(@Body() createFundraiserDto: CreateFundraiserDto) {
    return this.fundraisersService.create(createFundraiserDto);
  }

  @Get()
  findAll(@Query() dto: FundraiserPaginationQueryDto) {
    return this.fundraisersService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fundraisersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFundraiserDto) {
    return this.fundraisersService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fundraisersService.remove(+id);
  }
}
