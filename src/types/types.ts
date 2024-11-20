// src/types/types.ts

//Function Query Returns
export interface QueryResult {
    disablebtn: boolean;
}

//PARAMS
export interface CreateTableParams {
    tableName: string;
    columns: { name: string; type: string }[];
}

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
export interface UploadPfpImageParams{
    sitePfp: File | null;
    userPfp: File | null;
}
export interface UpdateSiteParams {
    location: string;
    appName: string;
    aboutApp: string;
}

export interface LoginCredentialsParams {
    email: string;
    userPassword: string;
}

export interface ShowToastParams{
    message: string;
}

//PROPS
export interface UploadImagesProps{
    uploadPfpImages: (data: { userPfp: File | null; sitePfp: File | null;}) => Promise<{ success: boolean; error?: string }>;
}
export interface SqlNodeInformationProps {
    connectCreateDB: (data: { host: string; user: string; password: string; dbName: string }) => Promise<QueryResult>;
}
export interface UpdateCredentialsProps {
    updateCredentials: (data: { fullName: string; email: string; password: string; }) => Promise<void>;
}

export interface UpdateSiteInformationProps {
    updateSiteInformation: (data: { location: string; appName: string; aboutApp: string; }) => Promise<void>;
}
export interface ToastProps{
    message: string
    isOpen: boolean; 
    onClose: () => void; 
}
export interface CustomTableProps {
    createTable: (params: CreateTableParams) => Promise<void>; // Pass an object as a single argument
}