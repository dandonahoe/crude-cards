import * as dotenv from 'dotenv';
import neo4j, { Driver, Session } from 'neo4j-driver';
import { geocode } from 'opencage-api-client';
import inquirer from 'inquirer';

dotenv.config();

class Config {
    public static get(key: string): string | undefined {
        return process.env[key];
    }

    public static ensure(key: string): string {
        const value = this.get(key);
        if (!value) {
            console.error(`Please provide the ${key} using the environment variable ${key}`);
            process.exit(1);
        }

        return value;
    }
}

class GeoUtils {
    public static getRandomCoordinates() {
        const minLat = -90.0;
        const maxLat = 90.0;
        const minLon = -180.0;
        const maxLon = 180.0;

        const latitude = Math.random() * (maxLat - minLat) + minLat;
        const longitude = Math.random() * (maxLon - minLon) + minLon;

        return { latitude, longitude };
    }

    public static async getLocationDetails(latitude: number, longitude: number) {
        try {
            const apiKey = Config.ensure('OPENCAGE_API_KEY');
            const response = await geocode({
                q   : `${latitude},${longitude}`,
                key : apiKey,
            });

            if (response.results.length > 0) {
                const result = response.results[0];
                const components = result.components;

                return {
                    planet    : components.planet || '',
                    continent : components.continent || '',
                    country   : components.country || '',
                    region    : components.state || components.province || components.region || '',
                    formatted : result.formatted,
                };
            } else {
                throw new Error('No results found');
            }
        } catch (error) {
            console.error('Error fetching location details:', error);

            return null;
        }
    }
}

class Neo4jService {
    private driver: Driver;
    private session: Session;

    public constructor(uri: string, username: string, password: string) {
        this.driver = neo4j.driver(`neo4j://${uri}`, neo4j.auth.basic(username, password));
        this.session = this.driver.session();
    }

    public async createPersonNode(name: string, alignment: string, createdAt: string, latitude: number, longitude: number, location: any) {
        const result = await this.session.run(
            `CREATE (
                p:Person {
                    name      : $name,
                    alignment : $alignment,
                    createdAt : $createdAt,
                    latitude  : $latitude,
                    longitude : $longitude,
                    planet    : $planet,
                    continent : $continent,
                    country   : $country,
                    region    : $region
                }) RETURN p`,
            {
                name,
                alignment,
                createdAt,
                latitude,
                longitude,
                planet    : location?.planet || '',
                continent : location?.continent || '',
                country   : location?.country || '',
                region    : location?.region || '',
            },
        );

        return result.records[0].get(0).properties;
    }

    public async queryAllPersonsAndDistances(name: string, latitude: number, longitude: number) {
        const queryResult = await this.session.run(
            `MATCH (p:Person)
             WHERE p.name <> $name
             RETURN p, point({latitude: p.latitude, longitude: p.longitude}) AS location,
             point.distance(
                point({
                    latitude: p.latitude,
                    longitude: p.longitude
                }),
                point({
                    latitude: $latitude,
                    longitude: $longitude
                }
            )) AS distance`,
            {
                name,
                latitude,
                longitude,
            },
        );

        return queryResult.records.map(record => ({
            personNode       : record.get('p').properties,
            distanceInMeters : record.get('distance'),
            distanceInMiles  : record.get('distance') * 0.000621371,
        }));
    }

    public async close() {
        await this.session.close();
        await this.driver.close();
    }
}

async function selectMenuChoice(): Promise<string> {
    const choices = [
        { name : 'Create a new Person node', value : 'create' },
        { name : 'Query all Persons and distances', value : 'query' },
        { name : 'Exit', value : 'exit' },
    ];

    const answers = await inquirer.prompt([
        {
            type    : 'list',
            name    : 'action',
            message : 'What would you like to do?',
            choices,
        },
    ]);

    return answers.action;
}

(async () => {
    const uri = Config.ensure('NEO4J_ENDPOINT');
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
