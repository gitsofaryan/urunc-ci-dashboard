import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import NotificationItem from './NotificationItem';

const NotificationHistory: React.FC = () => {
    const notifications = useSelector((state: RootState) => state.notifications.items);

    return (
        <div className="notification-history">
            <h2>Notification History</h2>
            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                <ul>
                    {notifications.map(notification => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificationHistory;