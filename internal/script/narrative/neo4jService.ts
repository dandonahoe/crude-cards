import neo4j, { Driver, Session } from 'neo4j-driver';

export class Neo4jService {
    private driver: Driver;
    private session: Session;

    public constructor(uri: string, username: string, password: string) {
        this.driver = neo4j.driver(`neo4j://${uri}`, neo4j.auth.basic(username, password));
        this.session = this.driver.session();
    }

    public async createPersonNode(
        name: string, alignment: string, createdAt: string, latitude: number, longitude: number, location: any,
    ) {
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
