import { useState, useEffect } from 'react';
import { Input, Checkbox, Button } from '@nextui-org/react';
import Toast from './Toast';
import { SqlNodeInformationProps } from '../../types/types'; 

function SqlNodeInformation({ connectCreateDB }: SqlNodeInformationProps) {
    //Default Values for form
    const [host, setHost] = useState('localhost');
    const [user, setUser] = useState('root');
    const [dbName, setDbName] = useState('newApp');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State for checkbox
    const [blankDbPass, setBlankDbPass] = useState<boolean>(false); 

    //variables for pw confirmation
    const isPasswordMatch = password && confirmPassword && password === confirmPassword;
    const noPassword = password === '' && confirmPassword === '';

    //toast notification variables
    const [toastOpen, setToastOpen] = useState(false); 
    const [toastMessage, setToastMessage] = useState(''); 

    // State for button disable - prevent multiple creations without a refresh/reset
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const resetForm = () =>{
        setHost('localhost');
        setUser('root');
        setDbName('newApp');
        setPassword('');
        setConfirmPassword('');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Basic validation
        if (!host || !user || !dbName) {
            setToastMessage('Host, User, and Database Name are required.');
            setToastOpen(true);
            return;
        }
        if (!isPasswordMatch && !noPassword) {
            setToastMessage('Passwords do not match.');
            setToastOpen(true);
            return;
        }
        if(!blankDbPass){
            setToastMessage('You are trying to connect without a password please click blank pass to continue.');
            setToastOpen(true);
            return
        }
        await connectCreateDB({ host, user, password, dbName });
    };

    return (
        <div className='p-12'>
            <span className='text-2xl font-semibold'>Start With Your SQL Node Information</span>
            <form onSubmit={handleSubmit}>
                <Input
                    isRequired 
                    type="text" 
                    label="Host"
                    placeholder="Default: localhost"
                    value={host} 
                    onChange={(e) => setHost(e.target.value)}
                    className='py-2' />
                <Input 
                    isRequired
                    type="text" 
                    label="User" 
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Default: root"
                    value={user} 
                    className='py-2' />
                <Input 
                    isRequired
                    type="text" 
                    label="DB Name"
                    value={dbName} 
                    onChange={(e) => setDbName(e.target.value)}
                    placeholder="Default: newApp"
                    className='py-2' />
                <Input 
                    isRequired={!blankDbPass}
                    type="password" 
                    label={!blankDbPass? "DB Password": "Blank/No Password"}
                    id='dbPass' 
                    disabled={blankDbPass}
                    onChange={(e) => setPassword(e.target.value)}
                    color={isPasswordMatch && !blankDbPass ? 'success' : 'default'}
                    className='py-2' />
                <Input 
                    isRequired={!blankDbPass}
                    type="password" 
                    label={!blankDbPass? "Confirm DB Password": "Blank/No Password"}
                    disabled={blankDbPass}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    color={isPasswordMatch && !blankDbPass ? 'success' : 'default'}
                    className='py-2' />
                <Checkbox 
                    checked={blankDbPass}
                    color='success' 
                    onChange={(e) => setBlankDbPass(e.target.checked)} 
                    size="lg">
                    Blank Pass {'(DevOps)'}
                </Checkbox>
                <div className='flex flex-row items-center justify-between w-full'>
                    <div>
                        <Button onClick={resetForm}>Reset Values</Button>
                    </div>
                    <div>
                        <Button 
                            type="submit" 
                            color='success'
                            variant={isButtonDisabled? 'light': 'solid'} 
                            isDisabled={isButtonDisabled} >
                                {isButtonDisabled? 'Database Created': 'Create Database'}
                        </Button>
                    </div>
                </div>
                <Toast 
                    message={toastMessage} 
                    isOpen={toastOpen} 
                    onClose={() => setToastOpen(false)} 
                />
            </form>
        </div>
    );
}

export default SqlNodeInformation;
