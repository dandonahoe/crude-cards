import { BaseActionHandler } from './BaseActionHandler';

// Exit Action
export class ExitAction extends BaseActionHandler {

    public id = 'exit';
    public name = 'Exit Game';
    public description = 'Exit the game loop';

    public override isRequired = true; // Exit action is required and can't be deleted

    public async execute(): Promise<void> {
        console.log('Exiting the game.');
    }
}
