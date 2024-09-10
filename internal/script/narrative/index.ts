import { ActionRegistry } from './actionRegistry';
import { Neo4jService } from './neo4jService';
import { GameLoop } from './gameLoop';
import { Config } from './config';

(async () => {
    const uri = Config.ensure('NEO4J_ENDPOINT');
    const password = Config.ensure('NEO4J_PASSWORD');
    const username = 'neo4j';

    const neo4jService = new Neo4jService(uri, username, password);

    try {
        // Load all action handlers dynamically
        await ActionRegistry.loadActions();

        console.log('Connection to Neo4j established');

        const gameLoop = new GameLoop(neo4jService);
        await gameLoop.start();
    } catch (err) {
        console.error(`Connection error\n${err}\nCause:`, err);
        process.exit(1);
    } finally {
        await neo4jService.close();
        process.exit(0);
    }
})();
