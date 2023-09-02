import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User, UserType } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from "express";
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';


@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly usersRepository: Repository<User>

  @Inject(JwtService)
  private readonly jwtService: JwtService

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const duplicateEmail = await this.usersRepository.findOne({
      where: { email: dto.email }
    })

    const user = await this.usersRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashedPassword,
      type: dto.type
    })

    await this.usersRepository.save(user);

    if (duplicateEmail) {
      throw new BadRequestException('This is email is already registered. Please login.')
    }

    delete user.password

    return {
      success: true,
      data: user,
    };
  }

  async login(dto: LoginDto, response: Response) {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    })
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!await bcrypt.compare(dto.password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    const { password, ...account } = user;

    return {
      success: true,
      data: account
    };
  }

  async account(request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        // throw new UnauthorizedException();
        return {
          success: false,
          data: "You are logged out"
        };
      }

      const user = await this.usersRepository.findOne({
        where: {
          id: Number(data['id'])
        },
        relations: {
          address: true,
          shelter: true,
          donations: true,
          fundraisers: true,
          createdFundraisers: true,
          comments: true,
          dogs: true,
        },
      })

      const { password, ...account } = user;

      return account;
    }

    catch (e) {
      // throw new UnauthorizedException();
      return {
        success: false,
        data: "You are logged out"
      };
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id: +id,
      ...dto
    })

    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    await this.usersRepository.save(user);

    const updatedUser = await this.usersRepository.findOneOrFail({
      where: { id }
    })

    return {
      success: true,
      data: updatedUser,
    };
  }

  async updateFavorites(id: number, dogIds: number[]) {
    const user = await this.usersRepository.preload({
      id,
      favoriteDogIds: dogIds
    })

    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    await this.usersRepository.save(user);

    const updatedUser = await this.usersRepository.findOneOrFail({
      where: { id }
    })

    return {
      success: true,
      data: updatedUser,
    };
  }

  async logout(response: Response) {
    response.clearCookie('jwt')

    return {
      success: true,
      data: "Successfully logged out"
    }
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    const users = await this.usersRepository.find({
      skip: offset,
      take: limit,
    })

    const filteredUsers = users.filter((user) => user.type === UserType.User)

    return filteredUsers;
  }

  async findOne(email: string) {
    const user = await this.usersRepository.findOneBy({
      email: email
    })
    if (!user) {
      throw new NotFoundException(`User with email ${email} was not found`)
    }
    return user;
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findOneOrFail({
      where: { id },
    })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found`)
    }
    return user;
  }

}
