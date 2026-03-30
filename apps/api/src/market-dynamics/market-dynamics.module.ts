import { Module } from '@nestjs/common';
import { MarketDynamicsController } from './market-dynamics.controller';
import { MarketDynamicsService } from './market-dynamics.service';

@Module({
  controllers: [MarketDynamicsController],
  providers: [MarketDynamicsService],
  exports: [MarketDynamicsService],
})
export class MarketDynamicsModule {}
