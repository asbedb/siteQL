// src/app/api/connections/checkInstallation/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const dbName = process.env.DB_NAME;
    const tableName = process.env.DB_TABLE_NAME;
    const customTables = process.env.DB_CUSTOM_TABLE;

    const pendingInstallation: string[] = []
    if (!host) pendingInstallation.push('Host');
    if (!user) pendingInstallation.push('DB User Name');
    if (!dbName) pendingInstallation.push('DB Name');
    if (!tableName) pendingInstallation.push('Main Application Table');

    const installedVariables: string[] = []
    if (host) installedVariables.push('Host: ' + host);
    if (user) installedVariables.push('DB User Name: ' + user);
    if (dbName) installedVariables.push('DB Name: ' + dbName);
    if (tableName) installedVariables.push('Main DB Table Name: ' + tableName);
    if (customTables) installedVariables.push('Additional Custom Tables: ' + customTables);

    const response = {
        status: pendingInstallation.length > 0 ? 'pending' : 'installed',
        message: pendingInstallation.length > 0 
            ? 'Some installation variables are missing' 
            : 'All necessary installation variables are set',
        data: {
            pendingInstallation,
            installedVariables
        }
    };
    return NextResponse.json(response);
}