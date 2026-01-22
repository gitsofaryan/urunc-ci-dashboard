export class SlackService {
    private webhookUrl: string;

    constructor(webhookUrl: string) {
        this.webhookUrl = webhookUrl;
    }

    public async sendNotification(message: string): Promise<void> {
        const payload = {
            text: message,
        };

        try {
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Error sending notification to Slack: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Failed to send notification to Slack:', error);
        }
    }
}