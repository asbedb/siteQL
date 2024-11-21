// components/ServicePing.tsx
"use client"
import { useState, useEffect } from 'react';
import { Tooltip } from '@nextui-org/react';

export default function ServicePing() {
    const [isRunning, setIsRunning] = useState<boolean | null>(null);

    useEffect(() => {
        async function checkServer() {
        try {
            const response = await fetch('/api/connections/sqlServicePing');
            const data = await response.json();
            setIsRunning(data.isRunning);
        } catch (error) {
            console.error('Error checking MySQL server status:', error);
            setIsRunning(false);
        }
        }

        checkServer();
    }, []);

    return (
        <div >
            <Tooltip className='text-foreground' content={isRunning === null ? 'Checking Status...' : isRunning ? 'SQL Service is Running' : 'SQL Service is not running'}>
            <div
                    className={`w-10 h-10 rounded-full bg-${isRunning === null ? 'warning' : isRunning ? 'success' : 'danger'} mr-2`} // Adjust size with w- and h- classes
            />
            </Tooltip>
        </div>
    );
}
