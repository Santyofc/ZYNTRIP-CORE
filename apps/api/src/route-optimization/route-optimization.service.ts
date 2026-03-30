import { Injectable } from '@nestjs/common';

export interface RouteOptimizationInput {
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  trafficLevel?: 'low' | 'medium' | 'high';
}

@Injectable()
export class RouteOptimizationService {
  optimize(input: RouteOptimizationInput) {
    const distanceKm = this.calculateDistanceKm(
      input.originLat,
      input.originLng,
      input.destinationLat,
      input.destinationLng,
    );
    const trafficMultiplier = input.trafficLevel === 'high' ? 1.45 : input.trafficLevel === 'medium' ? 1.2 : 1;
    const etaMinutes = Math.max(4, Math.round(distanceKm * 2.6 * trafficMultiplier));

    return {
      distanceKm: Number(distanceKm.toFixed(1)),
      etaMinutes,
      trafficLevel: input.trafficLevel ?? 'medium',
      recommendedPolyline: [
        [input.originLat, input.originLng],
        [Number(((input.originLat + input.destinationLat) / 2).toFixed(6)), Number(((input.originLng + input.destinationLng) / 2).toFixed(6))],
        [input.destinationLat, input.destinationLng],
      ],
    };
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
