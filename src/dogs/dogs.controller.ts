import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { DogPaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) { }

  @Post()
  create(@Body() dto: CreateDogDto) {
    return this.dogsService.create(dto);
  }

  @Get()
  findAll(@Query() dto: DogPaginationQueryDto) {
    return this.dogsService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateDogDto) {
    return this.dogsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogsService.remove(+id);
  }
}
