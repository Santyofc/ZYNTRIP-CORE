import { Module } from '@nestjs/common';
import { MarketDynamicsModule } from '../market-dynamics/market-dynamics.module';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';

@Module({
  imports: [MarketDynamicsModule],
  controllers: [PricingController],
  providers: [PricingService],
  exports: [PricingService],
})
export class PricingModule {}
