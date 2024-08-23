import { zodIsoDateTimeString } from '../../test/TestUtil';
import { z } from 'zod';


const PlayerDTOSchema = z.object({
    disconnected_at : zodIsoDateTimeString(),
    card_id_list    : z.array(z.string()),
    socket_id       : z.string().nullable(),
    username        : z.string().nullable(),
    score           : z.number(),
    id              : z.string().nullable(),
}).strict();


export class PlayerDTO implements z.infer<typeof PlayerDTOSchema> {

    public disconnected_at: string | null = null;
    public card_id_list: string[] = [];
    public socket_id: string | null = null;
    public username: string | null = null;
    public score: number = 0;
    public id: string | null = null;

    public constructor(
        disconnected_at: string | null = null,
        card_id_list: string[] = [],
        socket_id: string | null = null,
        username: string | null = null,
        score: number = 0,
        id: string | null = null,
    ) {
        this.disconnected_at = disconnected_at;
        this.card_id_list = card_id_list;
        this.socket_id = socket_id;
        this.username = username;
        this.score = score;
        this.id = id;
    }

    // Expose the schema for external use
    public static Schema = PlayerDTOSchema;
    public static Default = Object.freeze(new PlayerDTO());
}
