import { IsString } from 'class-validator';

export class CreateTripDto {
  @IsString()
  riderName!: string;

  @IsString()
  pickup!: string;

  @IsString()
  destination!: string;
}
