import { promises as fs } from 'fs';
import path from 'path';

interface KeyValue {
    [key: string]: string;
}

const writeEnvFile = async (keyValues: KeyValue) => {
    const envFilePath = path.join(process.cwd(), '.env'); // Path to the .env file in the project root
    let existingEnvContent: KeyValue = {};
    try {
        // Read existing .env file content if it exists
        const fileContent = await fs.readFile(envFilePath, 'utf-8');
        existingEnvContent = fileContent.split('\n').reduce((acc, line) => {
            const [key, value] = line.split('=');
            if (key) acc[key] = value || ''; 
            return acc;
        }, {} as KeyValue);
    } catch (err) {
        if (err instanceof Error) {
            return console.log(err.message)
        } else {
            return console.log('Unknown Error');
        }
    }
    const updatedEnvContent = { ...existingEnvContent, ...keyValues };
    const envContent = Object.entries(updatedEnvContent)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    try {
        // Write merged content to the .env file
        await fs.writeFile(envFilePath, envContent, { flag: 'w' });
        console.log('.env file updated successfully.');
    } catch (err) {
        console.error('Error writing to .env file:', err);
    }
};
export default writeEnvFile;
