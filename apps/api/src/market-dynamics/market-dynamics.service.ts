import { Injectable } from '@nestjs/common';

export interface DemandSupplySnapshot {
  region: string;
  activeRequests: number;
  availableDrivers: number;
  surgeMultiplier: number;
  pressureIndex: number;
}

@Injectable()
export class MarketDynamicsService {
  getSnapshot(region: string, activeRequests: number, availableDrivers: number): DemandSupplySnapshot {
    const safeDrivers = Math.max(availableDrivers, 1);
    const rawPressure = activeRequests / safeDrivers;
    const pressureIndex = Number(rawPressure.toFixed(2));

    let surgeMultiplier = 1;
    if (rawPressure >= 1.25) surgeMultiplier = 1.15;
    if (rawPressure >= 1.75) surgeMultiplier = 1.35;
    if (rawPressure >= 2.5) surgeMultiplier = 1.6;
    if (rawPressure >= 3.5) surgeMultiplier = 1.9;

    return {
      region,
      activeRequests,
      availableDrivers,
      surgeMultiplier: Number(surgeMultiplier.toFixed(2)),
      pressureIndex,
    };
  }
}
