import { Body, Controller, Post } from '@nestjs/common';
import { AntifraudService } from './antifraud.service';

@Controller('antifraud')
export class AntifraudController {
  constructor(private readonly antifraudService: AntifraudService) {}

  @Post('assess')
  assess(
    @Body()
    payload: {
      riderId?: string;
      driverId?: string;
      paymentAmount: number;
      distanceKm?: number;
      paymentMethod?: 'cash' | 'stripe' | 'sinpe' | 'paypal';
      velocityLastHour?: number;
      deviceTrusted?: boolean;
    },
  ) {
    return this.antifraudService.assessTrip(payload);
  }
}
