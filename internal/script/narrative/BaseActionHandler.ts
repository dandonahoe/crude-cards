// /Users/dan/code/crude-cards/internal/script/narrative/BaseActionHandler.ts

import { Neo4jService } from './neo4jService';

export interface ActionParams {
    [key: string]: any;
}

export abstract class BaseActionHandler {
    public abstract id: string;
    public abstract name: string;
    public abstract description: string;

    // This method must be implemented by all actions
    public abstract execute(neo4jService: Neo4jService, params?: ActionParams): Promise<void>;

    // Optional method for validation or other middleware
    public beforeExecute?(params?: ActionParams): Promise<boolean>;
    public afterExecute?(result: any): Promise<void>;
}
