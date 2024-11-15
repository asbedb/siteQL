// src/app/api/connections/checkInstallation/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const dbName = process.env.DB_NAME;
    const password = process.env.DB_PASSWORD || '';
    const tableName = process.env.DB_TABLE_NAME;
    const customTables = process.env.DB_CUSTOM_TABLE;

    const pendingInstallation: string[] = [];
    if (!host) pendingInstallation.push('Host');
    if (!user) pendingInstallation.push('DB User Name');
    if (!dbName) pendingInstallation.push('DB Name');
    if (!tableName) pendingInstallation.push('Main Application Table');

    const installedVariables: string[] = [];
    if (host) installedVariables.push('Host: ' + host);
    if (user) installedVariables.push('DB User Name: ' + user);
    if (dbName) installedVariables.push('DB Name: ' + dbName);
    if (tableName) installedVariables.push('Main DB Table Name: ' + tableName);
    if (customTables) installedVariables.push('Additional Custom Tables: ' + customTables);

    let connectionStatus = 'DB Connection Unsuccessful, please check DB Variables/Reinstall';
    let connectionErrorMessage = '';
    let connection;

    try {
        connection = await mysql.createConnection({ host, user, password, database: dbName });
        await connection.ping(); // Check if the database is responsive
        console.log('Database connection successful.');
        connectionStatus = `DB Connection to ${dbName} was successful`;
    } catch (error) {
        connectionErrorMessage = error instanceof Error ? error.message : 'Unknown Error';
        connectionStatus = `Database connection failed: ${connectionErrorMessage}`;
    } finally {
        if (connection) {
            await connection.end(); // Ensure the connection is closed
        }
    }

    // Return the response with error messages and uninstalled variables
    const response = {
        status: pendingInstallation.length > 0 ? 'pending' : 'installed',
        message: pendingInstallation.length > 0 
            ? 'Some ENV variables are missing' 
            : 'All necessary ENV variables are set',
        data: {
            pendingInstallation,
            installedVariables
        },
        connectionStatus,
        connectionErrorMessage, // Add the error message if any
    };

    return NextResponse.json(response);
}
