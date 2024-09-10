import * as dotenv from 'dotenv';
import neo4j from 'neo4j-driver';
import { geocode } from 'opencage-api-client';

dotenv.config();

if (!process.env.NEO4J_PASSWORD) {
    console.error('Please provide the password for the Neo4j database using the environment variable NEO4J_PASSWORD');
    process.exit(1);
}

if (!process.env.NEO4J_ENDPOINT) {
    console.error('Please provide the endpoint for the Neo4j database using the environment variable NEO4J_ENDPOINT');
    process.exit(1);
}

if (!process.env.OPENCAGE_API_KEY) {
    console.error('Please provide the OpenCage API key using the environment variable OPENCAGE_API_KEY');
    process.exit(1);
}

// Function to generate random latitude and longitude within the continental US
function getRandomCoordinates() {
    const minLat = 24.396308;
    const maxLat = 49.384358;
    const minLon = -125.0;
    const maxLon = -66.93457;

    const latitude = Math.random() * (maxLat - minLat) + minLat;
    const longitude = Math.random() * (maxLon - minLon) + minLon;

    return { latitude, longitude };
}

// Function to get location details from OpenCage Geocoder
async function getLocationDetails(latitude: number, longitude: number) {
    try {
        const apiKey = process.env.OPENCAGE_API_KEY;
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

(async (uri: string, password: string) => {
    const username = 'neo4j';
    let driver;
    let session;

    try {
        driver = neo4j.driver(`neo4j://${uri}`, neo4j.auth.basic(username, password));
        session = driver.session();

        console.log('Connection established');

        // delete whole graph completely as if totally new
        // await session.run('MATCH (n) DETACH DELETE n'); console.log('Graph deleted');

        const name = `Person_${new Date().toISOString()}`;
        const alignment = 'Evil';
        const createdAt = new Date().toISOString();
        const { latitude, longitude } = getRandomCoordinates();

        // Get location details
        const location = await getLocationDetails(latitude, longitude);

        if (location)
            console.log(`Location: ${location.formatted}`);
         else
            console.log('Location details could not be fetched.');


        const result = await session.run(
            `CREATE (
                p:Person {
                    name      : $name,
                    alignment : $alignment,
                    createdAt : $createdAt,
                    latitude  : $latitude,
                    longitude : $longitude,
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

        const singleRecord = result.records[0];
        const node = singleRecord.get(0);

        console.log('Node created:', node.properties);

        // Query the database for all Person nodes and calculate the distance from the newly created node
        const queryResult = await session.run(
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

        console.log('All Person nodes and their distances from the newly created node:');
        queryResult.records.forEach(record => {
            const personNode = record.get('p');
            const distanceInMeters = record.get('distance');
            const distanceInMiles = distanceInMeters * 0.000621371;

            console.log(personNode.properties.name, `Distance: ${distanceInMeters} meters (${distanceInMiles.toFixed(2)} miles)`);
        });

    } catch (err) {
        console.error(`Connection error\n${err}\nCause:`, err);
        process.exit(1);
    } finally {
        if (session)
            await session.close();

        if (driver)
            await driver.close();

        console.log('Session and driver closed');
        process.exit(0);
    }
})(process.env.NEO4J_ENDPOINT, process.env.NEO4J_PASSWORD);
