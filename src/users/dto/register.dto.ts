import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserType } from "../entities/user.entity";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly type: UserType;
}
