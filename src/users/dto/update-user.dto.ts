import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsUrl()
  @IsOptional()
  readonly image: string;
}

export class UpdateFavoritesDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsArray()
  @IsNotEmpty()
  readonly favoriteDogIds: number[];
}