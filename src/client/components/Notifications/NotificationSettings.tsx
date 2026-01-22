import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotificationSettings } from '../../store/notificationSlice';
import { RootState } from '../../store';

const NotificationSettings: React.FC = () => {
    const dispatch = useDispatch();
    const notificationSettings = useSelector((state: RootState) => state.notifications.settings);
    const [settings, setSettings] = useState(notificationSettings);

    useEffect(() => {
        setSettings(notificationSettings);
    }, [notificationSettings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: checked,
        }));
    };

    const handleSave = () => {
        dispatch(updateNotificationSettings(settings));
    };

    return (
        <div className="notification-settings">
            <h2>Notification Settings</h2>
            <form>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="email"
                            checked={settings.email}
                            onChange={handleChange}
                        />
                        Email Notifications
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="slack"
                            checked={settings.slack}
                            onChange={handleChange}
                        />
                        Slack Notifications
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="sms"
                            checked={settings.sms}
                            onChange={handleChange}
                        />
                        SMS Notifications
                    </label>
                </div>
                <button type="button" onClick={handleSave}>
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default NotificationSettings;