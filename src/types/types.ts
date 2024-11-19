// src/types/types.ts

//PARAMS
export interface ConnectionParams {
    host: string;
    user: string;
    password: string;
    dbName: string;
}
export interface DBCredentialsParams{
    fullName: string;
    password: string;
    email: string;
}
export interface uploadPfpImageParams{
    sitePfp: File | null;
    userPfp: File | null;
}
export interface updateSiteParams {
    location: string;
    appName: string;
    aboutApp: string;
}

export interface loginCredentialsParams {
    email: string;
    userPassword: string;
}


//PROPS
export interface uploadImagesProps{
    uploadPfpImages: (data: { userPfp: File | null; sitePfp: File | null;}) => Promise<{ success: boolean; error?: string }>;
    error: string;
    successMessage: string;
}
export interface SqlNodeInformationProps {
    connectCreateDB: (data: { host: string; user: string; password: string; dbName: string }) => Promise<void>;
    error: string;
    successMessage: string;
}
export interface UpdateCredentialsProps {
    updateCredentials: (data: { fullName: string; email: string; password: string; }) => Promise<void>;
    error: string;
    successMessage: string;
}

export interface updateSiteInformationProps {
    updateSiteInformation: (data: { location: string; appName: string; aboutApp: string; }) => Promise<void>;
    error: string;
    successMessage: string;
}
export interface ToastProps{
    message: string
    isOpen: boolean; 
    onClose: () => void; 
}
