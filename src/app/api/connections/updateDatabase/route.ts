
// src/app/api/connections/updateDatabase/route.ts
import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise'; 

export async function POST(request: NextRequest) {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD || '';
    const dbName = process.env.DB_NAME;
    const tableName = process.env.DB_TABLE_NAME;
    console.log(host, user, password, dbName, tableName);
    if (!host || !user || !dbName || !tableName) {
        return NextResponse.json({ error: 'Database connection details are missing' }, { status: 400 });
    }
    try {
        const { location, appName, aboutApp } = await request.json();
        console.log(location, appName, aboutApp)
        const connection = await mysql.createConnection({ host, user, password });
        await connection.query(`USE \`${dbName}\`;`);
        const query = `
            INSERT INTO \`${tableName}\` (user_id, location, app_title, about_app) 
            VALUES (1, ?, ?, ?) 
            ON DUPLICATE KEY UPDATE 
                location = VALUES(location), 
                app_title = VALUES(app_title), 
                about_app = VALUES(about_app);
        `;
        
        await connection.query(query, [location, appName, aboutApp]);
        await connection.end(); // Close the connection
        
        return NextResponse.json({ message: 'Data inserted successfully!' });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            return NextResponse.json({error: 'Unknown Error'}, { status: 400 });
        }
        
    }
}