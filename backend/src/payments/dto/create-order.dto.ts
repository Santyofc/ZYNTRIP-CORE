import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @Min(1)
  amount!: number;

  @IsString()
  currency!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
