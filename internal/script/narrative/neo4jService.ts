import neo4j, { Driver, Session } from 'neo4j-driver';

export class Neo4jService {
    private driver: Driver;
    private session: Session;

    public constructor(uri: string, username: string, password: string) {
        this.driver = neo4j.driver(`neo4j://${uri}`, neo4j.auth.basic(username, password));
        this.session = this.driver.session();
    }

    // Create a Person node
    public async createPersonNode(name: string, alignment: string, createdAt: string, race: string, role: string) {
        const result = await this.session.run(
            `CREATE (p:Person { name: $name, alignment: $alignment, createdAt: $createdAt, race: $race, role: $role }) RETURN p`,
            { name, alignment, createdAt, race, role },
        );

        return result.records[0].get(0).properties;
    }

    // Create a Place node
    public async createPlaceNode(name: string, locationType: string, coordinates: { latitude: number; longitude: number }) {
        const result = await this.session.run(
            `CREATE (pl:Place { name: $name, locationType: $locationType, latitude: $latitude, longitude: $longitude }) RETURN pl`,
            { name, locationType, latitude : coordinates.latitude, longitude : coordinates.longitude },
        );

        return result.records[0].get(0).properties;
    }

    // Create a Thing node
    public async createThingNode(name: string, thingType: string, description: string) {
        const result = await this.session.run(
            `CREATE (t:Thing { name: $name, thingType: $thingType, description: $description }) RETURN t`,
            { name, thingType, description },
        );

        return result.records[0].get(0).properties;
    }

    // Create an Event node
    public async createEventNode(name: string, eventType: string, date: string) {
        const result = await this.session.run(
            `CREATE (e:Event { name: $name, eventType: $eventType, date: $date }) RETURN e`,
            { name, eventType, date },
        );

        return result.records[0].get(0).properties;
    }

    // Create a generic relationship between two nodes
    public async createRelationship(
        nodeAName: string, nodeALabel: string, nodeBName: string,
        nodeBLabel: string, relationshipType: string) {
        const result = await this.session.run(
            `MATCH (a:${nodeALabel} { name: $nodeAName }), (b:${nodeBLabel} { name: $nodeBName })
             CREATE (a)-[:${relationshipType}]->(b) RETURN a, b`,
            { nodeAName, nodeBName },
        );

        return result.records.map(record => ({
            nodeA : record.get('a').properties,
            nodeB : record.get('b').properties,
        }));
    }

    // Create a specific relationship between a Person and a Place (LivesIn)
    public async createPersonLivesInRelationship(personName: string, placeName: string) {
        return this.createRelationship(personName, 'Person', placeName, 'Place', 'LIVES_IN');
    }

    // Create a specific relationship between a Person and a Thing (Owns)
    public async createPersonOwnsThingRelationship(personName: string, thingName: string) {
        return this.createRelationship(personName, 'Person', thingName, 'Thing', 'OWNS');
    }

    // Create a specific relationship between a Person and an Event (Attended)
    public async createPersonAttendedEventRelationship(personName: string, eventName: string) {
        return this.createRelationship(personName, 'Person', eventName, 'Event', 'ATTENDED');
    }

    // Create a relationship between Places (ConnectedTo)
    public async createPlaceConnectedToRelationship(placeAName: string, placeBName: string) {
        return this.createRelationship(placeAName, 'Place', placeBName, 'Place', 'CONNECTED_TO');
    }

    // Create a relationship between Events (CausedBy)
    public async createEventCausedByRelationship(eventName: string, causingEventName: string) {
        return this.createRelationship(eventName, 'Event', causingEventName, 'Event', 'CAUSED_BY');
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
