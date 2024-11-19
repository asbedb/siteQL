import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise'; 
import writeEnvFile from '../../config/envWriter/route';

async function getConnection() {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD || '';
    const dbName = process.env.DB_NAME;

    if (!host || !user || !dbName) {
        throw new Error('Database connection details are missing');
    }

    return await mysql.createConnection({ host, user, password });
}

async function updateCustomTable(tableName: string) {
    let customTable = process.env.DB_CUSTOM_TABLE || '';
    const tableList = customTable ? customTable.split(',') : [];

    if (!tableList.includes(tableName)) {
        customTable = customTable ? `${customTable},${tableName}` : tableName;
        await writeEnvFile({
            DB_CUSTOM_TABLE: customTable
        });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { tableName, columns } = await request.json();

        if (!tableName || !Array.isArray(columns) || columns.length === 0) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        const connection = await getConnection();
        await connection.query(`USE \`${process.env.DB_NAME}\`;`);

        // Drop table if it exists
        await connection.query(`DROP TABLE IF EXISTS \`${tableName}\`;`);

        // Define columns for table creation
        const columnDefinitions = columns
            .map((column: { name: string; type: string }) => `\`${column.name}\` ${column.type}`)
            .join(",\n");

        const query = `
            CREATE TABLE IF NOT EXISTS \`${tableName}\` (
                ${columnDefinitions}
            );
        `;
        
        // Ensure custom_table is updated in .env
        await updateCustomTable(tableName);
        
        // Execute the table creation query
        await connection.query(query);

        await connection.end(); // Ensure connection is closed
        
        return NextResponse.json({ message: 'Table created successfully!' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}
