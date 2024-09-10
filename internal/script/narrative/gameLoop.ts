// /Users/dan/code/crude-cards/internal/script/narrative/gameLoop.ts

import { Neo4jService } from './neo4jService';
import { MenuManager } from './menuManager';

export class GameLoop {
    private neo4jService: Neo4jService;
    private isGameActive: boolean;

    public constructor(neo4jService: Neo4jService) {
        this.neo4jService = neo4jService;
        this.isGameActive = true;
    }

    public async start() {
        while (this.isGameActive) {
            const selectedAction = await MenuManager.promptMenuChoice();
            const handler = MenuManager.getHandler(selectedAction);

            if (handler)
                await handler(this.neo4jService);


            if (selectedAction === 'exit')
                this.isGameActive = false;

        }
    }

    public async end() {
        await this.neo4jService.close();
        console.log('Session and driver closed');
    }
}
