import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly post_id: number;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsDate()
  @IsNotEmpty()
  readonly created_at: Date;

  @IsDate()
  @IsOptional()
  readonly updated_at?: Date;

  @IsDate()
  @IsOptional()
  readonly deleted_at?: Date;
}

