import {
  createContext,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import type { AppNotification } from '@/features/notifications/types';
import { getSocket } from '@/services/socket-service';

interface NotificationsContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  pushPaymentNotification: (payload: {
    riderName: string;
    amount: number;
    pickup: string;
    destination: string;
  }) => void;
  markAllAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

function createNotificationId() {
  return `notification-${crypto.randomUUID()}`;
}

export function NotificationsProvider({ children }: PropsWithChildren) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const browserPermissionRequested = useRef(false);

  useEffect(() => {
    const socket = getSocket();
    const handleNotificationCreated = (notification: AppNotification) => {
      setNotifications((current) => {
        if (current.some((item) => item.id === notification.id)) {
          return current;
        }

        return [notification, ...current];
      });

      maybeRequestBrowserPermission();

      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
        });
      }
    };

    if (!socket.connected) {
      socket.connect();
    }

    socket.on('notification.created', handleNotificationCreated);

    return () => {
      socket.off('notification.created', handleNotificationCreated);
    };
  }, []);

  function maybeRequestBrowserPermission() {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return;
    }

    if (Notification.permission !== 'default' || browserPermissionRequested.current) {
      return;
    }

    browserPermissionRequested.current = true;
    void Notification.requestPermission();
  }

  function pushPaymentNotification(payload: {
    riderName: string;
    amount: number;
    pickup: string;
    destination: string;
  }) {
    const message = `Payment approved for ${payload.riderName}. ${payload.pickup} to ${payload.destination} for $${payload.amount.toFixed(2)}.`;

    setNotifications((current) => [
      {
        id: createNotificationId(),
        title: 'PayPal payment received',
        message,
        createdAt: new Date().toISOString(),
        channel: 'app',
        status: 'unread',
      },
      ...current,
    ]);

    maybeRequestBrowserPermission();

    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('Zyntrip payment received', {
        body: message,
      });
    }
  }

  function markAllAsRead() {
    setNotifications((current) => current.map((notification) => ({ ...notification, status: 'read' })));
  }

  const value = useMemo<NotificationsContextValue>(
    () => ({
      notifications,
      unreadCount: notifications.filter((notification) => notification.status === 'unread').length,
      pushPaymentNotification,
      markAllAsRead,
    }),
    [notifications],
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotificationsStore() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotificationsStore must be used within NotificationsProvider');
  }

  return context;
}
