import { MenuManager } from "./menuManager";
import { Neo4jService } from "./neo4jService";


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
            if (selectedAction) {
                const params = await MenuManager.promptForParams(selectedAction);
                await selectedAction.execute(this.neo4jService, params);

                if (selectedAction.id === 'exit')
                    this.isGameActive = false;
            }
        }
    }

    public async end() {
        await this.neo4jService.close();

        console.log('Session and driver closed.');
    }
}
