import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { TestResult } from '../../../types';
import './TestResultsTable.css';

const TestResultsTable: React.FC = () => {
    const testResults = useSelector((state: RootState) => state.test.results);

    return (
        <div className="test-results-table">
            <h2>Test Results</h2>
            <table>
                <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Status</th>
                        <th>Duration</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {testResults.map((result: TestResult) => (
                        <tr key={result.id}>
                            <td>{result.name}</td>
                            <td className={result.status}>{result.status}</td>
                            <td>{result.duration} ms</td>
                            <td>{new Date(result.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestResultsTable;