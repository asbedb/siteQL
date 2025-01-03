// src/app/api/connections/sqlServicePing/route.ts
import { NextResponse } from 'next/server';
import net from 'net';

export async function GET():  Promise<Response> {
    const host = process.env.DB_HOST as string; // ENV Var for Host
    const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306; // ENV Var or Default port
    const socket = new net.Socket();
    const timeout = 2000; 
    return new Promise((resolve) => {
        // Try to connect to the server
        socket.setTimeout(timeout);
        socket.on('connect', () => {
            // If connected, server is up
            socket.destroy();
            resolve(NextResponse.json({ isRunning: true }));
        });
        socket.on('timeout', () => {
            // If a timeout occurs, assume server is down
            socket.destroy();
            resolve(NextResponse.json({ isRunning: false }));
        });
        socket.on('error', (error) => {
            // If an error occurs, assume server is down
            console.error('Connection error:', error);
            socket.destroy();
            resolve(NextResponse.json({ isRunning: false }));
        });

        // Attempt to connect to the specified host and port
        socket.connect(port, host);
    });
}
