import { AuthDTO } from './auth.dto';
import { z } from 'zod';


export const CreateGameDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
}).strict();

export class CreateGameDTO extends AuthDTO implements z.infer<typeof CreateGameDTOSchema> {

    public constructor(
        auth_token?: string,
    ) {
        super(auth_token);
    }

    // Expose the schema for external use
    public static override Schema = CreateGameDTOSchema;
    public static override Default = Object.freeze(new CreateGameDTO());
}
