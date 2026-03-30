import { io, type Socket } from 'socket.io-client';
import { SOCKET_URL } from './api-client';
import type { AppNotification } from '@/features/notifications/types';
import type { Trip } from '@/features/trips/types';

interface ServerToClientEvents {
  'trip.created': (trip: Trip) => void;
  'trip.updated': (trip: Trip) => void;
  'notification.created': (notification: AppNotification) => void;
}

interface ClientToServerEvents {
  'join.room': (room: string) => void;
}

let socketInstance: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export function getSocket() {
  if (!socketInstance) {
    socketInstance = io(SOCKET_URL, {
      autoConnect: false,
      transports: ['websocket', 'polling'],
    });
  }

  return socketInstance;
}
