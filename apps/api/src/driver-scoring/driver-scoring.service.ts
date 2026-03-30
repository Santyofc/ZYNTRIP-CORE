import { Injectable } from '@nestjs/common';

export interface DriverScoreInput {
  acceptanceRate: number;
  completionRate: number;
  cancellationRate: number;
  averageRating: number;
  incidentsLast30d?: number;
}

@Injectable()
export class DriverScoringService {
  calculate(input: DriverScoreInput) {
    const acceptance = Math.min(Math.max(input.acceptanceRate, 0), 1) * 25;
    const completion = Math.min(Math.max(input.completionRate, 0), 1) * 35;
    const rating = Math.min(Math.max(input.averageRating / 5, 0), 1) * 30;
    const cancellationPenalty = Math.min(Math.max(input.cancellationRate, 0), 1) * 15;
    const incidentPenalty = Math.min(input.incidentsLast30d ?? 0, 5) * 4;
    const score = Math.max(0, Math.round(acceptance + completion + rating - cancellationPenalty - incidentPenalty));

    return {
      score,
      tier: score >= 85 ? 'elite' : score >= 70 ? 'trusted' : score >= 50 ? 'watch' : 'risk',
    };
  }
}
