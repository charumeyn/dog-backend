import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { User } from 'src/user-auth/user/user.entity';
import { Dog } from 'src/dogs/entities/dog.entity';

@Injectable()
export class DonationsService {
  @InjectRepository(Donation)
  private readonly donationRepository: Repository<Donation>
  @InjectRepository(User)
  private readonly userRepository: Repository<User>
  @InjectRepository(Dog)
  private readonly dogRepository: Repository<Dog>

  async create(createDonationDto: CreateDonationDto) {
    const donation = this.donationRepository.create({
      ...createDonationDto,
    })

    donation.dog = await this.dogRepository.findOneOrFail({
      where: { id: createDonationDto.dog_id }
    })

    await this.donationRepository.save(donation);

    return {
      success: true,
      data: donation
    }
  }


  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    const donations = await this.donationRepository.find({
      skip: offset,
      take: limit,
      relations: {
        dog: true,
      }
    })

    return donations;
  }

  async findOne(id: number) {
    const donation = await this.donationRepository.findOneOrFail({
      where: { id },
      relations: {
        dog: true,
      }
    })
    if (!donation) {
      throw new NotFoundException(`Donation with ID ${id} was not found`)
    }
    return donation;
  }

  async update(id: number, updateDonationDto: UpdateDonationDto) {
    const dog = await this.donationRepository.findOneOrFail({
      where: { id: updateDonationDto.dog_id }
    })
    const donation = await this.donationRepository.preload({
      id: +id,
      ...updateDonationDto,
      dog
    })

    if (!donation) {
      throw new NotFoundException(`Donation with ${id} not found`);
    }

    await this.donationRepository.save(donation)

    return {
      success: true,
      data: donation,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} donation`;
  }
}
