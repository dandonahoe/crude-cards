import { DeleteDatabaseAction } from './DeleteDatabaseAction';
import { ContinueGameAction } from './ContinueGameAction';
import { ListDatabaseAction } from './ListDatabaseAction';
import { ActionRegistry } from './actionRegistry';
import { Neo4jService } from './neo4jService';
import { ExitAction } from './ExitAction';
import { GameLoop } from './gameLoop';
import { Config } from './config';

(async () => {

    const uri      = Config.ensure('NEO4J_ENDPOINT');
    const password = Config.ensure('NEO4J_PASSWORD');
    const username = 'neo4j';

    const neo4jService = new Neo4jService(uri, username, password);

    // Register actions dynamically
    ActionRegistry.registerAction(new DeleteDatabaseAction());
    ActionRegistry.registerAction(new ListDatabaseAction());
    ActionRegistry.registerAction(new ContinueGameAction());
    ActionRegistry.registerAction(new ExitAction());

    const gameLoop = new GameLoop(neo4jService);

    try {
        console.log('Connection to Neo4j established');

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
        // Ensure Neo4j service is closed
