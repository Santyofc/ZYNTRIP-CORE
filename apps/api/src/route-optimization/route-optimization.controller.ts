import { Body, Controller, Post } from '@nestjs/common';
import { RouteOptimizationService } from './route-optimization.service';

@Controller('route-optimization')
export class RouteOptimizationController {
  constructor(private readonly routeOptimizationService: RouteOptimizationService) {}

  @Post('optimize')
  optimize(
    @Body()
    payload: {
      originLat: number;
      originLng: number;
      destinationLat: number;
      destinationLng: number;
      trafficLevel?: 'low' | 'medium' | 'high';
    },
  ) {
    return this.routeOptimizationService.optimize(payload);
  }
}
