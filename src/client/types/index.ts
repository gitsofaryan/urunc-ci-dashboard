export type TestResult = {
    id: string;
    testName: string;
    status: 'passed' | 'failed' | 'skipped';
    duration: number; // in milliseconds
    timestamp: Date;
};

export type Notification = {
    id: string;
    message: string;
    type: 'info' | 'warning' | 'error';
    timestamp: Date;
};

export type User = {
    id: string;
    email: string;
    notificationsEnabled: boolean;
};

export type TestRun = {
    id: string;
    results: TestResult[];
    totalDuration: number; // in milliseconds
    createdAt: Date;
};