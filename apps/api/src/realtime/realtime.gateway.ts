import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { DriversService } from '../drivers/drivers.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  },
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly driversService: DriversService) {}

  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(RealtimeGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Socket connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Socket disconnected: ${client.id}`);
  }

  @SubscribeMessage('join.room')
  handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    if (!room) {
      return;
    }

    client.join(room);
    this.logger.log(`Socket ${client.id} joined room ${room}`);
  }

  @SubscribeMessage('driver:location')
  handleDriverLocation(
    @MessageBody() payload: { driverId: string; lat: number; lng: number; availability?: 'OFFLINE' | 'ONLINE' | 'BUSY' },
  ) {
    if (!payload?.driverId) {
      return;
    }

    const location = this.driversService.updateLocation(
      payload.driverId,
      payload.lat,
      payload.lng,
      payload.availability ?? 'ONLINE',
    );

    this.server.emit('driver.location.updated', location);
    this.server.to(`driver:${payload.driverId}`).emit('driver.location.updated', location);
    return location;
  }
}
