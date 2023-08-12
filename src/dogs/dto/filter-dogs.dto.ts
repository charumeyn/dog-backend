import { IsOptional, IsPositive } from "class-validator";
import { Size } from "../entities/dog.entity";

export class FilterDogsDto {
  @IsOptional()
  size: Size;
}