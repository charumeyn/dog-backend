import { IsOptional, IsPositive } from "class-validator";
import { Size } from "src/dogs/enums/size.enum";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  @IsOptional()
  size: Size;
}