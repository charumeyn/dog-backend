import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PaymentGateway, RecipientType } from "../entities/donation.entity";

export class CreateDonationDto {
  @IsNotEmpty()
  @IsString()
  readonly transactionId: string;

  @IsOptional()
  @IsString()
  readonly transactionFirstName: string;

  @IsOptional()
  @IsString()
  readonly transactionLastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly recepientType: RecipientType;

  @IsNotEmpty()
  @IsString()
  readonly paymentGateway: PaymentGateway;

  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsOptional()
  @IsNumber()
  readonly dogId: number;

  @IsOptional()
  @IsNumber()
  readonly fundraiserId: number;

  @IsOptional()
  @IsNumber()
  readonly userId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly donorId: number;

  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;
}
