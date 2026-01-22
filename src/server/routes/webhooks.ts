import { Router } from 'express';
import WebhookController from '../controllers/webhookController';

const router = Router();
const webhookController = new WebhookController();

// Route to handle GitHub webhooks
router.post('/github', webhookController.handleGitHubWebhook.bind(webhookController));

export default router;