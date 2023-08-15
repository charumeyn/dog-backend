import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CommentType } from "../entities/comment.entity";

export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @IsNotEmpty()
  @IsEnum(CommentType)
  readonly commentType: CommentType;

  @IsOptional()
  @IsNumber()
  readonly postId: number;

  @IsOptional()
  @IsNumber()
  readonly dogId: number;

  @IsOptional()
  @IsNumber()
  readonly fundraiserId: number;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}

