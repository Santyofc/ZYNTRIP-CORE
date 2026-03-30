export type AppNotificationChannel = 'app' | 'browser';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  channel: AppNotificationChannel;
  status: 'unread' | 'read';
}
