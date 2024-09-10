// /Users/dan/code/crude-cards/internal/script/narrative/actionHandlers.ts

import { Neo4jService } from './neo4jService';

export type MenuActionHandler = (neo4jService: Neo4jService) => Promise<void>;

// Action to delete the database
export const deleteDatabaseAction: MenuActionHandler = async neo4jService => {
    await neo4jService.deleteDatabase();
    console.log('Database deleted successfully.');
};

// Action to list all persons in the database
export const listDatabaseAction: MenuActionHandler = async neo4jService => {
    const persons = await neo4jService.queryAllPersons();
    if (persons.length > 0) {
        console.log('Current Persons in the Database:');
        persons.forEach(person => {
            console.log(`- ${person.name} (${person.alignment})`);
        });
    } else {
        console.log('No persons found in the database.');
    }
};

// Action to create a new person and continue the game
export const continueGameAction: MenuActionHandler = async neo4jService => {
    const name = `Person_${new Date().toISOString()}`;
    const alignment = 'Evil';
    const createdAt = new Date().toISOString();
    const { latitude, longitude } = {
        latitude  : 40.7128,
        longitude : -74.0060,
    }; // Static coordinates for simplicity

    const location = {
        planet    : 'Earth',
        continent : 'North America',
        country   : 'USA',
        region    : 'New York',
    };

    const nodeProperties = await neo4jService.createPersonNode(name, alignment, createdAt, latitude, longitude, location);
    console.log('Person node created:', nodeProperties);
};

// Action to exit the game
export const exitAction: MenuActionHandler = async () => {
    console.log('Exiting the game.');
};
