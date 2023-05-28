import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthHelper } from './auth.helper';
import { User } from '../user.entity';
import { LoginDto, RegisterDto, UpdateUserDto, UpdateUserShelterDto } from './auth.dto';
import { Shelter } from 'src/shelters/entities/shelter.entity';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  @InjectRepository(Shelter)
  private readonly shelterRepository: Repository<Shelter>;

  @Inject(AuthHelper)
  private readonly _helper: AuthHelper;
  public get helper(): AuthHelper {
    return this._helper;
  }

  public async register(body: RegisterDto) {
    const { email, password, first_name, last_name, phone, type }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();

    user.email = email;
    user.password = this.helper.encodePassword(password);
    user.first_name = first_name;
    user.last_name = last_name;
    user.phone = phone;
    user.type = type;

    await this.repository.save(user);

    return {
      success: true,
      data: user
    }
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.repository.update(user.id, { last_login_at: new Date() });

    return this.helper.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    this.repository.update(user.id, { last_login_at: new Date() });

    return this.helper.generateToken(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repository.preload({
      id: +id,
      first_name: updateUserDto.first_name,
      last_name: updateUserDto.last_name,
      password: this.helper.encodePassword(updateUserDto.password),
    })

    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }

    await this.repository.save(user);
    return {
      success: true,
      data: user,
    };
  }

  async updateShelter(id: number, updateUserShelterDto: UpdateUserShelterDto) {
    const getShelter = await this.shelterRepository.findOneOrFail({
      where: { id: updateUserShelterDto.shelter_id }
    })
    const user = await this.repository.preload({
      id: +id,
      shelter: getShelter
    })
    if (!getShelter) {
      throw new NotFoundException(`Shelter with ${updateUserShelterDto.shelter_id} not found`);
    }
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }

    await this.repository.save(user);
    return {
      success: true,
      data: user
    }
  }
}