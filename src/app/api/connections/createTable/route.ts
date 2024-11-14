import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise'; 
import writeEnvFile from '../../config/envWriter/route';

export async function POST(request: NextRequest) {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD || '';
    const dbName = process.env.DB_NAME;
    let custom_table = process.env.DB_CUSTOM_TABLE || '';

    if (!host || !user || !dbName) {
        return NextResponse.json({ error: 'Database connection details are missing' }, { status: 400 });
    }

    try {
        const { tableName, columns } = await request.json();
        if (!tableName || !Array.isArray(columns) || columns.length === 0) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        const connection = await mysql.createConnection({ host, user, password });
        await connection.query(`USE \`${dbName}\`;`);

        // Drop table if it exists
        await connection.query(`DROP TABLE IF EXISTS \`${tableName}\`;`);

        // Define columns
        const columnDefinitions = columns
            .map(column => `\`${column.name}\` ${column.type}`)
            .join(",\n");

        // Create table
        const query = `
            CREATE TABLE IF NOT EXISTS \`${tableName}\` (
                ${columnDefinitions}
            );
        `;
        custom_table = custom_table
            ? `${custom_table},${tableName}` // Append if custom_table is not empty
            : tableName;
            
        await connection.query(query);
        await writeEnvFile({
            DB_CUSTOM_TABLE: custom_table
        });
        await connection.end(); // Close the connection
        return NextResponse.json({ message: 'Table created successfully!' });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'Unknown Error' }, { status: 400 });
        }
    }
}
