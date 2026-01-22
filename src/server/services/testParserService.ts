import { TestResult } from '../models/TestResult';

export class TestParserService {
    parseTestOutput(output: string): TestResult[] {
        const results: TestResult[] = [];
        const lines = output.split('\n');

        lines.forEach(line => {
            const match = this.extractTestResult(line);
            if (match) {
                results.push(match);
            }
        });

        return results;
    }

    private extractTestResult(line: string): TestResult | null {
        const regex = /^(?<name>.+?)\s+(?<status>passed|failed|skipped)\s+(?<duration>\d+ms)$/;
        const match = line.match(regex);

        if (match && match.groups) {
            return {
                name: match.groups.name,
                status: match.groups.status,
                duration: parseInt(match.groups.duration, 10),
            } as TestResult;
        }

        return null;
    }
}