// src/app/api/connections/createDatabase/route.ts
import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise'; 
import writeEnvFile from '@/utils/envWriter';

export async function POST(request: NextRequest) {
    const { host, port, user, password, dbName } = await request.json();
    const portNumber = parseInt(port, 10)
    if (isNaN(portNumber)) {
        return NextResponse.json({ message: 'Invalid port number' }, { status: 400 });
    }
    try {
        const connection = await mysql.createConnection({ host,  user, password, port: portNumber });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await connection.query(`USE \`${dbName}\`;`);
        await connection.query(`CREATE TABLE IF NOT EXISTS main (
            user_id INT PRIMARY KEY AUTO_INCREMENT,
            user_email VARCHAR(255) NOT NULL UNIQUE,
            user_password VARCHAR(255) NOT NULL,
            full_name VARCHAR(255),
            location VARCHAR(255),
            app_title VARCHAR(255),
            about_app VARCHAR(255),
            pfp_image VARCHAR(255),
            app_image VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);
        await writeEnvFile({
            DB_HOST: host,
            DB_PORT: port,
            DB_USER: user,
            DB_PASSWORD: password, // Store the hashed password
            DB_NAME: dbName,
            DB_TABLE_NAME: 'main',
        });
        await connection.end(); // Close the connection
        return NextResponse.json({ message: 'Connection Successful Default DB Created!' });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            return NextResponse.json({error: 'Unknown Error'}, { status: 400 });
        }
        
    }
}
