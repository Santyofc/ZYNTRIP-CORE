import { Injectable } from '@nestjs/common';

export interface RegionNode {
  code: string;
  label: string;
  country: string;
  currency: string;
  timezone: string;
  apiBasePath: string;
}

@Injectable()
export class RegionsService {
  private readonly regions: RegionNode[] = [
    {
      code: 'cr-south',
      label: 'Costa Rica South',
      country: 'Costa Rica',
      currency: 'USD',
      timezone: 'America/Costa_Rica',
      apiBasePath: '/api/cr-south',
    },
    {
      code: 'cr-gam',
      label: 'Costa Rica GAM',
      country: 'Costa Rica',
      currency: 'USD',
      timezone: 'America/Costa_Rica',
      apiBasePath: '/api/cr-gam',
    },
  ];

  findAll() {
    return this.regions;
  }

  resolveRegion(code?: string) {
    return this.regions.find((region) => region.code === code) ?? this.regions[0];
  }
}
