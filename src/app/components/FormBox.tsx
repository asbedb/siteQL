"use client"
import Logo from "./Logo";
import { useState } from "react";
import { Button } from '@nextui-org/react'
import { ConnectionParams, DBCredentialsParams, updateSiteParams, uploadPfpImageParams } from '../../types/types'; 
import IntroductionStep from './IntroductionStep';
import SqlNodeInformation from './SqlNodeInformation';
import CredentialsInformation from './CredentialsInformation';
import SiteInformation from './SiteInformation';
import PfpImage from './PfpImage';

export default function FormBox() {
    const [step, setStep] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    //stephandler
    const handleNext = () => {
        if(step<5)setStep(step+1)
    };
    const handlePrevious = () => {
        if(step>1)setStep(step - 1)};
    //test/createDB Function
    const connectCreateDB = async ({ host, user, password, dbName }: ConnectionParams) => {
        try {
            const response = await fetch('/api/connections/createDatabase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ host, user, password, dbName }),
            });
            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Connection successful!'); 
            } else {
                throw new Error(result.error || 'Connection failed');
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message); 
            } else {
                setErrorMessage('An unknown error occurred.');
            }
        }
    };
    //update credentials in db function
    const updateCredentials = async({fullName, password, email}: DBCredentialsParams) => {
        try {
            const response = await fetch('/api/connections/updateCredentials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, userEmail: email, userPassword: password }),
            });
            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Credentials Updated'); 
            } else {
                throw new Error(result.error || 'Update Failed');
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message); 
            } else {
                setErrorMessage('An unknown error occurred.');
            }
        }
    };
    //update site info
    const updateSiteInformation = async({location, appName, aboutApp}: updateSiteParams) => {
        try {
            const response = await fetch('/api/connections/updateDatabase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location, appName, aboutApp: aboutApp }),
            });
            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Profile Updated'); 
            } else {
                throw new Error(result.error || 'Update Failed');
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message); 
            } else {
                setErrorMessage('An unknown error occurred.');
            }
        }
    };
    // Upload Images
    const uploadPfpImages = async ({ sitePfp, userPfp }: uploadPfpImageParams) => {
        const formData = new FormData();
        
        // Append files to FormData
        if (sitePfp) formData.append('sitePfp', sitePfp);
        if (userPfp) formData.append('userPfp', userPfp);
        
        try {
            // Make the POST request to upload the images
            const response = await fetch('/api/config/imageUploader', {
                method: 'POST',
                body: formData,
            });

            // Parse the response
            const result = await response.json();
            
            // Check if the response was successful
            if (response.ok) {
                setSuccessMessage('Profile Updated');
                return result; // Return the result if needed
            } else {
                throw new Error(result.error || 'Update Failed');
            }
        } catch (error) {
            // Handle errors
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('An unknown error occurred.');
            }
        }
    };

    const renderFormStep = () => {
        switch (step) {
            case 1:
                return <IntroductionStep />;
            case 2:
                return <SqlNodeInformation 
                            connectCreateDB={connectCreateDB}
                            error={errorMessage}
                            successMessage={successMessage}/>;
            case 3:
                return <CredentialsInformation
                            updateCredentials={updateCredentials}
                            error={errorMessage}
                            successMessage={successMessage}/>;
            case 4:
                return <SiteInformation 
                            updateSiteInformation={updateSiteInformation}
                            error={errorMessage}
                            successMessage={successMessage}/>;
            case 5:
                return <PfpImage 
                            uploadPfpImages={uploadPfpImages}
                            error={errorMessage}
                            successMessage={successMessage}/>;
            default:
                return <IntroductionStep/>;
        }
    };

    return(
        <>
            <div className="grid grid-cols-1 
                grid-rows-10 
                w-full 
                h-full 
                items-center 
                text-center 
                rounded-lg bg-primary">
                    <div className="flex flex-col items-center justify-center row-span-2">    
                        <Logo/>
                    </div>
                    <div className="row-span-7">
                        {renderFormStep()}  
                    </div>
                    <div className="row-span-1">
                        <div>
                            {step > 1 && <Button onClick={handlePrevious}>Back</Button>}
                            <Button  onClick={handleNext}>Next</Button>
                        </div>
                    </div>
            </div>
        </>
    )
}