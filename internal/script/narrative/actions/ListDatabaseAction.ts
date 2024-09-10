import { BaseActionHandler, ActionParams } from './BaseActionHandler';
import { Neo4jService } from '../neo4jService';

export class ListDatabaseAction extends BaseActionHandler {
    public id = 'listDatabase';
    public name = 'List Database';
    public description = 'List all entities and relationships in the database';

    public constructor() {
        super();
    }

    public async execute(neo4jService: Neo4jService, params?: ActionParams): Promise<void> {
        console.log('Listing all entities and relationships in the database...', params);

        // Fetch places
        const places = await neo4jService.queryAllEntities('Place');
        console.log('Places:');
        places.forEach(place => {
            console.log(`- ${place.name} (Type: Place)`);
        });

        // Fetch characters
        const characters = await neo4jService.queryAllEntities('Character');
        console.log('Characters:');
        characters.forEach(character => {
            console.log(`- ${character.name} (Type: Character, Alignment: ${character.alignment})`);
        });

        // Fetch monsters
        const monsters = await neo4jService.queryAllEntities('Monster');
        console.log('Monsters:');
        monsters.forEach(monster => {
            console.log(`- ${monster.name} (Type: Monster, Danger Level: ${monster.dangerLevel})`);
        });

        // Fetch items
        const items = await neo4jService.queryAllEntities('Item');
        console.log('Items:');
        items.forEach(item => {
            console.log(`- ${item.name} (Type: Item, Value: ${item.value})`);
        });

        // Fetch factions
        const factions = await neo4jService.queryAllEntities('Faction');
        console.log('Factions:');
        factions.forEach(faction => {
            console.log(`- ${faction.name} (Type: Faction, Influence: ${faction.influence})`);
        });

        // Fetch miscellaneous entities
        const miscEntities = await neo4jService.queryAllMiscEntities();
        console.log('Miscellaneous Entities:');
        miscEntities.forEach(entity => {
            console.log(`- ${entity.name} (Type: ${entity.label})`);
        });

        // Fetch relationships
        const relationships = await neo4jService.queryAllRelationships();
        console.log('Relationships:');
        relationships.forEach(relationship => {
            console.log(`- ${relationship.from} -[:${relationship.type}]-> ${relationship.to}`);
        });

        console.log('Database listing complete.');
    }
}
