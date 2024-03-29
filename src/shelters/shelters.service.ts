import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { Shelter } from './entities/shelter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class SheltersService {
  @InjectRepository(Shelter)
  private readonly shelterRepository: Repository<Shelter>
  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  async create(dto: CreateShelterDto) {
    const shelter = this.shelterRepository.create({
      ...dto
    })

    shelter.user = await this.userRepository.findOneOrFail({
      where: { id: dto.userId }
    })

    await this.shelterRepository.save(shelter);
    return {
      success: true,
      data: shelter,
    };
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    const shelters = await this.shelterRepository.find({
      skip: offset,
      take: limit,
    })

    return shelters;
  }

  async findOne(id: number) {
    const shelter = await this.shelterRepository.findOneOrFail({
      where: { id },
      relations: {
        dogs: true,
        donations: true,
        fundraisers: true,
        user: true,
      },
    })
    if (!shelter) {
      throw new NotFoundException(`Shelter with ID ${id} was not found`)
    }
    return shelter;
  }

  async update(id: number, updateShelterDto: UpdateShelterDto) {
    const shelter = await this.shelterRepository.preload({
      id: +id,
      ...updateShelterDto
    })
    if (!shelter) {
      throw new NotFoundException(`Shelter with ${id} not found`)
    }
    await this.shelterRepository.save(shelter)
    return {
      success: true,
      data: shelter,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} shelter`;
  }
}
