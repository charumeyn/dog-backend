import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressesService {
  @InjectRepository(Address)
  private readonly addressRepository: Repository<Address>
  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, size } = paginationQuery;
    const addresses = await this.addressRepository.find({
      skip: offset,
      take: limit,
    })

    return addresses;
  }

  async create(createAddressDto: CreateAddressDto) {
    const getUser = await this.userRepository.findOneOrFail({
      where: { id: createAddressDto.user_id }
    })
    const address = this.addressRepository.create({
      line1: createAddressDto.line1,
      line2: createAddressDto.line2,
      line3: createAddressDto.line3,
      city: createAddressDto.city,
      state: createAddressDto.state,
      zip: createAddressDto.zip,
      country: createAddressDto.country,
      user: getUser
    })
    await this.addressRepository.save(address)
    return {
      success: true,
      data: address,
    }
  }

  async findOne(id: number) {
    const address = await this.addressRepository.findOneOrFail({
      where: { id },
      relations: {
        user: true
      }
    })
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} was not found`)
    }
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressRepository.preload({
      id: +id,
      ...updateAddressDto
    })
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} was not found`)
    }
    await this.addressRepository.save(address);
    return {
      success: true,
      data: address,
    }
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
