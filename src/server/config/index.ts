import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'urunc_ci',
    },
    github: {
        token: process.env.GITHUB_TOKEN || '',
        webhookSecret: process.env.GITHUB_WEBHOOK_SECRET || '',
    },
    notifications: {
        slackWebhookUrl: process.env.SLACK_WEBHOOK_URL || '',
        emailService: process.env.EMAIL_SERVICE || '',
        emailUser: process.env.EMAIL_USER || '',
        emailPassword: process.env.EMAIL_PASSWORD || '',
    },
};

export default config;