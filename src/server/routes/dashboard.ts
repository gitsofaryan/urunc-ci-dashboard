import { Router } from 'express';
import DashboardController from '../controllers/dashboardController';

const router = Router();
const dashboardController = new DashboardController();

// Route to fetch aggregated test results
router.get('/results', dashboardController.getAggregatedTestResults);

// Route to fetch test trends
router.get('/trends', dashboardController.getTestTrends);

// Route to fetch recent test runs
router.get('/recent-runs', dashboardController.getRecentTestRuns);

export default router;