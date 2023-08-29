import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
}
