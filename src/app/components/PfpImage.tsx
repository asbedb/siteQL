import { useState, useEffect } from 'react';
import { Input, Image, Button } from '@nextui-org/react';
import { uploadImagesProps } from '@/types/types';
import Toast from './Toast';

export default function PfpImage ({ uploadPfpImages, error, successMessage}: uploadImagesProps) {
    const [sitePfpFile, setSitePfpFile] = useState<File | null>(null);
    const [sitePfpFileName, setSitePfpFileName] = useState('');
    const [userPfpFile, setUserPfpFile] = useState<File | null>(null);
    const [userPfpFileName, setUserPfpFileName] = useState('');
    const [userPfpUrl, setUserPfpUrl] = useState<string | null>(null);
    const [sitePfpUrl, setSitePfpUrl] = useState<string | null>(null);
    //toast notification variables
    const [toastOpen, setToastOpen] = useState(false); 
    const [toastMessage, setToastMessage] = useState(''); 
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        if (event.target.id === 'userPfp') {
            setUserPfpFile(selectedFile);
            setUserPfpFileName(selectedFile.name);
            setUserPfpUrl(URL.createObjectURL(selectedFile));
        } else if (event.target.id === 'sitePfp') {
            setSitePfpFile(selectedFile);
            setSitePfpFileName(selectedFile.name);
            setSitePfpUrl(URL.createObjectURL(selectedFile)); 
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await uploadPfpImages({ sitePfp, userPfp});
        if(successMessage){
            setToastMessage(successMessage);
            setToastOpen(true);
        }else{
            setToastMessage(error);
            setToastOpen(true);
        }
    }
    const handleReset = () => {
        setSitePfpFile(null);
        setSitePfpFileName('');
        setUserPfpFile(null);
        setUserPfpFileName('');
        setUserPfpUrl(null);
        setSitePfpUrl(null);

    }
    useEffect(() => {
        return () => {
            if (userPfpUrl) {
                URL.revokeObjectURL(userPfpUrl);
            }
            if (sitePfpUrl) {
                URL.revokeObjectURL(sitePfpUrl);
            }
        };
    }, [userPfpUrl, sitePfpUrl]);

    return (
        <div className='p-12'>
            <span className='text-2xl font-semibold'>Images for your Site/Profile</span> 
            <form onSubmit={handleSubmit}> 
                <Input
                    type="file" 
                    label="Upload Profile Image"
                    id='userPfp'
                    name='userPfp'
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg" 
                    className='max-w-xs py-2' 
                />
                {userPfpUrl && (
                    <>
                        <Image
                            src={userPfpUrl}
                            alt="Profile Preview"
                            className='h-[90px] w-[90px] rounded-full'
                        />
                        <p className='text-left font-semibold text-xl'>Selected Profile Image: {userPfpFileName}</p>
                        <br />
                    </>
                )}
                <Input
                    type="file" 
                    label="Upload Site Image"
                    id='sitePfp'
                    name='sitePfp'
                    accept="image/png, image/jpeg" 
                    onChange={handleFileChange}
                    className='max-w-xs py-2' 
                />
                {sitePfpUrl && (
                    <>
                        <Image
                            src={sitePfpUrl}
                            alt="Site Preview"
                            className='h-[90px] w-[90px] rounded-full'
                        />
                        <p>Selected Site Image: {sitePfpFileName}</p>
                    </>
                )}
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
    );
}