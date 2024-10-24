
// src/app/api/connections/updateCredentials/route.ts
import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise'; 
import bcrypt from 'bcrypt';

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
        const { fullName, userEmail, userPassword } = await request.json();
        console.log(fullName, userEmail, userPassword)
        if (!fullName || !userEmail || !userPassword) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }
        const connection = await mysql.createConnection({ host, user, password });
        await connection.query(`USE \`${dbName}\`;`);
        
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const query = `
            INSERT INTO \`${tableName}\` (full_name, user_email, user_password) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE 
                full_name = VALUES(full_name), 
                user_email = VALUES(user_email), 
                user_password = VALUES(user_password);
        `;
        
        await connection.query(query, [fullName, userEmail, hashedPassword]);
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