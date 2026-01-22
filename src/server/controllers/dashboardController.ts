import { Request, Response } from 'express';
import { TestResult } from '../models/TestResult';
import { TestRun } from '../models/TestRun';

export class DashboardController {
    public async getAggregatedResults(req: Request, res: Response): Promise<Response> {
        try {
            const testResults = await TestResult.find(); // Fetch all test results
            const aggregatedData = this.aggregateResults(testResults);
            return res.status(200).json(aggregatedData);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching aggregated results', error });
        }
    }

    private aggregateResults(testResults: TestResult[]): any {
        // Logic to aggregate test results
        const totalRuns = testResults.length;
        const passedRuns = testResults.filter(result => result.status === 'passed').length;
        const failedRuns = totalRuns - passedRuns;

        return {
            totalRuns,
            passedRuns,
            failedRuns,
            passRate: totalRuns > 0 ? (passedRuns / totalRuns) * 100 : 0,
        };
    }

    public async getRecentTestRuns(req: Request, res: Response): Promise<Response> {
        try {
            const recentRuns = await TestRun.find().sort({ createdAt: -1 }).limit(5); // Fetch recent test runs
            return res.status(200).json(recentRuns);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching recent test runs', error });
        }
    }
}