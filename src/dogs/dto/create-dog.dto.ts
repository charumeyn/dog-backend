import { ArrayNotEmpty, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { CoatLength, Color, Gender, Size } from "../entities/dog.entity";

export class CreateDogDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ArrayNotEmpty()
  readonly breed: string[];

  @IsDate()
  @IsOptional()
  readonly birthdate: Date;

  @ArrayNotEmpty()
  readonly color: Color[];

  @IsNotEmpty()
  readonly size: Size;

  @IsNotEmpty()
  readonly gender: Gender;

  @IsNotEmpty()
  readonly coatLength: CoatLength;

  @IsNotEmpty()
  readonly mainImage: string;

  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  readonly images: string[];

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;

  @IsOptional()
  @IsNumber()
  readonly shelterId: number;

  @IsOptional()
  @IsNumber()
  readonly userId: number;
}
