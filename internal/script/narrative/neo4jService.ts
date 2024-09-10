import neo4j, { Driver, Session } from 'neo4j-driver';

export class Neo4jService {
    private driver: Driver;
    private session: Session;

    public constructor(uri: string, username: string, password: string) {
        this.driver = neo4j.driver(`neo4j://${uri}`, neo4j.auth.basic(username, password));
        this.session = this.driver.session();
    }

    // Query all entities of a certain type (e.g., Place, Character, Monster, Item, etc.)
    public async queryAllEntities(type: string) {
        const result = await this.session.run(
            `MATCH (n:${type}) RETURN n`,
        );

        return result.records.map(record => record.get('n').properties);
    }

    // Query all persons specifically (shortcut for 'Person' entities)
    public async queryAllPersons() {
        const result = await this.session.run(
            `MATCH (p:Person) RETURN p`,
        );

        return result.records.map(record => record.get('p').properties);
    }

    // Query all miscellaneous entities (not of predefined types)
    public async queryAllMiscEntities() {
        const result = await this.session.run(
            `MATCH (n) WHERE NOT n:Place AND NOT n:Character
                AND NOT n:Monster AND NOT n:Item AND NOT n:Faction RETURN labels(n) AS label, n`,
        );

        return result.records.map(record => ({
            label : record.get('label')[0], // Assuming the first label is the most relevant
            ...record.get('n').properties,
        }));
    }

    // Query all relationships in the database
    public async queryAllRelationships() {
        const result = await this.session.run(
            `MATCH (a)-[r]->(b) RETURN a.name AS from, type(r) AS type, b.name AS to`,
        );

        return result.records.map(record => ({
            from : record.get('from'),
            type : record.get('type'),
            to   : record.get('to'),
        }));
    }

    // Delete all nodes and relationships in the database
    public async deleteDatabase() {
        await this.session.run(`MATCH (n) DETACH DELETE n`);
    }

    public async close() {
        await this.session.close();
        await this.driver.close();
    }
}
