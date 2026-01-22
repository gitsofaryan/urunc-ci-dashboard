export interface Notification {
    id: string;
    userId: string;
    message: string;
    type: 'success' | 'error' | 'info';
    createdAt: Date;
    read: boolean;
}

export interface NotificationSettings {
    email: boolean;
    slack: boolean;
    webhook: boolean;
}

export interface NotificationHistory {
    notifications: Notification[];
    totalCount: number;
}