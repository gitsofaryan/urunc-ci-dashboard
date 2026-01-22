export interface TestResult {
    id: string;
    testRunId: string;
    testName: string;
    status: 'passed' | 'failed' | 'skipped';
    duration: number; // duration in milliseconds
    errorMessage?: string; // optional, present if the test failed
    createdAt: Date;
    updatedAt: Date;
}