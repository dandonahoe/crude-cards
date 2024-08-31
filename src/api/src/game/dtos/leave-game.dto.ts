import { AuthDTO } from './auth.dto';
import { z } from 'zod';


const LeaveGameDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
}).strict();

export class LeaveGameDTO extends AuthDTO implements z.infer<typeof LeaveGameDTOSchema> {

    public constructor(auth_token?: string) {
        super(auth_token);
    }

    // Expose the schema for external use
    public static override Schema = LeaveGameDTOSchema;
    public static override Default = Object.freeze(new LeaveGameDTO());
}
