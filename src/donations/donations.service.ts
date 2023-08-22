import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation, DonationType, RecipientType } from './entities/donation.entity';
import { Repository, TreeLevelColumn } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Fundraiser } from 'src/fundraisers/entities/fundraiser.entity';
import { User } from 'src/users/entities/user.entity';
import { Shelter } from 'src/shelters/entities/shelter.entity';

@Injectable()
export class DonationsService {
  @InjectRepository(Donation)
  private readonly donationRepository: Repository<Donation>
  @InjectRepository(User)
  private readonly userRepository: Repository<User>
  @InjectRepository(Dog)
  private readonly dogRepository: Repository<Dog>
  @InjectRepository(Shelter)
  private readonly shelterRepository: Repository<Shelter>
  @InjectRepository(Fundraiser)
  private readonly fundraiserRepository: Repository<Fundraiser>

  async create(dto: CreateDonationDto) {
    const donation = this.donationRepository.create({
      ...dto,
      createdAt: new Date()
    })

    if (dto.recipientType === RecipientType.Dog) {
      donation.dog = await this.dogRepository.findOneOrFail({
        where: { id: dto.dogId }
      })
    }

    if (dto.recipientType === RecipientType.Shelter) {
      donation.shelter = await this.shelterRepository.findOneOrFail({
        where: { id: dto.shelterId }
      })
    }

    if (dto.recipientType === RecipientType.User) {
      donation.user = await this.userRepository.findOneOrFail({
        where: { id: dto.userId }
      })
    }

    if (dto.donationType === DonationType.Fundraiser) {
      donation.fundraiser = await this.fundraiserRepository.findOneOrFail({
        where: { id: dto.fundraiserId }
      })
    }

    donation.donor = await this.userRepository.findOneOrFail({
      where: { id: dto.donorId }
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
        shelter: true,
        user: true,
        fundraiser: true,
        donor: true
      }
    })

    return donations;
  }

  async findOne(id: number) {
    const donation = await this.donationRepository.findOneOrFail({
      where: { id },
      relations: {
        dog: true,
        user: true,
        shelter: true,
        fundraiser: true,
        donor: true
      }
    })
    if (!donation) {
      throw new NotFoundException(`Donation with ID ${id} was not found`)
    }
    return donation;
  }

  async update(id: number, dto: UpdateDonationDto) {
    const dog = await this.dogRepository.findOne({
      where: { id: dto.dogId }
    })
    const shelter = await this.shelterRepository.findOne({
      where: { id: dto.shelterId }
    })
    const user = await this.userRepository.findOne({
      where: { id: dto.userId }
    })
    const fundraiser = await this.fundraiserRepository.findOne({
      where: { id: dto.fundraiserId }
    })
    const donor = await this.userRepository.findOne({
      where: { id: dto.donorId }
    })
    const donation = await this.donationRepository.preload({
      id: +id,
      ...dto,
      dog: dto.dogId ? dog : null,
      user: dto.userId ? user : null,
      shelter: dto.shelterId ? shelter : null,
      fundraiser: dto.fundraiserId ? fundraiser : null,
      donor: donor
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
