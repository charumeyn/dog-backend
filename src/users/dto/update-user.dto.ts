import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
}

export class UpdateFavoritesDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsArray()
  @IsNotEmpty()
  readonly favoriteDogIds: number[];
}