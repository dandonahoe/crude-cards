import { AuthDTO, AuthDTOSchema } from "./auth.dto";
import { z } from 'zod';

// Define the schema using zod
const SubmitFeedbackDTOSchema = z.object({
    ...AuthDTOSchema.shape,
    message : z.string().nullable(),
    email   : z.string().nullable(),
    name    : z.string().nullable(),
}).strict();

export class SubmitFeedbackDTO extends AuthDTO implements z.infer<typeof SubmitFeedbackDTOSchema> {

    public message: string | null = null;
    public email: string | null = null;
    public name: string | null = null;

    public constructor(
        auth_token?: string | undefined,
        message: string | null = null,
        email: string | null = null,
        name: string | null = null,
    ) {
        super(auth_token);

        if (message !== undefined) this.message = message;
        if (email !== undefined) this.email = email;
        if (name !== undefined) this.name = name;
    }

    // Expose the schema for external use
    public static override Schema = SubmitFeedbackDTOSchema;
    public static override Default = Object.freeze(new SubmitFeedbackDTO());
}


