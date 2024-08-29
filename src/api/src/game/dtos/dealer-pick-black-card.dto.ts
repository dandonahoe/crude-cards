import { z } from 'zod';
import { AuthDTO } from './auth.dto';


const DealerPickBlackCardDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
    card_id : z.string().nullable(),
}).strict();

export class DealerPickBlackCardDTO extends AuthDTO implements z.infer<typeof DealerPickBlackCardDTOSchema> {

    public card_id: string | null = null;

    public constructor(
        auth_token ?: string,
        card_id    ?: string | null,
        game_code  ?: string | null,
    ) {
        super(auth_token, game_code);

        if (card_id !== undefined) this.card_id = card_id;
    }

    // Expose the schema for external use
    public static override Schema = DealerPickBlackCardDTOSchema;
    public static override Default = Object.freeze(new DealerPickBlackCardDTO());
}


