// /Users/dan/code/crude-cards/internal/script/narrative/actionTypes.ts

export enum MenuAction {
    DeleteDatabase = 'deleteDatabase',
    ListDatabase = 'listDatabase',
    ContinueGame = 'continueGame',
    CreateRandomPerson = 'createRandomPerson',
    Exit = 'exit',
}

export interface ActionResult {
    success: boolean;
    message: string;
}
