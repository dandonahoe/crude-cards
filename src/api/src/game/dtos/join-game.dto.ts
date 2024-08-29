import { z } from 'zod';
import { AuthDTO } from './auth.dto';

const JoinGameDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
}).strict();


export class JoinGameDTO extends AuthDTO implements z.infer<typeof JoinGameDTOSchema> {

    public constructor(
        auth_token?: string,
        game_code?: string | null,
    ) {
        super(auth_token, game_code);
    }

    // Expose the schema for external use
    public static override Schema = JoinGameDTOSchema;
    public static override Default = Object.freeze(new JoinGameDTO());
}
