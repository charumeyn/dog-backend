import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class AddressesService {
  @InjectRepository(Address)
  private readonly addressRepository: Repository<Address>

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, size } = paginationQuery;
    const addresses = await this.addressRepository.find({
      skip: offset,
      take: limit,
    })

    return addresses;
  }

  async create(createAddressDto: CreateAddressDto) {
    const address = this.addressRepository.create({
      ...createAddressDto
    })
    await this.addressRepository.save(address)
    return {
      success: true,
      data: address,
    }
  }

  async findOne(id: number) {
    const address = await this.addressRepository.findOneOrFail({
      where: { id }
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
