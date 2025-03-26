import { ActionRegistry } from './actionRegistry';
import { BaseActionHandler } from './actions/BaseActionHandler';
import * as path from 'path';

export async function loadNewAction(actionName: string) {

    const actionPath = path.join(__dirname, 'actions', `${actionName}`);

    try {
        const actionModule = await import(actionPath);

        Object.values(actionModule).forEach((exported: unknown) => {

            if (typeof exported === 'function' && exported.prototype instanceof BaseActionHandler) {

                const actionInstance = new (exported as { new (): BaseActionHandler })();

                ActionRegistry.registerAction(actionInstance);

                console.log(`New action "${actionName}" registered successfully.`);
            }
        });
    } catch (error) {
        console.error(`Failed to load or register new action: ${actionName}`, error);
    }
}
