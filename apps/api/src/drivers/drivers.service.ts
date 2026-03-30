import { Injectable } from '@nestjs/common';

export type DriverAvailability = 'OFFLINE' | 'ONLINE' | 'BUSY';

export interface DriverLocation {
  driverId: string;
  lat: number;
  lng: number;
  availability: DriverAvailability;
  updatedAt: string;
}

@Injectable()
export class DriversService {
  private readonly locations = new Map<string, DriverLocation>();

  updateLocation(driverId: string, lat: number, lng: number, availability: DriverAvailability = 'ONLINE') {
    const location: DriverLocation = {
      driverId,
      lat,
      lng,
      availability,
      updatedAt: new Date().toISOString(),
    };

    this.locations.set(driverId, location);
    return location;
  }

  setAvailability(driverId: string, availability: DriverAvailability) {
    const current = this.locations.get(driverId);
    const next: DriverLocation = {
      driverId,
      lat: current?.lat ?? 0,
      lng: current?.lng ?? 0,
      availability,
      updatedAt: new Date().toISOString(),
    };

    this.locations.set(driverId, next);
    return next;
  }

  findNearby(lat: number, lng: number, radiusKm = 3) {
    return [...this.locations.values()]
      .filter((driver) => driver.availability === 'ONLINE')
      .map((driver) => ({
        ...driver,
        distanceKm: this.calculateDistanceKm(lat, lng, driver.lat, driver.lng),
      }))
      .filter((driver) => driver.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm);
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
