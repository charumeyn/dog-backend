import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('shelters')
export class SheltersController {
  constructor(private readonly sheltersService: SheltersService) { }

  @Post()
  create(@Body() createShelterDto: CreateShelterDto) {
    return this.sheltersService.create(createShelterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sheltersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShelterDto: UpdateShelterDto) {
    return this.sheltersService.update(+id, updateShelterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sheltersService.remove(+id);
  }
}
