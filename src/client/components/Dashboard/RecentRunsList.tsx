import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { TestRun } from '../../../types';
import './RecentRunsList.css';

const RecentRunsList: React.FC = () => {
    const recentRuns = useSelector((state: RootState) => state.test.recentRuns);

    return (
        <div className="recent-runs-list">
            <h2>Recent Test Runs</h2>
            {recentRuns.length === 0 ? (
                <p>No recent test runs available.</p>
            ) : (
                <ul>
                    {recentRuns.map((run: TestRun) => (
                        <li key={run.id} className={`run-item ${run.status}`}>
                            <span>{run.name}</span>
                            <span>{new Date(run.date).toLocaleString()}</span>
                            <span className="status-badge">{run.status}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecentRunsList;