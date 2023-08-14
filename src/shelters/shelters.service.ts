import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { Shelter } from './entities/shelter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SheltersService {
  @InjectRepository(Shelter)
  private readonly shelterRepository: Repository<Shelter>
  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  async create(createShelterDto: CreateShelterDto) {
    const shelter = this.shelterRepository.create({
      ...createShelterDto
    })
    await this.shelterRepository.save(shelter);
    return {
      success: true,
      data: shelter,
    };
  }

  async findOne(id: number) {
    const shelter = await this.shelterRepository.findOneOrFail({
      where: { id },
      relations: {
        dogs: true,
        donations: true,
        fundraisers: true,
        address: true,
        users: true,
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
