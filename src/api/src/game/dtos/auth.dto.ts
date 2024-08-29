import { validate as validateUUID } from 'uuid';
import deepFreeze from 'deep-freeze-strict';
import { z } from 'zod';


// Define the schema using zod
export const AuthDTOSchema = z.object({
    game_code  : z.string().optional().nullable(),
    auth_token : z.string().optional().refine(
        value => value === undefined || validateUUID(value), {
        message : 'auth_token must be a valid UUIDv4 or undefined',
    }),

}).strict();

export class AuthDTO implements z.infer<typeof AuthDTOSchema> {

    public auth_token ?: string;
    public game_code  ?: string | null;

    public constructor(auth_token?: string, game_code?: string | null) {

        if (auth_token !== undefined) this.auth_token = auth_token;
        if (game_code  !== undefined) this.game_code  = game_code
    }

    public static Default = deepFreeze(new AuthDTO());
    public static Schema  = AuthDTOSchema;
}
