import { MenuAction, ActionResult } from './actionTypes';
import { selectMenuAction } from './menuService';
import { Neo4jService } from './neo4jService';
import { GeoUtils } from './geoUtils';

export class GameLoop {
    private neo4jService: Neo4jService;
    private isGameActive: boolean;

    public constructor(neo4jService: Neo4jService) {
        this.neo4jService = neo4jService;
        this.isGameActive = true;
    }

    public async start() {
        while (this.isGameActive) {
            const choice = await selectMenuAction();
            let result: ActionResult;

            switch (choice) {
                case MenuAction.DeleteDatabase: {
                    await this.neo4jService.deleteDatabase();
                    result = { success : true, message : 'Database deleted successfully.' };
                } break;

                case MenuAction.ListDatabase: {
                    const persons = await this.neo4jService.queryAllPersons();
                    if (persons.length > 0) {
                        console.log('Current Persons in the Database:');
                        persons.forEach(person => {
                            console.log(`- ${person.name} (${person.alignment})`);
                        });
                        result = { success : true, message : 'Listed all persons in the database.' };
                    } else {
                        result = { success : true, message : 'No persons found in the database.' };
                    }
                } break;

                case MenuAction.ContinueGame: {
                } break;

                case MenuAction.CreateRandomPerson: {

                    const name = `Person_${new Date().toISOString()}`;

                    const alignment = 'Evil';
                    const createdAt = new Date().toISOString();
                    const { latitude, longitude } = GeoUtils.getRandomCoordinates();
                    const location = await GeoUtils.getLocationDetails(latitude, longitude);

                    const nodeProperties = await this.neo4jService.createPersonNode(
                        name, alignment, createdAt, latitude, longitude, location);

                    console.log('Person node created:', nodeProperties);
                    result = { success : true, message : 'Game continued and node created.' };
                } break;


                case MenuAction.Exit: {
                    this.isGameActive = false;
                    result = { success : true, message : 'Exiting the game.' };
                } break;


                default: {
                    result = { success : false, message : 'Invalid choice' };
                }

            }

            console.log(result.message);

            if (!this.isGameActive) break;
        }
    }

    public async end() {
        await this.neo4jService.close();
        console.log('Session and driver closed');
    }
}
