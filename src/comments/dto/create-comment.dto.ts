import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly postId: number;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}

