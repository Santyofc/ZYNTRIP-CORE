import { Injectable, Logger } from '@nestjs/common';
import { RealtimeService, type RealtimeNotification } from '../realtime/realtime.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly realtimeService: RealtimeService) {}

  private readonly logger = new Logger(NotificationsService.name);

  notifyPaymentCaptured(payload: {
    orderId: string;
    amount: number;
    riderName?: string;
    pickup?: string;
    destination?: string;
    channelHint?: 'email' | 'telegram' | 'slack';
  }) {
    this.logger.log(
      `Payment captured for order ${payload.orderId}. Next fan-out target: ${payload.channelHint ?? 'app-only'}. Amount: ${payload.amount.toFixed(2)}`,
    );

    const notification: RealtimeNotification = {
      id: `notification-${crypto.randomUUID()}`,
      title: 'PayPal payment received',
      message:
        payload.riderName && payload.pickup && payload.destination
          ? `Payment approved for ${payload.riderName}. ${payload.pickup} to ${payload.destination} for $${payload.amount.toFixed(2)}.`
          : `Payment approved for order ${payload.orderId} for $${payload.amount.toFixed(2)}.`,
      createdAt: new Date().toISOString(),
      channel: 'app',
      status: 'unread',
    };

    this.realtimeService.emitNotificationCreated(notification);

    return {
      notification,
      delivered: false,
      message: 'Notification fan-out scaffolded. Connect Telegram, email, or Slack here.',
    };
  }
}
