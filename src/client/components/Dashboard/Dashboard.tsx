import React, { useEffect, useState } from 'react';
import { fetchDashboardData } from '../../services/api';
import TestSummaryCard from './TestSummaryCard';
import TestTrendChart from './TestTrendChart';
import RecentRunsList from './RecentRunsList';
import './Dashboard.css';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchDashboardData();
                setDashboardData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error loading dashboard data: {error.message}</div>;
    }

    return (
        <div className="dashboard">
            <h1>CI Dashboard</h1>
            <TestSummaryCard data={dashboardData.summary} />
            <TestTrendChart data={dashboardData.trend} />
            <RecentRunsList runs={dashboardData.recentRuns} />
        </div>
    );
};

export default Dashboard;