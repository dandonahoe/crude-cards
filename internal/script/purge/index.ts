import { Client } from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// List of tables to truncate
const tablesToTruncate: string[] = [
    'game_session',
    'score_log',
    'feedback',
    'player',
    'game',
];

async function truncateTables() {
    const client = new Client({
        host     : process.env.BACKEND_DATABASE_HOST,
        port     : Number(process.env.BACKEND_DATABASE_PORT),
        user     : process.env.BACKEND_DATABASE_USER,
        password : process.env.BACKEND_DATABASE_PASS,
        database : process.env.BACKEND_DATABASE_NAME,
    });

    try {
        // Connect to the database
        await client.connect();

        // Execute truncation queries in parallel using Promise.all
        await Promise.all(
            tablesToTruncate.map(async tableName => {
                const query = `TRUNCATE TABLE ${tableName} CASCADE;`;
                await client.query(query);
                console.log(`Table ${tableName} truncated.`);
            }),
        );

    } catch (error) {
        console.error('Error truncating tables:', error);
    } finally {
        // Close the database connection
        await client.end();
    }
}

// Call the truncateTables function
truncateTables();
