import { Injectable } from '@nestjs/common';
import type { TripEntity } from '../trips/entities/trip.entity';
import { RealtimeGateway } from './realtime.gateway';

export interface RealtimeNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  channel: 'app' | 'browser';
  status: 'unread' | 'read';
}

@Injectable()
export class RealtimeService {
  constructor(private readonly gateway: RealtimeGateway) {}

  emitTripCreated(trip: TripEntity) {
    this.gateway.server.emit('trip.created', trip);
    this.gateway.server.to(`trip:${trip.id}`).emit('trip.created', trip);
  }

  emitTripUpdated(trip: TripEntity) {
    this.gateway.server.emit('trip.updated', trip);
    this.gateway.server.to(`trip:${trip.id}`).emit('trip.updated', trip);
  }

  emitNotificationCreated(notification: RealtimeNotification) {
    this.gateway.server.emit('notification.created', notification);
  }
}
