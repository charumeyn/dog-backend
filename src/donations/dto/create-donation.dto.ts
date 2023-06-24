import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { RecipientType } from "src/common/enums/recipient-type.enum";

export class CreateDonationDto {
  @IsNotEmpty()
  @IsEmail()
  readonly donor_email: string;

  @IsNotEmpty()
  @IsString()
  readonly type: RecipientType;

  @IsNotEmpty()
  @IsString()
  readonly payment_gateway: string;

  @IsNotEmpty()
  @IsString()
  readonly transaction_id: string;

  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsNumber()
  readonly dog_id: number;

  @IsNotEmpty()
  @IsDate()
  readonly created_at: Date;
}