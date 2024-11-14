
// src/app/api/connections/checkInstallation/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const dbName = process.env.DB_NAME;
    const tableName = process.env.DB_TABLE_NAME;
    const pendingInstallation: string[] = []
    if (!host) pendingInstallation.push('host');
    if (!user) pendingInstallation.push('user');
    if (!dbName) pendingInstallation.push('dbName');
    if (!tableName) pendingInstallation.push('tableName');

    if (pendingInstallation.length > 0) {
        return NextResponse.json({ error: `Variables Pending Installation: ${pendingInstallation.join(', ')}` }, { status: 400 });
    }
}