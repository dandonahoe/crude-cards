import { BaseActionHandler } from './actions/BaseActionHandler';
import * as fs from 'fs';
import * as path from 'path';

export class ActionRegistry {
    public static actions: Record<string, BaseActionHandler> = {};

    // Register an action
    public static registerAction(action: BaseActionHandler) {
        if (ActionRegistry.actions[action.id])
            throw new Error(`Action with ID "${action.id}" already registered`);

        ActionRegistry.actions[action.id] = action;
    }

    // Get an action by its ID
    public static getAction(id: string): BaseActionHandler | undefined {
        return ActionRegistry.actions[id];
    }

    // Get all registered actions
    public static getAllActions(): BaseActionHandler[] {
        return Object.values(ActionRegistry.actions);
    }

    // Dynamically load all action handlers from the actions directory
    public static async loadActions() {
        const actionsDir = path.join(__dirname, 'actions');
        const files = fs.readdirSync(actionsDir);

        for (const file of files)
            if (file.endsWith('.ts') || file.endsWith('.js')) {
                const actionModule = await import(path.join(actionsDir, file));

                // Iterate over all exports and register the action handlers
                Object.values(actionModule).forEach((exported: unknown) => {
                    if (typeof exported === 'function' && exported.prototype instanceof BaseActionHandler) {
                        const actionInstance = new (exported as { new (): BaseActionHandler })();

                        // Only register actions that are not already registered
                        if (!ActionRegistry.actions[actionInstance.id])
                            ActionRegistry.registerAction(actionInstance);

                    }
                });
            }

    }
}
