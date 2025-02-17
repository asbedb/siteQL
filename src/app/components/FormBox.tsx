// components/FormBox.tsx
"use client"
import Logo from "./Logo";
import { useState} from "react";
import { Button } from '@nextui-org/react'
import {    ConnectionParams, 
            DBCredentialsParams, 
            UpdateSiteParams, 
            UploadPfpImageParams, 
            CreateTableParams, 
            ShowToastParams, 
            QueryResult, 
            FinalInstallCheckQueryResult } from '../../types/types'; 
import IntroductionStep from './IntroductionStep';
import SqlNodeInformation from './SqlNodeInformation';
import CredentialsInformation from './CredentialsInformation';
import SiteInformation from './SiteInformation';
import PfpImage from './PfpImage';
import CustomTable from "./CustomTable";
import Toast from "./Toast";
import FinaliseInstallation from "./FinaliseInstallation";


export default function FormBox() {
    //state variables
    const [step, setStep] = useState<number>(1);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [disableBtn, setDisableBtn] = useState<boolean>(true);


    //basic counter for installer
    const handleNext = () => {
        if(step<7)setStep(step+1)
    };
    const handlePrevious = () => {
        if(step>1)setStep(step - 1)
    };

    //creates and connects to the database.
    const connectCreateDB = async ({ host, port, user, password, dbName,  }: ConnectionParams): Promise<QueryResult> => {
        try {
            const response = await fetch('/api/connections/createDatabase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ host, port, user, password, dbName }),
            });
            const result = await response.json();
            if (response.ok) {
                showToast({message: 'DB Created/Updated and Connected'});
                return { disablebtn: true}
            } else {
                throw new Error(result.error || 'Connection failed');
            }
        } catch (error) {
            if (error instanceof Error) {
                showToast({message: error.message}); 
            } else {
                showToast({message: 'An unknown error has occured'}); 
            }
            return { disablebtn: false}
        }
    };

    //updates main credentials to login into app backend
    const updateCredentials = async({fullName, password, email}: DBCredentialsParams): Promise<QueryResult> => {
        try {
            const response = await fetch('/api/connections/updateCredentials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, userEmail: email, userPassword: password }),
            });
            const result = await response.json();
            if (response.ok) {
                showToast({message: 'Credentials Updated'});
                return { disablebtn: true}
            } else {
                throw new Error(result.error || 'Update Failed');
            }
        } catch (error) {
            if (error instanceof Error) {
                showToast({message: error.message});
            } else {
                showToast({message: 'An unknown error occurred.'});
            }
            return { disablebtn: false}
        }
    };

    //updates application information
    const updateSiteInformation = async({location, appName, aboutApp}: UpdateSiteParams): Promise<QueryResult> => {
        try {
            const response = await fetch('/api/connections/updateDatabase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location, appName, aboutApp: aboutApp }),
            });
            const result = await response.json();
            if (response.ok) {
                showToast({message: 'Site and Profile Information Updated'});
                return { disablebtn: true}
            } else {
                throw new Error(result.error || 'Update Failed');
            }
        } catch (error) {
            if (error instanceof Error) {
                showToast({message: error.message});
            } else {
                showToast({message: 'An unknown error occurred.'});
            }
            return { disablebtn: false}
        }
    };

    // Upload Images for application
    const uploadPfpImages = async ({ sitePfp, userPfp }: UploadPfpImageParams): Promise<QueryResult> => {
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
                showToast({message: 'Images Uploaded Succcessfully'});
                return { disablebtn: true}
            } else {
                showToast({ message: `${result.error}` || 'Upload failed.' });
            }
            return{disablebtn: true}
        } catch (err) {
            if(err instanceof Error){
                showToast({message: err.message})
            }else{
                showToast({message: 'An Unknown Error has occured'})
            }
            return{disablebtn: true}
        }
    };

    //custom SQL Table for application
    const createTable = async ({tableName, columns}: CreateTableParams): Promise<QueryResult> => {
        try {
            const response = await fetch('/api/connections/createTable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tableName, columns }),
            });
    
            const data = await response.json();
            if (response.ok) {
                showToast({message: data.message || 'Table created successfully!'});
                return { disablebtn: true}
            } else {
                showToast({message: data.error || 'Error creating table.'});
            }   
        } catch (error) {
            showToast({message: error + 'Error creating table.'});
        }
        return { disablebtn: false}
    };

    //FinalizeInstallation function
    const finalInstallCheck = async (): Promise<FinalInstallCheckQueryResult> => {
        try {
            const response = await fetch('/api/connections/finalInstallCheck', {
                method: 'GET',
            }); 
            if (!response.ok) {
                throw new Error(`API error (Check SQL Server Status): ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in finalizeInstall:', error);
            // Return a fallback response on error
            return {
                allChecksPass: false,
                codeLines: [`Error: ${error instanceof Error ? error.message : 'Unknown error'}`],
            };
        }
    };

    //Finish by writing ENV as installed
    const finishInstallation = async () => {
        setDisableBtn(true)
        try {
            const response = await fetch('/api/connections/finalInstallCheck', {
                method: 'POST',
            });
    
            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }
            const data = await response.json();
            setTimeout(()=>{
                showToast({message: 'Finalising Installation, Page will refresh shortly - Happy developing! 🍵🍵🍵 '})
            }, 5000)
            return data;
        } catch (error) {
            showToast({message: 'Error: '+ error}) 
            // Return a fallback response on error
            return {
                allChecksPass: false,
                codeLines: [],
            };
        }
    }

    //Notification System
    const showToast = ({message}: ShowToastParams) => {
        setToastMessage(message);
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 3000);
    }
    
    //renders current installer step
    const renderFormStep = () => {
        switch (step) {
            case 1:
                return <IntroductionStep />;
            case 2:
                return <SqlNodeInformation 
                            connectCreateDB={connectCreateDB}
                            />;
            case 3:
                return <CredentialsInformation
                            updateCredentials={updateCredentials}
                            />;
            case 4:
                return <SiteInformation 
                            updateSiteInformation={updateSiteInformation}
                            />;
            case 5:
                return <PfpImage 
                            uploadPfpImages={uploadPfpImages}
                            />;
            case 6:
                return <CustomTable
                            createTable={createTable}
                        />;
            case 7:
                return <FinaliseInstallation
                            finalInstallCheck={finalInstallCheck}
                            setDisableBtn={setDisableBtn}
                            />;
            default:
                return <IntroductionStep/>;
        }
    };



    return(
            <div className="
                flex
                flex-col
                w-full
                h-full
                items-center 
                text-center 
                justify-center
                rounded-xl 
                bg-primary-50
                ">   
                    <Logo/>
                    <div className="flex overflow-auto h-full w-full text-center justify-center px-12">
                        {renderFormStep()}  
                    </div>
                    <div className="flex flex-row items-center justify-between p-8 w-full">
                        {step > 1 ? <Button onClick={handlePrevious}>Back</Button>: <div></div>}
                        {step != 7 ? 
                            <Button  onClick={handleNext}>Next</Button>: 
                            <Button 
                                isDisabled={disableBtn} 
                                variant={disableBtn? 'light': 'solid'}
                                color={disableBtn? 'default': 'success'}
                                onClick={finishInstallation}
                                >Finalize Installation</Button>}
                    </div>
                    <Toast
                        message={toastMessage}
                        isOpen={toastOpen}
                        onClose={() => setToastOpen(false)}
                    />
            </div>
    )
}