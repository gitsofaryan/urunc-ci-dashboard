import fs from 'fs';
import path from 'path';

interface TestResult {
    testName: string;
    status: 'passed' | 'failed' | 'skipped';
    duration: number; // in milliseconds
    errorMessage?: string;
}

function parseTestOutput(filePath: string): TestResult[] {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const lines = rawData.split('\n');
    const results: TestResult[] = [];

    lines.forEach(line => {
        const match = line.match(/^(.*) - (passed|failed|skipped) \((\d+)ms\)/);
        if (match) {
            const [, testName, status, duration] = match;
            results.push({
                testName: testName.trim(),
                status: status as 'passed' | 'failed' | 'skipped',
                duration: parseInt(duration, 10),
                ...(status === 'failed' && { errorMessage: 'Test failed' }) // Placeholder for actual error message parsing
            });
        }
    });

    return results;
}

function main() {
    const outputFilePath = path.join(__dirname, 'test-results.json');
    const testResults = parseTestOutput(process.argv[2]);

    fs.writeFileSync(outputFilePath, JSON.stringify(testResults, null, 2));
    console.log(`Parsed test results saved to ${outputFilePath}`);
}

if (require.main === module) {
    main();
}