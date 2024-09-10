import { BaseActionHandler } from './actions/BaseActionHandler';

export class ActionRegistry {
    private static actions: Record<string, BaseActionHandler> = {};

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
}
