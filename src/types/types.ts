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
    sitePfp: string;
    userPfp: string;
}
export interface updateSiteParams {
    location: string;
    appName: string;
    aboutApp: string;
}

//PROPS
export interface uploadImagesProps{
    uploadPfpImages: (data: { userPfp: string; sitePfp: string;}) => Promise<void>;
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
