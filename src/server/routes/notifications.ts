import { Router } from 'express';
import NotificationController from '../controllers/notificationController';

const router = Router();
const notificationController = new NotificationController();

// Route to get all notifications
router.get('/', notificationController.getAllNotifications.bind(notificationController));

// Route to create a new notification
router.post('/', notificationController.createNotification.bind(notificationController));

// Route to delete a notification by ID
router.delete('/:id', notificationController.deleteNotification.bind(notificationController));

export default router;