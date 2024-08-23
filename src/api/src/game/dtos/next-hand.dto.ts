import { AuthDTO } from './auth.dto';
import { z } from 'zod';


const NextHandDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
}).strict();

export class NextHandDTO extends AuthDTO implements z.infer<typeof NextHandDTOSchema> {

    public constructor(auth_token?: string) {
        super(auth_token);
    }

    // Expose the schema for external use
    public static override Schema = NextHandDTOSchema;
    public static override Default = Object.freeze(new NextHandDTO());
}
