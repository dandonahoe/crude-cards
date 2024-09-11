import { AuthDTO } from './auth.dto';
import { z } from 'zod';


const LogDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
    payload : z.record(z.unknown()).optional(),
    message : z.string(),
}).strict();

export class LogDTO extends AuthDTO implements z.infer<typeof LogDTOSchema> {

    public message: string;
    public payload ?: Record<string, unknown>;

    public constructor(auth_token?: string) {
        super(auth_token);
    }

    // Expose the schema for external use
    public static override Schema = LogDTOSchema;
    public static override Default = Object.freeze(new LogDTO());
}
