import { useEffect, useState } from 'react';
import { fetchTestResults } from '../services/api';

const useTestResults = () => {
    const [testResults, setTestResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTestResults = async () => {
            try {
                const results = await fetchTestResults();
                setTestResults(results);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadTestResults();
    }, []);

    return { testResults, loading, error };
};

export default useTestResults;