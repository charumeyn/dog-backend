import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateFundraiserDto {
  @IsNotEmpty()
  @IsNumber()
  readonly profile_id: number;

  @IsOptional()
  @IsNumber()
  readonly shelter_id: number;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsUrl({}, { each: true })
  readonly images: string[];

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
}