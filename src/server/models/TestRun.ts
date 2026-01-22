export interface TestRun {
    id: string;
    testName: string;
    status: 'passed' | 'failed' | 'skipped';
    duration: number; // duration in milliseconds
    startedAt: Date;
    finishedAt: Date;
    logs: string; // logs related to the test run
    errorMessage?: string; // optional error message if the test failed
}