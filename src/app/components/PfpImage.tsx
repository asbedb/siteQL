import { useState, useEffect } from 'react';
import { Input, Image, Button } from '@nextui-org/react';
import { uploadImagesProps } from '@/types/types';
import Toast from './Toast';

export default function PfpImage({ uploadPfpImages, error, successMessage }: uploadImagesProps) {
    const [sitePfpFile, setSitePfpFile] = useState<File | null>(null);
    const [sitePfpFileName, setSitePfpFileName] = useState('');
    const [userPfpFile, setUserPfpFile] = useState<File | null>(null);
    const [userPfpFileName, setUserPfpFileName] = useState('');
    const [userPfpUrl, setUserPfpUrl] = useState<string | null>(null);
    const [sitePfpUrl, setSitePfpUrl] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [toastOpen, setToastOpen] = useState(false); 
    const [toastMessage, setToastMessage] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(null);

    // Fetch user data on mount
    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/connections/siteDataRender');
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to fetch user data');
            setUserData(data);
            setUserPfpUrl(data.pfp_image ? `img/userpfp/${data.pfp_image}` : null);
            setSitePfpUrl(data.app_image ? `img/sitepfp/${data.app_image}` : null);
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

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
        e.preventDefault();
        const result = await uploadPfpImages({ sitePfp: sitePfpFile, userPfp: userPfpFile });

        if (result?.success) {  
            setToastMessage(successMessage || 'Upload successful!');
            
            // Fetch the latest user data after upload
            fetchUserData();
        } else {
            setToastMessage(error || 'Upload failed. Please try again.');
        }
        setToastOpen(true);
    };

    const handleReset = () => {
        setSitePfpFile(null);
        setSitePfpFileName('');
        setUserPfpFile(null);
        setUserPfpFileName('');
        setUserPfpUrl(null);
        setSitePfpUrl(null);
    };

    useEffect(() => {
        return () => {
            if (userPfpUrl) URL.revokeObjectURL(userPfpUrl);
            if (sitePfpUrl) URL.revokeObjectURL(sitePfpUrl);
        };
    }, [userPfpUrl, sitePfpUrl]);

    return (
        <div className='p-12'>
            <span className='text-2xl font-semibold'>Images for your Site/Profile</span> 
            {/* Existing Profile Images */}
            {userData && (
                <div className="flex flex-col items-center">
                    <div className="flex flex-row space-x-4">
                        {userData.pfp_image && (
                            <div className="flex flex-col items-center">
                                <Image
                                    src={`img/userpfp/${userData.pfp_image}`}
                                    alt="Current Profile"
                                    className='h-[90px] w-[90px] rounded-full'
                                />
                                <p className='mt-2'>Current User Image</p>
                            </div>
                        )}
                        {userData.app_image && (
                            <div className="flex flex-col items-center">
                                <Image
                                    src={`img/sitepfp/${userData.app_image}`}
                                    alt="Current Site Image"
                                    className='h-[90px] w-[90px] rounded-full'
                                />
                                <p className='mt-2'>Current Site Image</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

            <form onSubmit={handleSubmit}> 
                <Input
                    type="file" 
                    label="Upload Profile Image"
                    id='userPfp'
                    name='userPfp'
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg" 
                    className='max-w-xs py-2' 
                    aria-label="Profile Image Upload"
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
                    aria-label="Site Image Upload"
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
                    <Button onClick={handleReset}>Reset Values</Button>
                    <Button type="submit">Create Database</Button>
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
