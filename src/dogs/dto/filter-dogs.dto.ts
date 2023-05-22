import { IsOptional, IsPositive } from "class-validator";
import { Size } from "../enums/size.enum";

export class FilterDogsDto {
  @IsOptional()
  size: Size;
}