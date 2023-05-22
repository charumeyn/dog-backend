import { PartialType } from '@nestjs/mapped-types';
import { CreateFundraiserDto } from './create-fundraiser.dto';

export class UpdateFundraiserDto extends PartialType(CreateFundraiserDto) { }
