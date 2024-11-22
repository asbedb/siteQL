// components/InstallationProgress.tsx
import { useState, useEffect } from 'react';

export default function InstallationProgress() {

    const [installationData, setInstallationData] = useState<{
        status: string;
        message: string;
        data: {
            pendingInstallation: string[];
            installedVariables: string[];
        };
        connectionStatus: string;
    } | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstallationData = async () => {
            try {
                const response = await fetch('/api/connections/checkInstallation');
                if (!response.ok) {
                    throw new Error('Failed to fetch installation data');
                }
                const data = await response.json();
                setInstallationData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchInstallationData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!installationData) {
        return <div>Error loading installation data.</div>;
    }
    return (
        <div className='p-2'>
            <p className='font-bold my-2 bg-primary-100 rounded-xl p-2 text-center'>
                {installationData.connectionStatus}
            </p>
            <hr className='h-1 mx-auto my-4 bg-foreground border-0 rounded-xl'/>
            <p className='font-bold text-medium my-2 '>{installationData.message}</p>
            
                {installationData.status === 'pending' ? (
                    <div >
                        <ul className='ml-4 px-4 py-2 bg-primary-100 rounded-xl'>
                            {installationData.data.pendingInstallation.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div >
                        <ul className='ml-4 px-4 py-2 bg-primary-100 rounded-xl'>
                            {installationData.data.installedVariables.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
    );
}
