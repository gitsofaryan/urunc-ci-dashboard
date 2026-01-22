import { useEffect, useRef } from 'react';

const useWebSocket = (url: string) => {
    const socketRef = useRef<WebSocket | null>(null);
    const messageQueue = useRef<string[]>([]);

    useEffect(() => {
        socketRef.current = new WebSocket(url);

        socketRef.current.onopen = () => {
            console.log('WebSocket connection established');
            messageQueue.current.forEach((message) => {
                socketRef.current?.send(message);
            });
            messageQueue.current = [];
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // Handle incoming messages here
            console.log('Message received:', data);
        };

        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socketRef.current?.close();
        };
    }, [url]);

    const sendMessage = (message: string) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(message);
        } else {
            messageQueue.current.push(message);
        }
    };

    return { sendMessage };
};

export default useWebSocket;