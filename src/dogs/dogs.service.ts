import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Repository } from 'typeorm';
import { Dog } from './entities/dog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FilterDogsDto } from './dto/filter-dogs.dto';
import { Size } from './enums/size.enum';

@Injectable()
export class DogsService {
  @InjectRepository(Dog)
  private readonly dogRepository: Repository<Dog>

  async create(createDogDto: CreateDogDto) {
    const dog = this.dogRepository.create({
      ...createDogDto
    })
    await this.dogRepository.save(dog);
    return {
      success: true,
      data: dog,
    };
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, size } = paginationQuery;
    const dogs = await this.dogRepository.find({
      skip: offset,
      take: limit,
      relations: {
        shelter: true,
      },
      where: {
        size: size
      }
    })

    return dogs;
  }

  async findOne(id: number) {
    const dog = await this.dogRepository.findOneOrFail({
      where: { id },
      relations: {
        shelter: true,
      },
    })
    if (!dog) {
      throw new NotFoundException(`Dog with ID ${id} was not found`)
    }
    return dog;
  }

  async update(id: number, updateDogDto: UpdateDogDto) {
    const dog = await this.dogRepository.preload({
      id: +id,
      ...updateDogDto
    })
    if (!dog) {
      throw new NotFoundException(`Dog with ${id} not found`);
    }
    await this.dogRepository.save(dog);
    return {
      success: true,
      data: dog,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} dog`;
  }
}
