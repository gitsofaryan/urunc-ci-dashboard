import { NotificationService } from '../src/server/services/notificationService';
import { SlackService } from '../src/server/services/slackService';
import { EmailService } from '../src/server/services/emailService';

const notificationService = new NotificationService();
const slackService = new SlackService();
const emailService = new EmailService();

async function sendNotification(notificationType: string, message: string, recipients: string[]) {
    try {
        switch (notificationType) {
            case 'slack':
                await slackService.sendNotification(message, recipients);
                console.log('Slack notification sent successfully.');
                break;
            case 'email':
                await emailService.sendNotification(message, recipients);
                console.log('Email notification sent successfully.');
                break;
            default:
                console.error('Invalid notification type specified.');
        }
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

// Example usage
const notificationType = process.argv[2]; // 'slack' or 'email'
const message = process.argv[3]; // Notification message
const recipients = process.argv.slice(4); // List of recipients

sendNotification(notificationType, message, recipients);