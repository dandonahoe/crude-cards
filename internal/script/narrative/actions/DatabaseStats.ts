import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { Neo4jService } from '../neo4jService';

export class DatabaseStats extends BaseActionHandler {

    public id          = 'databasestats';
    public name        = 'Database Stats';
    public description = 'Gather and display various statistics about the Neo4j database.';

    public async execute(neo4jService: Neo4jService, params: ActionParams = {}): Promise<void> {

        console.log('Gathering database statistics...', params);

        // Step 1: Fetch basic stats
        const version = await neo4jService.getNeo4jVersion();

        console.log('Neo4j database:', version.summary.database);
        console.log('Neo4j server:', version.summary.server);

        // Step 2: Fetch node and relationship counts by type
        const nodeCountsByLabel = await neo4jService.getNodeCountsByLabel();
        const relationshipCountsByType = await neo4jService.getRelationshipCountsByType();

        // Display node counts by label
        if (Object.keys(nodeCountsByLabel).length > 0) {

            console.log('Node Counts by Label:');

            for (const [label, count] of Object.entries(nodeCountsByLabel))
                console.log(`- ${label}: ${count}`);
        } else {
            console.log('Node Counts by Label: No nodes found in the database.');
        }

        // Display relationship counts by type
        if (Object.keys(relationshipCountsByType).length > 0) {

            console.log('Relationship Counts by Type:');

            for (const [type, count] of Object.entries(relationshipCountsByType))
                console.log(`- ${type}: ${count}`);

        } else {
            console.log('Relationship Counts by Type: No relationships found in the database.');
        }

        // Step 3: Fetch unique labels and relationship types
        const uniqueNodeLabels = Object.keys(nodeCountsByLabel);
        const uniqueRelationshipTypes = Object.keys(relationshipCountsByType);

        // Display unique node labels
        if (uniqueNodeLabels.length > 0) {
            console.log('Unique Node Labels:');

            uniqueNodeLabels.forEach(label => console.log(`- ${label}`));
        } else {
            console.log('Unique Node Labels: No unique labels found.');
        }

        // Display unique relationship types
        if (uniqueRelationshipTypes.length > 0) {
            console.log('Unique Relationship Types:');

            uniqueRelationshipTypes.forEach(type => console.log(`- ${type}`));
        } else {
            console.log('Unique Relationship Types: No unique relationship types found.');
        }

        console.log('Database statistics collection complete.');
    }
}
