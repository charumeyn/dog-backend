import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl } from "class-validator";
import { FundraiserType } from "../entities/fundraiser.entity";

export class CreateFundraiserDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsUrl()
  readonly main_image: string;

  @IsNotEmpty()
  @IsUrl({}, { each: true })
  readonly images: string[];

  @IsNotEmpty()
  @IsString()
  readonly purpose: string;

  @IsNotEmpty()
  @IsNumber()
  readonly goalAmount: number;

  @IsNotEmpty()
  @IsNumber()
  readonly currentAmount: number;

  @IsNotEmpty()
  @IsDate()
  readonly startsAt: Date;

  @IsOptional()
  @IsDate()
  readonly endsAt: Date;

  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;

  @IsOptional()
  @IsDate()
  readonly deletedAt: Date;

  @IsOptional()
  @IsNumber()
  readonly creaetdBy: number;

  @IsNotEmpty()
  readonly type: FundraiserType;

  @IsOptional()
  @IsNumber()
  readonly shelterId: number;

  @IsOptional()
  @IsNumber()
  readonly userId: number;

  @IsOptional()
  @IsNumber()
  readonly dogId: number;
}