import { ArrayNotEmpty, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateShelterDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly addressId: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;

  @IsNotEmpty()
  @IsUrl()
  readonly mainImage: string;

  @IsOptional()
  @IsUrl({}, { each: true })
  readonly images: string[];
}
