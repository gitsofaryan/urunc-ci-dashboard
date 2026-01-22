import React from 'react';

interface TestSummaryCardProps {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    skippedTests: number;
}

const TestSummaryCard: React.FC<TestSummaryCardProps> = ({ totalTests, passedTests, failedTests, skippedTests }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold">Test Summary</h2>
            <div className="mt-2">
                <p>Total Tests: {totalTests}</p>
                <p>Passed: {passedTests}</p>
                <p>Failed: {failedTests}</p>
                <p>Skipped: {skippedTests}</p>
            </div>
            <div className="mt-4">
                <div className="flex justify-between">
                    <span className="text-green-500">Passed: {((passedTests / totalTests) * 100).toFixed(2)}%</span>
                    <span className="text-red-500">Failed: {((failedTests / totalTests) * 100).toFixed(2)}%</span>
                </div>
            </div>
        </div>
    );
};

export default TestSummaryCard;