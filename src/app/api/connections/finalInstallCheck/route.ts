// src/app/api/connections/finalInstallCheck/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import writeEnvFile from '@/utils/envWriter';

//global variable for allChecksPassed
let allChecksPass: boolean = false;

type CheckResult = {
    check: string;
    status: 'pass' | 'fail';
    message: string;
};

// Export GET handler
export async function GET() {
    return handleGet();
}

// Export POST handler
export async function POST() {
    return handlePost();
}

async function handleGet() {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const dbName = process.env.DB_NAME;
    const password = process.env.DB_PASSWORD || '';
    const tableName = process.env.DB_TABLE_NAME;
    const customTables = process.env.DB_CUSTOM_TABLE?.split(',').map((table) => table.trim()); // Split and trim customTables

    if (!host || !user || !dbName || !tableName) {
        return NextResponse.json({
            status: 'error',
            message: 'Missing required environment variables.',
            details: { host, user, dbName, tableName },
        }, {status: 400});
    }

    const results: CheckResult[] = [];
    let connection;
    let connectionStatus = '🟢 Connection successful.';


    try {
        // Test database connection
        connection = await mysql.createConnection({ host, user, password });
        await connection.ping();
        results.push({ check: 'Database Connection', status: 'pass', message: 'Connected successfully.' });
        // Check if database exists
        const [dbCheck] = await connection.execute(
            `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
            [dbName]
        );
        if (Array.isArray(dbCheck) && dbCheck.length > 0) {
            results.push({ check: `Database '${dbName}'`, status: 'pass', message: 'Database exists.' });
        } else {
            results.push({ check: `Database '${dbName}'`, status: 'fail', message: 'Database does not exist.' });
        }
        // Check if main table exists
        const [mainTableCheck] = await connection.execute(
            `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
            [dbName, tableName]
        );
        if (Array.isArray(mainTableCheck) && mainTableCheck.length > 0) {
            results.push({ check: `Main Table '${tableName}'`, status: 'pass', message: 'Table exists.' });
        } else {
            results.push({ check: `Main Table '${tableName}'`, status: 'fail', message: 'Table does not exist.' });
        }
        // Check each custom table
        if (customTables && customTables.length > 0) {
            for (const customTable of customTables) {
                const [customTableCheck] = await connection.execute(
                    `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
                    [dbName, customTable]
                );
                if (Array.isArray(customTableCheck) && customTableCheck.length > 0) {
                    results.push({ check: `Custom Table '${customTable}'`, status: 'pass', message: 'Table exists.' });
                } else {
                    results.push({ check: `Custom Table '${customTable}'`, status: 'fail', message: 'Table does not exist.' });
                }
            }
        }
        allChecksPass = results.every((result) => result.status === 'pass'); // Check if all status are 'pass'
        // Return results based on checks
        return NextResponse.json({
            allChecksPass,
            codeLines: results.map(result => result.check + ' ' +  result.status + ' ' + result.message),
            message: allChecksPass
                ? 'All checks passed successfully!'
                : 'Some checks failed. Please review the details.',
        });

    } catch (error) {
        // Connection failed, set the status
        connectionStatus = `🔴 Connection failed: ${(error as Error).message}`;
        results.push({ check: 'Database Connection', status: 'fail', message: connectionStatus });
        // Return failure response
        return NextResponse.json({
            status: 'error',
            codeLines: results.map(result => result.message + error),
            message: 'Some checks failed. Please review the details.',
        });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

async function handlePost() {
    if (allChecksPass) {
        await writeEnvFile({
            APPLICATION_INSTALLED: 'true'
        })
        return NextResponse.json({
            message: "Installation successful! All checks passed.",
            status: "success",
        });
    } 
    return NextResponse.json({
        message: "Installation failed. Some checks did not pass.",
        status: "error",
    });
} 
