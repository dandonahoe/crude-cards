import * as fs from 'fs';
import * as path from 'path';

// Utility function to sanitize action names
export function sanitizeActionName(actionName: string): string {
    return actionName.replace(/[^a-zA-Z0-9]/g, ''); // Remove any non-alphanumeric characters
}

// Function to write a new action file
export function writeNewActionFile(actionName: string) {
    // Sanitize the action name for class and file naming
    const sanitizedActionName = sanitizeActionName(actionName);

    const actionTemplate = `
import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { Neo4jService } from '../neo4jService';

export class ${sanitizedActionName} extends BaseActionHandler {
    public id = '${sanitizedActionName.toLowerCase()}';
    public name = '${actionName}';
    public description = 'A dynamically generated action.';

    public async execute(neo4jService: Neo4jService, params: ActionParams = {}): Promise<void> {
        console.log('Action Name:', '${actionName}');
    }
}
`;

    // Use sanitized action name for the file name
    const actionPath = path.join(__dirname, 'actions', `${sanitizedActionName}.ts`);

    fs.writeFileSync(actionPath, actionTemplate, 'utf8');
    console.log(`Action "${sanitizedActionName}" has been written to ${actionPath}`);
}