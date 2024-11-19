"use client"
import Logo from "./Logo";
import { useState } from "react";
import { Button } from '@nextui-org/react'
import { ConnectionParams, DBCredentialsParams, UpdateSiteParams, UploadPfpImageParams, CreateTableParams } from '../../types/types'; 
import IntroductionStep from './IntroductionStep';
import SqlNodeInformation from './SqlNodeInformation';
import CredentialsInformation from './CredentialsInformation';
import SiteInformation from './SiteInformation';
import PfpImage from './PfpImage';
import CustomTable from "./CustomTable";

export default function FormBox() {
    const [step, setStep] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    //stephandler
    const handleNext = () => {
        if(step<6)setStep(step+1)
    };
    const handlePrevious = () => {
        if(step>1)setStep(step - 1)};

    //Connect/createDB Function
    const connectCreateDB = async ({ host, user, password, dbName }: ConnectionParams) => {
        try {
            const response = await fetch('/api/connections/createDatabase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ host, user, password, dbName }),
            });
            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Database Created - Connection successful!'); 
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
    const updateSiteInformation = async({location, appName, aboutApp}: UpdateSiteParams) => {
        try {
            const response = await fetch('/api/connections/updateDatabase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location, appName, aboutApp: aboutApp }),
            });
            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Site and Profile Information Updated'); 
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
    const uploadPfpImages = async ({ sitePfp, userPfp }: UploadPfpImageParams): Promise<{ success: boolean; error?: string }> => {
        const formData = new FormData();
        // Append files to FormData
        if (sitePfp) formData.append('sitePfp', sitePfp);
        if (userPfp) formData.append('userPfp', userPfp);
        try {
            const response = await fetch('/api/config/imageUploader', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                return { success: true }; // Return success
            } else {
                return { success: false, error: result.error || 'Upload failed.' };
            }
        } catch (err) {
            return {
                success: false,
                error: err instanceof Error ? err.message : 'An unknown error occurred.',
            };
        }
    };

    const createTable = async ({tableName, columns}: CreateTableParams) => {
        try {
            const response = await fetch('/api/connections/createTable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tableName, columns }),
            });
    
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage(data.message || 'Table created successfully!');
                // reset form or handle further logic
            } else {
                setErrorMessage(data.error || 'Error creating table.');
            }
        } catch (error) {
            setErrorMessage(error + 'An error occurred.');
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
            case 6:
                return <CustomTable
                            createTable={createTable}
                        />;
            default:
                return <IntroductionStep/>;
        }
    };

    return(
        <div className="p-5 h-screen md:p-20 overflow-y-hidden">
            <div className="grid grid-cols-1 
                grid-rows-10 
                w-full 
                h-full 
                items-center 
                text-center 
                rounded-xl 
                bg-primary-50
                ">
                    <div className="flex flex-col items-center justify-center row-span-2">    
                        <Logo/>
                    </div>
                    <div className="row-span-7 overflow-auto h-full">
                        {renderFormStep()}  
                    </div>
                    <div className="row-span-1">
                        <div className="flex flex-row items-center justify-between px-4 w-full">
                            {step > 1 && <Button onClick={handlePrevious}>Back</Button>}
                            <Button  onClick={handleNext}>Next</Button>
                        </div>
                    </div>
            </div>
        </div>
    )
}