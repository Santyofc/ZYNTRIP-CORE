import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DriversService, type DriverAvailability } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @Post('nearby')
  findNearby(
    @Body()
    payload: {
      lat: number;
      lng: number;
      radiusKm?: number;
    },
  ) {
    return this.driversService.findNearby(payload.lat, payload.lng, payload.radiusKm ?? 3);
  }

  @Post(':driverId/location')
  updateLocation(
    @Param('driverId') driverId: string,
    @Body() payload: { lat: number; lng: number; availability?: DriverAvailability },
  ) {
    return this.driversService.updateLocation(driverId, payload.lat, payload.lng, payload.availability);
  }

  @Patch(':driverId/availability')
  setAvailability(
    @Param('driverId') driverId: string,
    @Body() payload: { availability: DriverAvailability },
  ) {
    return this.driversService.setAvailability(driverId, payload.availability);
  }
}
