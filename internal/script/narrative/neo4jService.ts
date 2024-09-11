import neo4j, { Driver, Session } from 'neo4j-driver';

export class Neo4jService {
    private driver: Driver;
    private session: Session;

    public constructor(uri: string, username: string, password: string) {
        this.driver = neo4j.driver(`neo4j://${uri}`, neo4j.auth.basic(username, password));
        this.session = this.driver.session();
    }

    // Create various nodes (Person, Place, Thing, Event)
    public async createNode(label: string, properties: Record<string, any>) {
        const result = await this.session.run(
            `CREATE (n:${label} $props) RETURN n`,
            { props : properties },
        );

        return result.records[0].get('n').properties;
    }

    // Generic method for creating relationships
    public async createRelationship(
        nodeAName: string, nodeALabel: string,
        nodeBName: string, nodeBLabel: string,
        relationshipType: string,
    ) {
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

    // Get counts and metadata for nodes and relationships
    public async getCounts(query: string) {
        const result = await this.session.run(query);

        return result.records.reduce((acc, record) => {
            acc[record.get('label')] = record.get('count').low;

            return acc;
        }, {} as Record<string, unknown>);
    }

    public async getDatabaseVersion() {
        const result = await this.session.run(
            'CALL dbms.components() YIELD name, versions, edition RETURN name, versions[0] as version, edition',
        );

        return result.records[0].get('version');
    }

    public async close() {
        await this.session.close();
        await this.driver.close();
    }
}
