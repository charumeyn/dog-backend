import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreatePostDto {
  @IsNumber()
  @IsNotEmpty()
  readonly dog_id: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  readonly thumb_image: string;

  @IsUrl({}, { each: true })
  @IsOptional()
  readonly images: string[];

  @IsDate()
  @IsNotEmpty()
  readonly created_at: Date;

  @IsDate()
  @IsOptional()
  readonly updated_at: Date;

  @IsDate()
  @IsOptional()
  readonly deleted_at: Date;
}


