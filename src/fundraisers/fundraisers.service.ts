import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFundraiserDto } from './dto/create-fundraiser.dto';
import { UpdateFundraiserDto } from './dto/update-fundraiser.dto';
import { Fundraiser } from './entities/fundraiser.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { User } from 'src/user-auth/user/user.entity';
import { Dog } from 'src/dogs/entities/dog.entity';
import { RecipientType } from 'src/common/enums/recipient-type.enum';
import { FundraiserType } from 'src/common/enums/fundraiser-type.enum';
import { Shelter } from 'src/shelters/entities/shelter.entity';

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
      ...dto
    })

    if (dto.type === FundraiserType.Dog) {
      fundraiser.dog = await this.dogRepository.findOneOrFail({
        where: { id: dto.dog_id }
      })
    }

    if (dto.type === FundraiserType.Shelter) {
      fundraiser.shelter = await this.shelterRepository.findOneOrFail({
        where: { id: dto.shelter_id }
      })
    }

    if (dto.type === FundraiserType.User) {
      fundraiser.user = await this.userRepository.findOneOrFail({
        where: { id: dto.user_id }
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
      }
    })
    if (!fundraiser) {
      throw new NotFoundException(`Fundraiser with ID ${id} was not found`)
    }
    return fundraiser;
  }

  async update(id: number, dto: UpdateFundraiserDto) {
    const dog = await this.dogRepository.findOne({
      where: { id: dto.dog_id }
    })
    const shelter = await this.shelterRepository.findOne({
      where: { id: dto.shelter_id }
    })
    const user = await this.userRepository.findOne({
      where: { id: dto.user_id }
    })
    const fundraiser = await this.fundraiserRepository.preload({
      id: +id,
      ...dto,
      dog: dto.dog_id ? dog : null,
      shelter: dto.shelter_id ? shelter : null,
      user: dto.user_id ? user : null
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
