import { Body, Controller, Post } from '@nestjs/common';
import { PricingService } from './pricing.service';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post('estimate')
  estimate(
    @Body()
    payload: {
      originLabel: string;
      destinationLabel: string;
      originLat?: number;
      originLng?: number;
      destinationLat?: number;
      destinationLng?: number;
      durationMinutes?: number;
    },
  ) {
    return this.pricingService.estimateFare(payload);
  }
}
