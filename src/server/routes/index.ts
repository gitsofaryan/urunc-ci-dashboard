import { Router } from 'express';
import dashboardRoutes from './dashboard';
import testRoutes from './tests';
import notificationRoutes from './notifications';
import webhookRoutes from './webhooks';

const router = Router();

// Use the defined routes
router.use('/dashboard', dashboardRoutes);
router.use('/tests', testRoutes);
router.use('/notifications', notificationRoutes);
router.use('/webhooks', webhookRoutes);

export default router;