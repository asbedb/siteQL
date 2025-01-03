// src/app/api/connections/login/route.ts
import { NextResponse, NextRequest } from 'next/server';
import mysql, {RowDataPacket} from 'mysql2/promise'; 
import bcrypt from 'bcrypt'

interface User {
    user_email: string;
    full_name: string;
    location: string;
    app_title: string;
    about_app: string;
    pfp_image: string;
    app_image: string;
    user_password: string;
}


export async function POST(request: NextRequest) {
    const { email, userPassword}:  { email: string; userPassword: string } = await request.json();
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

        // Query user by email
        const query = `SELECT user_email, user_password, full_name, location, app_title, about_app, pfp_image, app_image
                        FROM \`${tableName}\`
                        WHERE user_email = ?`;
        const [rows] = await connection.query<RowDataPacket[]>(query, [email]);

        // Ensure rows can be mapped to User
        if (rows.length === 0) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const userRecord = rows[0] as User; // Explicit cast to User

        // Validate password
        const isPasswordValid = await bcrypt.compare(userPassword, userRecord.user_password); // Compare with user_password
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Exclude user_password from response
        const userData = Object.fromEntries(
            Object.entries(userRecord).filter(([key]) => key !== 'user_password')
        );

        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
