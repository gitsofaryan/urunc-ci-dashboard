import React from 'react';
import WorkflowDashboard from './components/Dashboard/WorkflowDashboard';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            <WorkflowDashboard />
        </div>
    );
};

export default App;