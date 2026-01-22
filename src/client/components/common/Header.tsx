import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold">CI Dashboard</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
                    <li><a href="/notifications" className="hover:underline">Notifications</a></li>
                    <li><a href="/test-results" className="hover:underline">Test Results</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;