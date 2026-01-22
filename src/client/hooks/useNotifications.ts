import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/notificationSlice';
import { Notification } from '../types/index';

const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const eventSource = new EventSource('/api/notifications');

        eventSource.onmessage = (event) => {
            const newNotification: Notification = JSON.parse(event.data);
            setNotifications((prev) => [...prev, newNotification]);
            dispatch(addNotification(newNotification));
        };

        return () => {
            eventSource.close();
        };
    }, [dispatch]);

    return notifications;
};

export default useNotifications;