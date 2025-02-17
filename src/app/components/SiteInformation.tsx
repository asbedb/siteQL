// components/SiteInformation.tsx
import {useState} from 'react'
import { Input, Textarea, Button } from '@nextui-org/react'
import { UpdateSiteInformationProps } from '@/types/types';

export default function SiteInformation ({ updateSiteInformation}: UpdateSiteInformationProps) {
    //application information state variables
    const [location, setLocation] = useState('');
    const [appName, setAppName] = useState('');
    const [aboutApp, setAboutSite] = useState(''); 

    // State for button disable - prevent multiple creations without a refresh/reset
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Ensure that the result is a QueryResult object with a success property
        const { disablebtn } = await updateSiteInformation({ location, appName, aboutApp});
        // Set the button disabled state based on success or failure
        setIsButtonDisabled(disablebtn );
    }

    const handleReset = () => {
        setLocation('');
        setAppName('');
        setAboutSite('');
        setIsButtonDisabled(false);
    }

    return (
    <div className='flex w-full h-full flex-col'>
        <span className='text-2xl font-semibold'>Some Information about your application</span>
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
                    <Button 
                        type="submit" 
                        color='success'
                        variant={isButtonDisabled? 'light': 'solid'} 
                        isDisabled={isButtonDisabled} >
                            {isButtonDisabled? 'Information Updated': 'Save Information'}
                    </Button>
                </div>
            </div>
        </form>
    </div>
    )
}