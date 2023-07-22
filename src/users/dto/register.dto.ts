import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
