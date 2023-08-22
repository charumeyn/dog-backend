import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from "express";


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
      password: hashedPassword
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
      relations: {
        address: true,
        shelter: true,
        donations: true,
        fundraisers: true,
        comments: true,
      },
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
      data: account,
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
          comments: true,
        },
      })

      const { password, ...account } = user;

      return {
        success: true,
        data: account
      };
    }

    catch (e) {
      // throw new UnauthorizedException();
      return {
        success: false,
        data: "You are logged out"
      };
    }
  }

  async logout(response: Response) {
    response.clearCookie('jwt')

    return {
      success: true,
      data: "Successfully logged out"
    }
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

  async findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id
      },
    })
  }

}
