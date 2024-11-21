// components/CredentialsInformation.tsx
import {useState} from 'react'
import {Input, Button } from '@nextui-org/react'
import Toast from './Toast';
import { UpdateCredentialsProps } from '@/types/types';

export default function CredentialsInformation({ updateCredentials}: UpdateCredentialsProps) {
    //credential state variables
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isPasswordMatch = password && confirmPassword && password === confirmPassword;

    //Form validation notification state variables
    const [toastOpen, setToastOpen] = useState(false); 
    const [toastMessage, setToastMessage] = useState(''); 

    // State for button disable - prevent multiple creations without a refresh/reset
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleReset = () => {
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsButtonDisabled(false);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Basic validation
        if (!fullName || !email || !password) {
            setToastMessage('Name, Email and Password Required');
            setToastOpen(true);
            return;
        }
        if (!isPasswordMatch) {
            setToastMessage('Passwords do not match.');
            setToastOpen(true);
            return;
        }
        // Ensure that the result is a QueryResult object with a success property
        const { disablebtn } = await updateCredentials({ fullName, password, email});
        // Set the button disabled state based on success or failure
        setIsButtonDisabled(disablebtn );
        
    };
    return (
    <div className='p-12'>
        <span className='text-2xl font-semibold'>Setup your Credentials</span>
        <form onSubmit={handleSubmit}>
            <Input
                isRequired 
                type="text" 
                label="Full Name"
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)}
                className='py-2'  />
            <Input 
                isRequired
                type="email" 
                label="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className='py-2' />
            <Input 
                isRequired
                type="password" 
                label="User Password"
                id='userPass'
                name='userPass' 
                onChange={(e) => setPassword(e.target.value)}
                color={isPasswordMatch ? 'success' : 'warning'}
                className='py-2' />
            <Input 
                isRequired
                type="password" 
                label="Confirm Password"
                id='confirmPass' 
                onChange={(e) => setConfirmPassword(e.target.value)}
                color={isPasswordMatch ? 'success' : 'warning'}
                className='py-2' />
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
                            {isButtonDisabled? 'Credentials Updated': 'Update Credentials'}
                    </Button>
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