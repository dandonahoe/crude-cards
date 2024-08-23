import { validate as validateUUID } from 'uuid';
import deepFreeze from 'deep-freeze-strict';
import { z } from 'zod';


// Define the schema using zod
export const AuthDTOSchema = z.object({
    auth_token : z.string().optional().refine(
        value => value === undefined || validateUUID(value), {
        message : 'auth_token must be a valid UUIDv4 or undefined',
    }),
}).strict();

export class AuthDTO implements z.infer<typeof AuthDTOSchema> {

    public auth_token?: string;

    public constructor(auth_token?: string) {
        if (auth_token !== undefined)
            this.auth_token = auth_token;
    }

    // Expose the schema for external use
    public static Schema = AuthDTOSchema;
    public static Default = deepFreeze(new AuthDTO());
}
