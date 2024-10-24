import {useState} from 'react'
import { Input, Textarea, Button } from '@nextui-org/react'
import { updateSiteInformationProps } from '@/types/types';
import Toast from './Toast';

export default function SiteInformation ({ updateSiteInformation, error, successMessage}: updateSiteInformationProps) {
    const [location, setLocation] = useState('');
    const [appName, setAppName] = useState('');
    const [aboutApp, setAboutSite] = useState('');
    //toast notification variables
    const [toastOpen, setToastOpen] = useState(false); 
    const [toastMessage, setToastMessage] = useState(''); 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await updateSiteInformation({ location, appName, aboutApp});
        if(successMessage){
            setToastMessage(successMessage);
            setToastOpen(true);
        }else{
            setToastMessage(error);
            setToastOpen(true);
        }
    }
    const handleReset = () => {
        setLocation('');
        setAppName('');
        setAboutSite('');
    }

    return (
    <div className='p-12'>
        <span className='text-2xl font-semibold'>Some Information about your App</span>
        <form onSubmit={handleSubmit}>
            <Input
                type="text" 
                label="Location"
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className='py-2'/>
            <Input 
                isRequired
                type="text" 
                label="App Name" 
                value={appName} 
                onChange={(e) => setAppName(e.target.value)}
                placeholder="Default: newApp"
                className='py-2'/>
            <Textarea
                label="About App"
                placeholder="Enter a Description about your project:"
                value={aboutApp} 
                onChange={(e) => setAboutSite(e.target.value)}
                className='py-2'/>
            <div className='flex flex-row items-center justify-between w-full'>
                <div>
                    <Button onClick={handleReset}>Reset Values</Button>
                </div>
                <div>
                    <Button type="submit">Create Database</Button>
                </div>
            </div>
        </form>
        <Toast 
            message={toastMessage} 
            isOpen={toastOpen} 
            onClose={() => setToastOpen(false)} 
        />
    </div>
    )
}