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
