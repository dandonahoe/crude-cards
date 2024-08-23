import { MigrationInterface, QueryRunner } from 'typeorm';


export class PostRefactoring1720655677072 implements MigrationInterface {

    public async up(queryRunner : QueryRunner) : Promise<void> {
        await queryRunner.query(
            'INSERT INTO card (text, type) VALUES ($1, $2)',
            ['foooooo', 'black'],
        );
    }

    public async down(_queryRunner : QueryRunner) : Promise<void> {
    }

}
