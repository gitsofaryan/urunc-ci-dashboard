export type TestRun = {
    id: string;
    userId: string;
    status: 'passed' | 'failed' | 'running';
    createdAt: Date;
    updatedAt: Date;
};

export type TestResult = {
    id: string;
    testRunId: string;
    name: string;
    status: 'passed' | 'failed' | 'skipped';
    duration: number;
    errorMessage?: string;
};

export type Notification = {
    id: string;
    userId: string;
    message: string;
    type: 'info' | 'warning' | 'error';
    createdAt: Date;
};

export type User = {
    id: string;
    email: string;
    name: string;
    notificationsEnabled: boolean;
};