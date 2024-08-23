import { MigrationInterface, QueryRunner } from 'typeorm';


const listOfCardText = [
    'foooooo',
    'barrrrrr',
    'baz',
];
export class PostRefactoring1720656082503 implements MigrationInterface {

    public async up(queryRunner : QueryRunner) : Promise<void> {

        const queryPromiseList = listOfCardText.map((text) => {
            return queryRunner.query(
                'INSERT INTO card (text, type) VALUES ($1, $2)',
                [text, 'black'],
            );
        });

        await Promise.all(queryPromiseList);
    }

    public async down(_queryRunner : QueryRunner) : Promise<void> {
    }

}
