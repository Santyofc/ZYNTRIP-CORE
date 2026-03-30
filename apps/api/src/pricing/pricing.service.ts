import { Injectable } from '@nestjs/common';

export interface FareEstimateInput {
  originLabel: string;
  destinationLabel: string;
  originLat?: number;
  originLng?: number;
  destinationLat?: number;
  destinationLng?: number;
  durationMinutes?: number;
}

export interface FareEstimateBreakdown {
  distanceKm: number;
  durationMinutes: number;
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  total: number;
}

@Injectable()
export class PricingService {
  private readonly baseFare = 2.25;
  private readonly perKmRate = 0.85;
  private readonly perMinuteRate = 0.18;

  estimateFare(input: FareEstimateInput): FareEstimateBreakdown {
    const distanceKm = this.resolveDistanceKm(input);
    const durationMinutes = input.durationMinutes ?? Math.max(6, Math.round(distanceKm * 2.8));
    const distanceFare = distanceKm * this.perKmRate;
    const timeFare = durationMinutes * this.perMinuteRate;

    return {
      distanceKm: Number(distanceKm.toFixed(1)),
      durationMinutes,
      baseFare: Number(this.baseFare.toFixed(2)),
      distanceFare: Number(distanceFare.toFixed(2)),
      timeFare: Number(timeFare.toFixed(2)),
      total: Number((this.baseFare + distanceFare + timeFare).toFixed(2)),
    };
  }

  private resolveDistanceKm(input: FareEstimateInput) {
    const hasCoordinates =
      typeof input.originLat === 'number' &&
      typeof input.originLng === 'number' &&
      typeof input.destinationLat === 'number' &&
      typeof input.destinationLng === 'number';

    if (hasCoordinates) {
      return Math.max(
        1,
        this.calculateDistanceKm(
          input.originLat!,
          input.originLng!,
          input.destinationLat!,
          input.destinationLng!,
        ),
      );
    }

    const textSignal = Math.max(input.originLabel.length + input.destinationLabel.length, 10);
    return Math.max(1.2, textSignal * 0.18);
  }

  private calculateDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const earthRadiusKm = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }
}
