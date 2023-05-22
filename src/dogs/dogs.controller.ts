import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FilterDogsDto } from './dto/filter-dogs.dto';
import { Size } from './enums/size.enum';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) { }

  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.dogsService.findAll(paginationQuery);
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDogDto: UpdateDogDto) {
    return this.dogsService.update(+id, updateDogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogsService.remove(+id);
  }
}
