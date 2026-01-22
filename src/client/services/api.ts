import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const fetchTestResults = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/tests/results`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching test results: ' + error.message);
    }
};

export const fetchNotifications = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/notifications`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching notifications: ' + error.message);
    }
};

export const sendNotification = async (notificationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/notifications`, notificationData);
        return response.data;
    } catch (error) {
        throw new Error('Error sending notification: ' + error.message);
    }
};