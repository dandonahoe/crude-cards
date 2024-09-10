export enum MenuAction {
    ContinueDescription = 'ContinueDescription',
    DeleteDatabase      = 'DeleteDatabase',
    ListDatabase        = 'ListDatabase',
    CreateEntity        = 'CreateEntity',
    StartAdventure      = 'StartAdventure', // New action
    Exit                = 'Exit',
}

export interface ActionResult {
    success: boolean;
    message: string;
}
