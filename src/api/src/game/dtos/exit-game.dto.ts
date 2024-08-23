import { z } from 'zod';
import { AuthDTO } from './auth.dto';


const ExitGameDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
}).strict();

export class ExitGameDTO extends AuthDTO implements z.infer<typeof ExitGameDTOSchema> {

    public constructor(auth_token?: string) {
        super(auth_token);
    }

    // Expose the schema for external use
    public static override Schema = ExitGameDTOSchema;
    public static override Default = Object.freeze(new ExitGameDTO());
}
