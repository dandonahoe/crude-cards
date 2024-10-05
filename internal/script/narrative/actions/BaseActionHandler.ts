import { Neo4jService } from "../neo4jService";


export interface ActionParams {
    [key: string]: any;
}

export abstract class BaseActionHandler {
    public abstract id: string;
    public abstract name: string;
    public abstract description: string;

    public paramsSchema?: Record<string, any>;

    public abstract execute(neo4jService: Neo4jService, params?: ActionParams): Promise<void>;

    public beforeExecute?(params?: ActionParams): Promise<boolean>;
    public afterExecute?(result: any): Promise<void>;
}
