import { ArrayNotEmpty, IsBoolean, IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { Color } from "../enums/color.enum";
import { Size } from "../enums/size.enum";
import { CoatLength } from "../enums/coat-length.enum";
import { Gender } from "../enums/gender.enum";

export class CreateDogDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  readonly shelter_id: number;

  @ArrayNotEmpty()
  readonly breed: number[];

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
  readonly coat_length: CoatLength;

  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  readonly images: string[];

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly is_active: boolean;

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
