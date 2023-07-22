import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl } from "class-validator";
import { FundraiserType } from "src/common/enums/fundraiser-type.enum";

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
  readonly goal_amount: number;

  @IsNotEmpty()
  @IsDate()
  readonly starts_at: Date;

  @IsOptional()
  @IsDate()
  readonly ends_at: Date;

  @IsNotEmpty()
  @IsDate()
  readonly created_at: Date;

  @IsOptional()
  @IsDate()
  readonly updated_at: Date;

  @IsOptional()
  @IsDate()
  readonly deleted_at: Date;

  @IsOptional()
  @IsNumber()
  readonly created_by: number;

  @IsNotEmpty()
  readonly type: FundraiserType;

  @IsOptional()
  @IsNumber()
  readonly shelter_id: number;

  @IsOptional()
  @IsNumber()
  readonly user_id: number;

  @IsOptional()
  @IsNumber()
  readonly dog_id: number;
}