import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { User } from 'src/user-auth/user/user.entity';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Fundraiser } from 'src/fundraisers/entities/fundraiser.entity';
import { RecipientType } from 'src/common/enums/recipient-type.enum';

@Injectable()
export class DonationsService {
  @InjectRepository(Donation)
  private readonly donationRepository: Repository<Donation>
  @InjectRepository(User)
  private readonly userRepository: Repository<User>
  @InjectRepository(Dog)
  private readonly dogRepository: Repository<Dog>
  @InjectRepository(Fundraiser)
  private readonly fundRaiserRepository: Repository<Fundraiser>

  async create(createDonationDto: CreateDonationDto) {
    const donation = this.donationRepository.create({
      ...createDonationDto,
    })

    if (createDonationDto.type === RecipientType.DOG) {
      donation.dog = await this.dogRepository.findOneOrFail({
        where: { id: createDonationDto.dog_id }
      })
    }

    if (createDonationDto.type === RecipientType.FUNDRAISER) {
      donation.fundraiser = await this.fundRaiserRepository.findOneOrFail({
        where: { id: createDonationDto.fundraiser_id }
      })
    }

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
        fundraiser: true,
      }
    })

    return donations;
  }

  async findOne(id: number) {
    const donation = await this.donationRepository.findOneOrFail({
      where: { id },
      relations: {
        dog: true,
        fundraiser: true,
      }
    })
    if (!donation) {
      throw new NotFoundException(`Donation with ID ${id} was not found`)
    }
    return donation;
  }

  async update(id: number, updateDonationDto: UpdateDonationDto) {
    const dog = await this.dogRepository.findOne({
      where: { id: updateDonationDto.dog_id }
    })
    const fundraiser = await this.fundRaiserRepository.findOne({
      where: { id: updateDonationDto.fundraiser_id }
    })
    const donation = await this.donationRepository.preload({
      id: +id,
      ...updateDonationDto,
      dog: updateDonationDto.dog_id ? dog : null,
      fundraiser: updateDonationDto.fundraiser_id ? fundraiser : null,
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
