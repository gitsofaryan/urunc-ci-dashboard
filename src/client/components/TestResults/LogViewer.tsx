import React from 'react';

interface LogViewerProps {
    logs: string[];
}

const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
    return (
        <div className="log-viewer">
            <h2>Test Run Logs</h2>
            <pre>
                {logs.map((log, index) => (
                    <div key={index}>{log}</div>
                ))}
            </pre>
        </div>
    );
};

export default LogViewer;