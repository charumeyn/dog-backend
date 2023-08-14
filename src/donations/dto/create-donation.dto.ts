import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { DonationType, PaymentGateway, RecipientType } from "../entities/donation.entity";

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
  @IsEnum(DonationType)
  readonly recipientType: RecipientType;

  @IsNotEmpty()
  @IsEnum(DonationType)
  readonly donationType: DonationType;

  @IsNotEmpty()
  @IsEnum(PaymentGateway)
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
  readonly shelterId: number;

  @IsOptional()
  @IsNumber()
  readonly userId: number;

  @IsOptional()
  @IsNumber()
  readonly fundraiserId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly donorId: number;
}
