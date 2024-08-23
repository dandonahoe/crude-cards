import { AuthDTO, AuthDTOSchema } from "./auth.dto";
import { z } from 'zod';

const UpdateUsernameDTOSchema = z.object({
    ...AuthDTOSchema.shape,
    username : z.string(),
}).strict();

export class UpdateUsernameDTO extends AuthDTO implements z.infer<typeof UpdateUsernameDTOSchema> {

    public username: string;

    public constructor(username: string, auth_token?: string) {
        super(auth_token);

        if (username !== undefined) this.username = username;
    }

    public static override Schema = UpdateUsernameDTOSchema;
    public static override Default = Object.freeze(new UpdateUsernameDTO(''));
}
