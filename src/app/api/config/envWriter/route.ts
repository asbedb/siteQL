import { promises as fs } from 'fs';
import path from 'path';

interface KeyValue {
    [key: string]: string;
}

const writeEnvFile = async (keyValues: KeyValue) => {
    const envFilePath = path.join(process.cwd(), '.env'); // Save in the project root

    console.log(`Writing to: ${envFilePath}`); // Log the path

    // Convert key-values object to string format
    const envContent = Object.entries(keyValues)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    try {
        // Write to .env file
        await fs.writeFile(envFilePath, envContent, { flag: 'w' });
        console.log('.env file saved successfully.');
    } catch (err) {
        console.error('Error writing to .env file:', err);
    }
};

export default writeEnvFile;
