import { selectMenuChoice } from './selectMenuChoice';
import { Neo4jService } from './neo4jService';
import { GeoUtils } from './geoUtils';
import { Config } from './config';

(async () => {

    const uri      = Config.ensure('NEO4J_ENDPOINT');
    const password = Config.ensure('NEO4J_PASSWORD');
    const username = 'neo4j';

    const neo4jService = new Neo4jService(uri, username, password);

    try {
        console.log('Connection established');

        let isGameActive = true;

        while (isGameActive) {
            const choice = await selectMenuChoice();

            switch (choice) {
                case 'create': {
                    const name = `Person_${new Date().toISOString()}`;
                    const alignment = 'Evil';
                    const createdAt = new Date().toISOString();
                    const { latitude, longitude } = GeoUtils.getRandomCoordinates();

                    const location = await GeoUtils.getLocationDetails(latitude, longitude);

                    if (location)
                        console.log(`Location: ${location.formatted}`);
                    else
                        console.log('Location details could not be fetched.');

                    const nodeProperties = await neo4jService.createPersonNode(name, alignment, createdAt, latitude, longitude, location);
                    console.log('Node created:', nodeProperties);
                } break;

                case 'query': {
                    const personsAndDistances = await neo4jService.queryAllPersonsAndDistances('', 0, 0); // Adjust parameters as needed

                    console.log('All Person nodes and their distances:');

                    personsAndDistances.forEach(({ personNode, distanceInMeters, distanceInMiles }) => {
                        console.log(personNode.name, `Distance: ${distanceInMeters} meters (${distanceInMiles.toFixed(2)} miles)`);
                    });
                } break;

                case 'exit':
                    isGameActive = false;
                    break;

                default:
                    console.log('Invalid choice');
            }
        }
    } catch (err) {
        console.error(`Connection error\n${err}\nCause:`, err);
        process.exit(1);
    } finally {
        await neo4jService.close();
        console.log('Session and driver closed');
        process.exit(0);
    }
})();
