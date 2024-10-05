import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Function to execute a shell command and return the output as a string
function execCommand(command: string): string {
    try {
        return execSync(command, { encoding : 'utf-8' });
    } catch (error) {
        console.error(`Error executing command: ${command}`);
        console.error(error);
        process.exit(1);
    }
}

// Function to parse the output of `gh secret list` and extract secret names
function parseSecretNames(output: string): string[] {
    const lines = output.trim().split('\n');
    const secretNames: string[] = [];

    for (const line of lines.slice(1)) { // Skip the first line (header)
        const [name] = line.trim().split(/\s+/); // Split by whitespace and take the first part as the secret name
        if (name)
            secretNames.push(name);

    }

    return secretNames;
}

// Function to write placeholders for secrets to a .env file
function writeEnvFile(secretNames: string[], filePath: string): void {
    const envContent = secretNames
        .map(key => `${key}=YOUR_SECRET_VALUE`)
        .join('\n');

    fs.writeFileSync(filePath, envContent, { encoding : 'utf-8' });
    console.log(`Environment variables saved to ${filePath}`);
}

// Main function
function main() {
    // Path to the .env file
    const envFilePath = path.resolve(__dirname, '.env.remote-dev');

    // Get the list of secrets
    const ghSecretsOutput = execCommand('gh secret list --env Development');

    // Parse the secret names
    const secretNames = parseSecretNames(ghSecretsOutput);

    // Write placeholders for secrets to the .env file
    writeEnvFile(secretNames, envFilePath);
}

// Run the script
main();
