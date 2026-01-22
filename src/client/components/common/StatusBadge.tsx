import React from 'react';

interface StatusBadgeProps {
    status: 'success' | 'failure' | 'pending';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    let badgeClass = '';

    switch (status) {
        case 'success':
            badgeClass = 'bg-green-500 text-white';
            break;
        case 'failure':
            badgeClass = 'bg-red-500 text-white';
            break;
        case 'pending':
            badgeClass = 'bg-yellow-500 text-white';
            break;
        default:
            badgeClass = 'bg-gray-500 text-white';
    }

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${badgeClass}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default StatusBadge;