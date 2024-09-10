import * as dotenv from 'dotenv';
import neo4j from 'neo4j-driver';


dotenv.config();


if(!process.env.NEO4J_PASSWORD) {
    console.error('Please provide the password for the Neo4j database using the environment variable NEO4J_PASSWORD')
    process.exit(1)
}

if(!process.env.NEO4J_ENDPOINT) {
    console.error('Please provide the endpoint for the Neo4j database using the environment variable NEO4J_ENDPOINT')
    process.exit(1)
}


(async (uri : string, password : string) => {
    // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
    // const uri = `neo4j://${process.env.NEO4J_ENDPOINT}`
    const username = 'neo4j'
    // const password = process.env.NEO4J_PASSWORD || ['INVALID_PASSWORD'];

    let driver

    try {
        driver = neo4j.driver(`neo4j://${uri}`, neo4j.auth.basic(username, password));

        const serverInfo = await driver.getServerInfo();

        console.log('Connection established')
        console.log(serverInfo);

        console.log('Closing connection')
        driver.close()

        console.log('And its closed')

        process.exit(0)
    } catch (err) {
        console.log(`Connection error\n${err}\nCause:`, err)
    }
})(process.env.NEO4J_ENDPOINT, process.env.NEO4J_PASSWORD);

