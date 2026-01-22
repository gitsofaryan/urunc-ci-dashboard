import { Router } from 'express';
import TestResultsController from '../controllers/testResultsController';

const router = Router();
const testResultsController = new TestResultsController();

// Route to fetch all test results
router.get('/', testResultsController.getAllTestResults.bind(testResultsController));

// Route to fetch a specific test result by ID
router.get('/:id', testResultsController.getTestResultById.bind(testResultsController));

// Route to create a new test result
router.post('/', testResultsController.createTestResult.bind(testResultsController));

// Route to update an existing test result
router.put('/:id', testResultsController.updateTestResult.bind(testResultsController));

// Route to delete a test result
router.delete('/:id', testResultsController.deleteTestResult.bind(testResultsController));

export default router;