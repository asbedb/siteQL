// src/app/api/connections/login/route.ts
import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise'; 
import writeEnvFile from '../../config/envWriter/route';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
    const { email, userPassword} = await request.json();
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
        const [rows]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.query(query, [1]);
        // Check if rows is empty
        if (rows.length === 0) {
            return NextResponse.json({ error: 'Incorrect Username/Password' }, { status: 404 });
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
