// /Users/dan/code/crude-cards/internal/script/narrative/index.ts

import { Neo4jService } from './neo4jService';
import { Config } from './config';
import { GameLoop } from './gameLoop';

(async () => {
    const uri = Config.ensure('NEO4J_ENDPOINT');
    const password = Config.ensure('NEO4J_PASSWORD');
    const username = 'neo4j';

    const neo4jService = new Neo4jService(uri, username, password);
    const gameLoop = new GameLoop(neo4jService);

    try {
        console.log('Connection to Neo4j established');

        // Start the game loop
        await gameLoop.start();
    } catch (err) {
        console.error(`Connection error\n${err}\nCause:`, err);
        process.exit(1);
    } finally {
        // Ensure Neo4j service is closed
        await gameLoop.end();
        process.exit(0);
    }
})();
