import { useNotificationsStore } from '@/app/providers/NotificationsProvider';

function formatNotificationTime(isoDate: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
}

export function NotificationsInbox() {
  const { notifications, unreadCount, markAllAsRead } = useNotificationsStore();

  return (
    <section className="notifications-panel">
      <div className="notifications-header">
        <div>
          <p className="notifications-eyebrow">Operations alerts</p>
          <h2 className="notifications-title">Notifications</h2>
        </div>
        <button type="button" className="notifications-clear" onClick={markAllAsRead} disabled={notifications.length === 0}>
          Mark all as read
        </button>
      </div>
      <p className="muted-small">
        {unreadCount > 0 ? `${unreadCount} unread payment alerts waiting for review.` : 'No unread payment alerts right now.'}
      </p>
      {notifications.length > 0 ? (
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={notification.status === 'unread' ? 'notification-item notification-item-unread' : 'notification-item'}
            >
              <div className="notification-copy">
                <p className="notification-title">{notification.title}</p>
                <p className="muted-small">{notification.message}</p>
              </div>
              <div className="notification-meta">
                <span className="notification-channel">{notification.channel}</span>
                <span className="notification-time">{formatNotificationTime(notification.createdAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted-small">Payments confirmed with PayPal will appear here and can also trigger a browser alert.</p>
      )}
    </section>
  );
}
