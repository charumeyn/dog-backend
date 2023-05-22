import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFundraiserDto } from './dto/create-fundraiser.dto';
import { UpdateFundraiserDto } from './dto/update-fundraiser.dto';
import { Fundraiser } from './entities/fundraiser.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class FundraisersService {
  @InjectRepository(Fundraiser)
  private readonly fundraiserRepository: Repository<Fundraiser>

  async create(createFundraiserDto: CreateFundraiserDto) {
    const fundraiser = this.fundraiserRepository.create({
      ...createFundraiserDto
    })
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
      }
    })

    return fundraisers;
  }

  async findOne(id: number) {
    const fundraiser = await this.fundraiserRepository.findOneOrFail({
      where: { id },
      relations: {
        shelter: true
      }
    })
    if (!fundraiser) {
      throw new NotFoundException(`Fundraiser with ID ${id} was not found`)
    }
    return fundraiser;
  }

  async update(id: number, updateFundraiserDto: UpdateFundraiserDto) {
    const fundraiser = await this.fundraiserRepository.preload({
      id: +id,
      ...updateFundraiserDto
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
