// /Users/dan/code/crude-cards/internal/script/narrative/neo4jService.ts

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
                    name: $name,
                    alignment: $alignment,
                    createdAt: $createdAt,
                    latitude: $latitude,
                    longitude: $longitude,
                    planet: $planet,
                    continent: $continent,
                    country: $country,
                    region: $region
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

    public async queryAllPersons() {
        const result = await this.session.run(`MATCH (p:Person) RETURN p`);

        return result.records.map(record => record.get('p').properties);
    }

    public async deleteDatabase() {
        await this.session.run(`MATCH (n) DETACH DELETE n`);
    }

    public async close() {
        await this.session.close();
        await this.driver.close();
    }
}
