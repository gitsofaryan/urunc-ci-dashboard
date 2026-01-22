export interface Notification {
    id: string;
    userId: string;
    message: string;
    type: 'success' | 'error' | 'info';
    createdAt: Date;
    read: boolean;
}

export class NotificationModel {
    constructor(public notification: Notification) {}

    markAsRead() {
        this.notification.read = true;
    }

    static createNotification(userId: string, message: string, type: 'success' | 'error' | 'info'): Notification {
        return {
            id: generateUniqueId(),
            userId,
            message,
            type,
            createdAt: new Date(),
            read: false,
        };
    }
}

function generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
}