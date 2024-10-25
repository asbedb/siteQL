// src/app/api/config/imageUploader/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import mysql, { Connection } from 'mysql2/promise';

type UploadedFile = File | null;

interface FileNames {
    sitePfp: string | null;
    userPfp: string | null;
    regularImage: string | null;
}

const handleFileUpload = async (file: UploadedFile, folder: string): Promise<string> => {
    if (!file || !(file instanceof Blob)) {
        throw new Error('No file uploaded');
    }
    const originalFileName = file.name;
    const buffer = await file.arrayBuffer();
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    const extension = path.extname(originalFileName).slice(1);
    const fileName = `${timestamp}-${randomNum}.${extension}`; // Fixed extension format
    // Write the file to the appropriate directory
    await fs.writeFile(path.join(folder, fileName), Buffer.from(buffer));
    return fileName; // Return the new file name for database insertion
};

const insertFileNameToDatabase = async (connection: Connection, tableName: string, userId: number, fileName: string, column: string) => {
    const query = `
        INSERT INTO \`${tableName}\` (user_id, ${column}) 
        VALUES (?, ?) 
        ON DUPLICATE KEY UPDATE 
            ${column} = VALUES(${column})
    `;
    await connection.query(query, [userId, fileName]);
};

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const sitePfpFile: UploadedFile = formData.get('sitePfp') as UploadedFile;
    const userPfpFile: UploadedFile = formData.get('userPfp') as UploadedFile;
    const regularImageFile: UploadedFile = formData.get('regularImage') as UploadedFile;

    const uploadDir = path.join(process.cwd(), 'public/');
    const regularImagesDir = path.join(uploadDir, 'img/uploads'); // Make sure this directory is also created

    // Create directories if they don't exist
    await fs.mkdir(regularImagesDir, { recursive: true });

    // Determine the pfpDir based on which files are uploaded
    let pfpDir: string;
    if (sitePfpFile) {
        pfpDir = path.join(uploadDir, 'img/sitepfp');
        await fs.mkdir(pfpDir, { recursive: true });
    }
    if (userPfpFile) {
        pfpDir = path.join(uploadDir, 'img/userpfp');
        await fs.mkdir(pfpDir, { recursive: true });
    }
    if (!sitePfpFile && !userPfpFile) {
        pfpDir = path.join(uploadDir, 'img/upload');
        await fs.mkdir(pfpDir, { recursive: true });
    }

    const fileNames: FileNames = {
        sitePfp: null,
        userPfp: null,
        regularImage: null,
    };

    try {
        const host = process.env.DB_HOST;
        const user = process.env.DB_USER;
        const password = process.env.DB_PASSWORD || '';
        const dbName = process.env.DB_NAME;
        const tableName = process.env.DB_TABLE_NAME;
        const connection = await mysql.createConnection({ host, user, password, database: dbName });

        if (!tableName) {
            throw new Error('Database table name is not defined');
        }

        // Upload site profile picture
        if (sitePfpFile) {
            fileNames.sitePfp = await handleFileUpload(sitePfpFile, path.join(uploadDir, 'img/sitepfp'));
            await insertFileNameToDatabase(connection, tableName, 1, fileNames.sitePfp, 'app_image');
        }

        // Upload user profile picture
        if (userPfpFile) {
            fileNames.userPfp = await handleFileUpload(userPfpFile, path.join(uploadDir, 'img/userpfp'));
            await insertFileNameToDatabase(connection, tableName, 1, fileNames.userPfp, 'pfp_image');
        }

        // Upload regular image
        if (regularImageFile) {
            fileNames.regularImage = await handleFileUpload(regularImageFile, regularImagesDir);
            // Insert logic for regular image if needed
        }

        await connection.end(); // Close the connection
        return NextResponse.json({ message: 'Files uploaded successfully', fileNames }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 400 });
    }
}
