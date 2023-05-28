import { Trim } from 'class-sanitizer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserType } from '../user-type.enum';
import { Address } from 'src/addresses/entities/address.entity';

export class RegisterDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsString()
  @IsOptional()
  public readonly first_name?: string;

  @IsString()
  @IsOptional()
  public readonly last_name?: string;

  @IsString()
  @IsOptional()
  public readonly phone?: string;

  @IsString()
  @IsNotEmpty()
  public readonly type: UserType;
}


export class LoginDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public readonly first_name?: string;

  @IsString()
  @IsOptional()
  public readonly last_name?: string;

  @IsString()
  @IsOptional()
  public readonly password?: string;
}