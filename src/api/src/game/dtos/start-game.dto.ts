import { z } from 'zod';
import { AuthDTO } from './auth.dto';


const StartGameDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
}).strict();

export class StartGameDTO extends AuthDTO implements z.infer<typeof StartGameDTOSchema> {

    public constructor(auth_token?: string) {
        super(auth_token);
    }

    // Expose the schema for external use
    public static override Schema = StartGameDTOSchema;
    public static override Default = Object.freeze(new StartGameDTO());
}
