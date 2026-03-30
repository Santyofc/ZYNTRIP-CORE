import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTripDto {
  @IsString()
  riderName!: string;

  @IsString()
  pickup!: string;

  @IsString()
  destination!: string;

  @IsOptional()
  @IsNumber()
  pickupLat?: number;

  @IsOptional()
  @IsNumber()
  pickupLng?: number;

  @IsOptional()
  @IsNumber()
  destinationLat?: number;

  @IsOptional()
  @IsNumber()
  destinationLng?: number;

  @IsOptional()
  @IsNumber()
  durationMinutes?: number;
}
