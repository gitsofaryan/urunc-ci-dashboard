import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const TestTrendChart: React.FC = () => {
    const testResults = useSelector((state: RootState) => state.test.results);
    
    const data = {
        labels: testResults.map(result => result.date),
        datasets: [
            {
                label: 'Test Success Rate',
                data: testResults.map(result => result.successRate),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'Test Failures',
                data: testResults.map(result => result.failures),
                fill: false,
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Test Trend Over Time</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default TestTrendChart;