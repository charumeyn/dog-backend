import { ArrayNotEmpty, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl } from "class-validator";

export class CreateShelterDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  @IsUrl()
  readonly mainImage: string;

  @IsOptional()
  @IsUrl({}, { each: true })
  readonly images: string[];

  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}
