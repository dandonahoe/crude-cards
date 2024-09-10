import { Neo4jService } from '../neo4jService';

export interface ActionParams {
    [key: string]: any;
}

export abstract class BaseActionHandler {
    public abstract id: string;
    public abstract name: string;
    public abstract description: string;
    public shortName: string;
    public isRequired: boolean;

    // Optional parameter schema, can be used to validate inputs or prompt the user
    public paramsSchema?: { [key: string]: any };

    public constructor() {
    }

    // This method must be implemented by all actions
    public abstract execute(neo4jService: Neo4jService, params?: ActionParams): Promise<void>;

    // Optional method for validation or other middleware
    public beforeExecute?(params?: ActionParams): Promise<boolean>;
    public afterExecute?(result: any): Promise<void>;
}
