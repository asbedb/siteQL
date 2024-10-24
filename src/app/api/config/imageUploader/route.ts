// src/app/api/config/imageUploader/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
        // Check if the request contains a file
        const formData = await request.formData();
        const file = formData.get('file'); // Make sure to use the correct field name
        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }
        const buffer = await file.arrayBuffer();
        const fileName = file.name;
        const uploadDir = path.join(process.cwd(), 'public/pfp');
        // Ensure the uploads directory exists
        await fs.mkdir(uploadDir, { recursive: true });
        // Write the file to the uploads directory
        await fs.writeFile(path.join(uploadDir, fileName), Buffer.from(buffer));
        return NextResponse.json({ message: 'File uploaded successfully', fileName }, { status: 200 });
};