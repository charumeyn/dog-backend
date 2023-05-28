import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { User } from './user.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Address } from 'src/addresses/entities/address.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    const users = await this.repository.find({
      skip: offset,
      take: limit
    })

    return users;
  }

  async findOne(id: number) {
    const user = await this.repository.findOneOrFail({
      where: { id },
      relations: {
        address: true,
        shelter: true
      }
    })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found`)
    }
    return user;
  }
}