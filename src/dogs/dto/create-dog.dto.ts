import { ArrayNotEmpty, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { CoatLength, Color, Gender, Size } from "../entities/dog.entity";

export class CreateDogDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ArrayNotEmpty()
  readonly breed: number[];

  @IsDate()
  @IsOptional()
  readonly birthdate: Date; c

  @ArrayNotEmpty()
  readonly color: Color[];

  @IsNotEmpty()
  readonly size: Size;

  @IsNotEmpty()
  readonly gender: Gender;

  @IsNotEmpty()
  readonly coatLength: CoatLength;

  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  readonly images: string[];

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;

  @IsNotEmpty()
  @IsNumber()
  readonly shelterId: number;

  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;
}
