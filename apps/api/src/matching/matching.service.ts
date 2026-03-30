import { Injectable } from '@nestjs/common';
import { DriverScoringService } from '../driver-scoring/driver-scoring.service';
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
    private readonly driverScoringService: DriverScoringService,
  ) {}

  async assignDriver(trip: MatchableTrip) {
    if (typeof trip.pickupLat !== 'number' || typeof trip.pickupLng !== 'number') {
      return null;
    }

    const nearbyDrivers = this.driversService
      .findNearby(trip.pickupLat, trip.pickupLng, 3)
      .map((driver) => ({
        ...driver,
        driverScore: this.driverScoringService.calculate({
          acceptanceRate: 0.92,
          completionRate: 0.96,
          cancellationRate: 0.04,
          averageRating: 4.8,
          incidentsLast30d: 0,
        }).score,
      }))
      .sort((a, b) => b.driverScore - a.driverScore || a.distanceKm - b.distanceKm);

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
