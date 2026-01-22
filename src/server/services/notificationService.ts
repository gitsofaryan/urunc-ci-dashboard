export class NotificationService {
    private slackService: SlackService;
    private emailService: EmailService;

    constructor(slackService: SlackService, emailService: EmailService) {
        this.slackService = slackService;
        this.emailService = emailService;
    }

    public async sendTestFailureNotification(testRunId: string, recipients: string[], message: string): Promise<void> {
        const notificationMessage = `Test Run ID: ${testRunId} has failed. Details: ${message}`;
        await this.sendSlackNotification(recipients, notificationMessage);
        await this.sendEmailNotification(recipients, notificationMessage);
    }

    private async sendSlackNotification(recipients: string[], message: string): Promise<void> {
        for (const recipient of recipients) {
            await this.slackService.sendMessage(recipient, message);
        }
    }

    private async sendEmailNotification(recipients: string[], message: string): Promise<void> {
        for (const recipient of recipients) {
            await this.emailService.sendEmail(recipient, 'Test Failure Alert', message);
        }
    }
}