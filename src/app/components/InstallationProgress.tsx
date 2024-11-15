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
        <div>
            <div>
                <p className='font-bold my-2 bg-primary-100 rounded-xl p-2'>
                    {installationData.connectionStatus}
                </p>
                <hr/>
                <p className='font-bold text-medium my-2'>{installationData.message}</p>
                {installationData.status === 'pending' ? (
                    <ul>
                        {installationData.data.pendingInstallation.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <ul>
                        {installationData.data.installedVariables.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
