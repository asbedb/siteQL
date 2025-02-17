// src/types/types.ts

//Function Query Returns
export interface QueryResult {
    disablebtn: boolean;
}
export interface FinalInstallCheckQueryResult {
    allChecksPass: boolean;
    codeLines: string[];
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
    uploadPfpImages: (data: { userPfp: File | null; sitePfp: File | null;}) => Promise<QueryResult>;
}

export interface FinalInstallCheckProps {
    finalInstallCheck: () => Promise<FinalInstallCheckQueryResult>;
    setDisableBtn: (state: boolean) => void;
}
export interface SqlNodeInformationProps {
    connectCreateDB: (data: { host: string; user: string; password: string; dbName: string }) => Promise<QueryResult>;
}
export interface UpdateCredentialsProps {
    updateCredentials: (data: { fullName: string; email: string; password: string; }) => Promise<QueryResult>;
}

export interface UpdateSiteInformationProps {
    updateSiteInformation: (data: { location: string; appName: string; aboutApp: string; })=> Promise<QueryResult>;
}
export interface ToastProps{
    message: string
    isOpen: boolean; 
    onClose: () => void; 
}
export interface CustomTableProps {
    createTable: (params: CreateTableParams) => Promise<QueryResult>; // Pass an object as a single argument
}

