import { Transform } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsOptional, IsPositive } from "class-validator";
import { CoatLength, Color, Gender, Size } from "src/dogs/entities/dog.entity";
import { FundraiserStatus } from "src/fundraisers/entities/fundraiser.entity";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}


export class DogPaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  @IsOptional()
  size: Size;

  @IsOptional()
  color: Color;

  @IsOptional()
  gender: Gender;

  @IsOptional()
  coatLength: CoatLength;
}

export class FundraiserPaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  @IsOptional()
  @IsDate()
  startsAt?: Date;

  @IsOptional()
  @IsDate()
  endsAt?: Date;


  @IsOptional()
  @IsEnum(FundraiserStatus)
  status: FundraiserStatus;
}


export class FavoritesPaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  @IsOptional()
  @IsArray()
  @Transform((item) => item.value.map((v) => parseInt(v, 10)))
  dogIds: number[];
}