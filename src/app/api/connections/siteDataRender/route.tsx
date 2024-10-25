// src/app/api/connections/siteDataRender/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

interface User {
    user_email: string;
    full_name: string;
    location: string;
    app_title: string;
    about_app: string;
    pfp_image: string;
    app_image: string;
}

export async function GET() {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD || '';
    const dbName = process.env.DB_NAME;
    const tableName = process.env.DB_TABLE_NAME;
    // Check for missing environment variables
    if (!host || !user || !dbName || !tableName) {
        return NextResponse.json({ error: 'Database connection details are missing' }, { status: 400 });
    }
    let connection;
    try {
        connection = await mysql.createConnection({ host, user, password, database: dbName });
        const query = `
            SELECT user_email, full_name, location, app_title, about_app, pfp_image, app_image 
            FROM \`${tableName}\` 
            WHERE user_id = ?`;
        // Use the correct typing for the query result
        const [rows]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.query(query, [1]);
        // Check if rows is empty
        if (rows.length === 0) {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }
        const userData: User = rows[0] as User; // Explicitly cast the first row to User
        return NextResponse.json(userData, { status: 200 });
        
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'Unknown Error' }, { status: 400 });
        }
    } finally {
        if (connection) {
            await connection.end(); // Ensure the connection is closed
        }
    }
}
