"use client";
import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import Toast from './Toast';
import { LoginCredentialsParams } from '@/types/types';
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const [userPassword, setUserPassword] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const router = useRouter();
    const resetFields = () => {
        setEmail('');
        setUserPassword('');
    };

    const loginCredentials = async ({ email, userPassword }: LoginCredentialsParams) => {
        try {
            const response = await fetch('/api/connections/updateCredentials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, userPassword }),
            });
            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Nice');
                router.push('/dashboard'); // This should work if you are using next/navigation correctly
            } else {
                throw new Error(result.error || 'Login Failed');
            }
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred.');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !userPassword) {
            setToastMessage('Email and Password Required');
            setToastOpen(true);
            return;
        }
        await loginCredentials({ email, userPassword });
        setToastMessage(successMessage || errorMessage);
        setToastOpen(true);
    };

    return (
        <div className='p-12'>
            <span className='text-2xl font-semibold'>App is installed: Please Login</span>
            <form onSubmit={handleSubmit}>
                <Input 
                    isRequired
                    type="email" 
                    label="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className='py-2' 
                />
                <Input 
                    isRequired
                    type="password" 
                    label="User Password"
                    onChange={(e) => setUserPassword(e.target.value)}
                    className='py-2' 
                />
                <div className='flex flex-row items-center justify-between w-full'>
                    <Button onClick={resetFields}>Reset Values</Button>
                    <Button type="submit">Login</Button>
                </div>
            </form>
            <Toast 
                message={toastMessage} 
                isOpen={toastOpen} 
                onClose={() => setToastOpen(false)} 
            />
        </div>
    );
}
