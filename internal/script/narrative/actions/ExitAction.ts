import { BaseActionHandler } from './BaseActionHandler';

// Exit Action
export class ExitAction extends BaseActionHandler {

    public id = 'exit';
    public name = 'Exit Game';
    public description = 'Exit the game loop';

    public async execute(): Promise<void> {
        console.log('Exiting the game.');
    }
}
