import { Injectable } from '@nestjs/common';

export interface AntifraudAssessmentInput {
  riderId?: string;
  driverId?: string;
  paymentAmount: number;
  distanceKm?: number;
  paymentMethod?: 'cash' | 'stripe' | 'sinpe' | 'paypal';
  velocityLastHour?: number;
  deviceTrusted?: boolean;
}

@Injectable()
export class AntifraudService {
  assessTrip(input: AntifraudAssessmentInput) {
    let score = 0;

    if (input.paymentAmount > 40) score += 18;
    if ((input.distanceKm ?? 0) < 1 && input.paymentAmount > 15) score += 14;
    if ((input.velocityLastHour ?? 0) >= 4) score += 22;
    if (input.deviceTrusted === false) score += 18;
    if (input.paymentMethod === 'cash') score += 6;

    const band = score >= 55 ? 'high' : score >= 30 ? 'medium' : 'low';

    return {
      score,
      band,
      holdRecommended: band === 'high',
      reviewRecommended: band !== 'low',
    };
  }
}
