import { ArrayNotEmpty, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateShelterDto {
  @IsNumber()
  @IsNotEmpty()
  readonly address_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly profile_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly fundraising_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly approver_id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly is_active: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly is_approved: boolean;

  @IsOptional()
  @IsDate()
  readonly approved_at: Date;

  @IsOptional()
  @IsDate()
  readonly founded_date: Date;

  @IsOptional()
  @IsString()
  readonly founder_name: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image_thumb: string;

  @IsOptional()
  @IsUrl({}, { each: true })
  readonly images: string[];

  @IsNotEmpty()
  @IsDate()
  readonly created_at: Date;
}
