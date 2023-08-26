import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFundraiserDto } from './dto/create-fundraiser.dto';
import { UpdateFundraiserDto } from './dto/update-fundraiser.dto';
import { Fundraiser, FundraiserType } from './entities/fundraiser.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Shelter } from 'src/shelters/entities/shelter.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FundraisersService {
  @InjectRepository(Fundraiser)
  private readonly fundraiserRepository: Repository<Fundraiser>
  @InjectRepository(User)
  private readonly userRepository: Repository<User>
  @InjectRepository(Dog)
  private readonly dogRepository: Repository<Dog>
  @InjectRepository(Shelter)
  private readonly shelterRepository: Repository<Shelter>

  async create(dto: CreateFundraiserDto) {
    const fundraiser = this.fundraiserRepository.create({
      ...dto,
      createdAt: new Date(),
    })

    if (dto.type === FundraiserType.Dog) {
      fundraiser.dog = await this.dogRepository.findOneOrFail({
        where: { id: dto.dogId }
      })
    }

    if (dto.type === FundraiserType.Shelter) {
      fundraiser.shelter = await this.shelterRepository.findOneOrFail({
        where: { id: dto.shelterId }
      })
    }

    if (dto.type === FundraiserType.User) {
      fundraiser.user = await this.userRepository.findOneOrFail({
        where: { id: dto.userId }
      })
    }

    await this.fundraiserRepository.save(fundraiser);
    return {
      success: true,
      data: fundraiser,
    }
  }


  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    const fundraisers = await this.fundraiserRepository.find({
      skip: offset,
      take: limit,
      relations: {
        shelter: true,
        donations: true,
        comments: true,
        dog: true,
        user: true,
      }
    })

    return fundraisers;
  }

  async findOne(id: number) {
    const fundraiser = await this.fundraiserRepository.findOneOrFail({
      where: { id },
      relations: {
        shelter: true,
        donations: true,
        comments: true,
        dog: true,
        user: true,
      }
    })
    if (!fundraiser) {
      throw new NotFoundException(`Fundraiser with ID ${id} was not found`)
    }
    return fundraiser;
  }

  async update(id: number, dto: UpdateFundraiserDto) {
    const dog = await this.dogRepository.findOne({
      where: { id: dto.dogId }
    })
    const shelter = await this.shelterRepository.findOne({
      where: { id: dto.shelterId }
    })
    const user = await this.userRepository.findOne({
      where: { id: dto.userId }
    })
    const fundraiser = await this.fundraiserRepository.preload({
      id: +id,
      ...dto,
      dog: dto.dogId ? dog : null,
      shelter: dto.shelterId ? shelter : null,
      user: dto.userId ? user : null,
    })

    if (!fundraiser) {
      throw new NotFoundException(`Fundraiser with id ${id} not found`)
    }
    await this.fundraiserRepository.save(fundraiser);

    return {
      success: true,
      data: fundraiser,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} fundraiser`;
  }
}
