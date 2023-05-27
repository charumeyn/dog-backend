import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  readonly line1: string;

  @IsOptional()
  @IsString()
  readonly line2: string;

  @IsOptional()
  @IsString()
  readonly line3: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly state: string;

  @IsNotEmpty()
  @IsString()
  readonly zip: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;
}
