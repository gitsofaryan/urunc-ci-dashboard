import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <h2>CI Dashboard</h2>
            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                <li>
                    <Link to="/test-results">Test Results</Link>
                </li>
                <li>
                    <Link to="/notifications">Notifications</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;