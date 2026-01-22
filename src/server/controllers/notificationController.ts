export class NotificationController {
    private notificationService: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notificationService = notificationService;
    }

    public async sendTestFailureNotification(testResult: TestResult): Promise<void> {
        const notification = this.createNotification(testResult);
        await this.notificationService.send(notification);
    }

    private createNotification(testResult: TestResult): Notification {
        return {
            id: this.generateNotificationId(),
            message: `Test ${testResult.name} has failed.`,
            timestamp: new Date(),
            testResultId: testResult.id,
        };
    }

    private generateNotificationId(): string {
        return `notif_${Date.now()}`;
    }

    public async getNotificationHistory(userId: string): Promise<Notification[]> {
        return await this.notificationService.getHistoryForUser(userId);
    }
}