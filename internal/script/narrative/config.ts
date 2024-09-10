// /Users/dan/code/crude-cards/internal/script/narrative/config.ts

import * as dotenv from 'dotenv';

dotenv.config();

export class Config {
    public static get(key: string): string | undefined {
        return process.env[key];
    }

    public static ensure(key: string): string {
        const value = this.get(key);
        if (!value) {
            console.error(`Please provide the ${key} using the environment variable ${key}`);
            process.exit(1);
        }

        return value;
    }
}