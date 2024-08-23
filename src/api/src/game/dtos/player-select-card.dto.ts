import { z } from 'zod';
import { AuthDTO } from './auth.dto';


const PlayerSelectCardDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
    card_id : z.string().nullable(),
}).strict();

export class PlayerSelectCardDTO extends AuthDTO implements z.infer<typeof PlayerSelectCardDTOSchema> {

    public card_id: string | null = null;

    public constructor(
        auth_token?: string,
        card_id?: string | null,
    ) {
        super(auth_token);

        if (card_id !== undefined)
            this.card_id = card_id;
    }

    // Expose the schema for external use
    public static override Schema = PlayerSelectCardDTOSchema;
    public static override Default = Object.freeze(new PlayerSelectCardDTO());
}


