import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PaymentGateway } from "src/common/enums/payment-gateway.enum";
import { RecipientType } from "src/common/enums/recipient-type.enum";

export class CreateDonationDto {
  @IsNotEmpty()
  @IsString()
  readonly transaction_id: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly type: RecipientType;

  @IsNotEmpty()
  @IsString()
  readonly payment_gateway: PaymentGateway;

  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsOptional()
  @IsNumber()
  readonly dog_id: number;

  @IsOptional()
  @IsNumber()
  readonly fundraiser_id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;

  @IsOptional()
  @IsString()
  readonly transaction_firstname: string;

  @IsOptional()
  @IsString()
  readonly transaction_lastname: string;

  @IsNotEmpty()
  @IsDate()
  readonly created_at: Date;
}
