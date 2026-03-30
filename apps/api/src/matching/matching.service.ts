import { Injectable } from '@nestjs/common';
import { DriversService } from '../drivers/drivers.service';
import { RealtimeService } from '../realtime/realtime.service';

interface MatchableTrip {
  id: string;
  pickupLat?: number;
  pickupLng?: number;
}

@Injectable()
export class MatchingService {
  constructor(
    private readonly driversService: DriversService,
    private readonly realtimeService: RealtimeService,
  ) {}

  async assignDriver(trip: MatchableTrip) {
    if (typeof trip.pickupLat !== 'number' || typeof trip.pickupLng !== 'number') {
      return null;
    }

    const nearbyDrivers = this.driversService.findNearby(trip.pickupLat, trip.pickupLng, 3);

    for (const driver of nearbyDrivers) {
      const accepted = await this.sendOffer(driver.driverId, trip.id);
      if (accepted) {
        return driver.driverId;
      }
    }

    return null;
  }

  private async sendOffer(driverId: string, tripId: string) {
    this.realtimeService.emitDriverOffer(driverId, { tripId });
    return true;
  }
}
