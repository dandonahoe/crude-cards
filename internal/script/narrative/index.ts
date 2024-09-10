import * as dotenv from 'dotenv';
import neo4j from 'neo4j-driver';

dotenv.config();

if (!process.env.NEO4J_PASSWORD) {
    console.error('Please provide the password for the Neo4j database using the environment variable NEO4J_PASSWORD');
    process.exit(1);
}

if (!process.env.NEO4J_ENDPOINT) {
    console.error('Please provide the endpoint for the Neo4j database using the environment variable NEO4J_ENDPOINT');
    process.exit(1);
}

(async (uri: string, password: string) => {
    const username = 'neo4j';

    try {
        debugger;

        const driver = neo4j.driver(`neo4j://${uri}`, neo4j.auth.basic(username, password));

        // Verify connection
        // await driver.verifyConnectivity();
        console.log('Connection established');

        const session = driver.session();

        // Create a unique name for each run
        const name = `Person_${new Date().toISOString()}`;

        // Insert a node with label "Person" and properties "name" and "timestamp"
        const result = await session.run(
            'CREATE (p:Person {name: $name, timestamp: $timestamp}) RETURN p',
            {
                name,
                timestamp : new Date().toISOString(),
            },
        );

        // Log the created node
        const singleRecord = result.records[0];
        const node = singleRecord.get(0);

        console.log('Node created:', node.properties);

        // Close the session
        await session.close();

        // Close the driver
        await driver.close();
        console.log('Connection closed');

        process.exit(0);
    } catch (err) {
        console.error(`Connection error\n${err}\nCause:`, err);
        process.exit(1);
    }
})(process.env.NEO4J_ENDPOINT, process.env.NEO4J_PASSWORD);
