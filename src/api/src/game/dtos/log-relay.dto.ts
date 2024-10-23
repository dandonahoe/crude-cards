import { AuthDTO } from './auth.dto';
import { z } from 'zod';


const LogRelayDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
    payload : z.record(z.unknown()).optional(),
    message : z.string(),
}).strict();

export class LogRelayDTO extends AuthDTO implements z.infer<typeof LogRelayDTOSchema> {

    public message: string;
    public payload ?: Record<string, unknown>;

    public constructor(auth_token?: string) {
        super(auth_token);
    }

    // Expose the schema for external use
    public static override Schema = LogRelayDTOSchema;
    public static override Default = Object.freeze(new LogRelayDTO());
}
