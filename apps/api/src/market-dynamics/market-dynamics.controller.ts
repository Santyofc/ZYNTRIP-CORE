import { Body, Controller, Post } from '@nestjs/common';
import { MarketDynamicsService } from './market-dynamics.service';

@Controller('market-dynamics')
export class MarketDynamicsController {
  constructor(private readonly marketDynamicsService: MarketDynamicsService) {}

  @Post('snapshot')
  getSnapshot(
    @Body()
    payload: {
      region: string;
      activeRequests: number;
      availableDrivers: number;
    },
  ) {
    return this.marketDynamicsService.getSnapshot(
      payload.region,
      payload.activeRequests,
      payload.availableDrivers,
    );
  }
}
