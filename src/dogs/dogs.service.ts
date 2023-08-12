import { Injectable, NotFoundException, ValidationPipe } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Repository } from 'typeorm';
import { Dog } from './entities/dog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Shelter } from 'src/shelters/entities/shelter.entity';
import { Donation } from 'src/donations/entities/donation.entity';

@Injectable()
export class DogsService {
  @InjectRepository(Dog)
  private readonly dogRepository: Repository<Dog>
  @InjectRepository(Shelter)
  private readonly shelterRepository: Repository<Shelter>
  @InjectRepository(Donation)
  private readonly donationRepository: Repository<Donation>

  async create(dto: CreateDogDto) {
    const dog = this.dogRepository.create({
      ...dto
    })

    dog.shelter = await this.shelterRepository.findOneOrFail({
      where: { id: dto.shelterId }
    })

    await this.dogRepository.save(dog);

    return {
      success: true,
      data: dog
    };
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, size } = paginationQuery;
    const dogs = await this.dogRepository.find({
      skip: offset,
      take: limit,
      relations: {
        shelter: true,
        posts: true,
        donations: true,
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
        posts: true,
        donations: true,
      },
    })
    if (!dog) {
      throw new NotFoundException(`Dog with ID ${id} was not found`)
    }
    return dog;
  }

  async update(id: number, dto: UpdateDogDto) {
    const dog = await this.dogRepository.preload({
      id: +id,
      ...dto
    })

    if (!dog) {
      throw new NotFoundException(`Dog with ${id} not found`);
    }
    await this.dogRepository.save(dog);

    const updatedDog = await this.dogRepository.findOneOrFail({
      where: { id },
      relations: {
        shelter: true,
        donations: true,
      }
    })

    return {
      success: true,
      data: updatedDog,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} dog`;
  }
}
