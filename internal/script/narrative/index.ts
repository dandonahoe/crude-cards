import { ActionRegistry } from './actionRegistry';
import { OpenAIService } from './OpenAIService';
import { Neo4jService } from './neo4jService';
import { GameLoop } from './gameLoop';
import { Config } from './config';

(async () => {
    OpenAIService.initialize();

    const uri      = Config.ensure('NEO4J_ENDPOINT');
    const password = Config.ensure('NEO4J_PASSWORD');
    const username = 'neo4j';

    const neo4jService = new Neo4jService(uri, username, password);

    try {
        // Load all action handlers dynamically
        await ActionRegistry.loadActions();

        const gameLoop = new GameLoop(neo4jService);

        // Start the game loop
        await gameLoop.start();
    } catch (err) {
        console.error(`Connection error\n${err}\nCause:`, err);
        process.exit(1);
    } finally {
        await neo4jService.close();
        process.exit(0);
    }
})();
