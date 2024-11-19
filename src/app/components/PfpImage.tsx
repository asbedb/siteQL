import { useState, useEffect } from 'react';
import { Input, Image, Button } from '@nextui-org/react';
import { uploadImagesProps } from '@/types/types';
import Toast from './Toast';

type UserData = {
    pfp_image: string | null;
    app_image: string | null;
};
export default function PfpImage({ uploadPfpImages, error, successMessage }: uploadImagesProps) {
    //file variables
    const [sitePfpFile, setSitePfpFile] = useState<File | null>(null);
    const [sitePfpFileName, setSitePfpFileName] = useState('');
    const [userPfpFile, setUserPfpFile] = useState<File| null>(null);
    const [userPfpFileName, setUserPfpFileName] = useState('');
    //url variables
    const [userPfpUrl, setUserPfpUrl] = useState<string | null>(null);
    const [sitePfpUrl, setSitePfpUrl] = useState<string | null>(null);
    //site render variables
    const [userData, setUserData] = useState<UserData | null>(null);
    //button disabled vaeriables
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    //toast variables
    const [toastOpen, setToastOpen] = useState(false); 
    const [toastMessage, setToastMessage] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');

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
            if (err instanceof Error){
                setErrorMessage(err.message);
            } else {
                setErrorMessage('Unknown Error');
            }
                
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
            setIsButtonDisabled(true);
            // Fetch the latest user data after upload
            fetchUserData();
        } else {
            setToastMessage(error || 'Upload failed. Please try again.');
            setIsButtonDisabled(false);
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
        setIsButtonDisabled(false);
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
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        {userData.pfp_image && (
                            <div className="flex flex-col items-center">
                                <Image
                                    src={`img/userpfp/${userData.pfp_image}`}
                                    alt="Current Profile"
                                    className="h-[90px] w-[90px] rounded-full object-cover "  // Ensures image covers the area without stretching
                                />
                                <p className="mt-2">Current User Image</p>
                            </div>
                        )}
                        {userData.app_image && (
                            <div className="flex flex-col items-center">
                                <Image
                                    src={`img/sitepfp/${userData.app_image}`}
                                    alt="Current Site Image"
                                    className="h-[90px] w-[90px] rounded-full object-cover"  // Ensures image covers the area without stretching
                                />
                                <p className="mt-2">Current Site Image</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

            <form onSubmit={handleSubmit}> 
                <div className='flex flex-col md:flex-row min-w-full justify-center items-center mt-4 gap-4'>
                    <div className='flex flex-col border border-primary-200 rounded-xl p-4 w-full shadow-lg justify-center items-center'>
                        <Input
                            type="file" 
                            label="Upload Profile Image"
                            id='userPfp'
                            name='userPfp'
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg" 
                            className='py-2' 
                            aria-label="Profile Image Upload"
                        />
                        {userPfpUrl && (
                            <>
                                <p className='font-semibold text-lg leading-snug'>Selected Profile Image: <br/>{userPfpFileName}</p>
                                <Image
                                    src={userPfpUrl}
                                    alt="Profile Preview"
                                    className='h-[90px] w-[90px] rounded-full'
                                />
                            </>
                        )}
                    </div>
                    <div className='flex flex-col border border-primary-200 rounded-xl p-4 w-full shadow-lg justify-center items-center'>
                        <Input
                            type="file" 
                            label="Upload Site Image"
                            id='sitePfp'
                            name='sitePfp'
                            accept="image/png, image/jpeg" 
                            onChange={handleFileChange}
                            className='py-2' 
                            aria-label="Site Image Upload"
                        />
                        {sitePfpUrl && (
                            <>
                                <p className='font-semibold text-lg leading-snug'>Selected Site Image: <br/>{sitePfpFileName}</p>
                                <Image
                                    src={sitePfpUrl}
                                    alt="Site Preview"
                                    className='h-[90px] w-[90px] rounded-full'
                                />

                            </>
                        )}
                    </div>
                </div>
                <div className='flex flex-row items-center justify-between w-full mt-4'>
                    <Button onClick={handleReset}>Reset Values</Button>
                    <Button 
                        type="submit" 
                        color='success'
                        variant={isButtonDisabled? 'light': 'solid'} 
                        isDisabled={isButtonDisabled} >
                            {isButtonDisabled? 'Images Uploaded': 'Upload Images'}
                    </Button>
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
