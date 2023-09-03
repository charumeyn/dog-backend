import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreatePostDto {
  @IsNumber()
  @IsNotEmpty()
  readonly dogId: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsUrl()
  @IsNotEmpty()
  readonly mainImage: string;

  @IsUrl({}, { each: true })
  @IsOptional()
  readonly images: string[];

  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;
}


