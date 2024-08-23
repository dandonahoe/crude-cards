import { CardColor } from '../../constant/card-color.enum';
import { z } from 'zod';

// Define the schema using zod
const CardDTOSchema = z.object({
    id    : z.string().nullable().optional(),
    color : z.nativeEnum(CardColor).nullable(),
    text  : z.string().nullable(),
}).strict();


export class CardDTO {

    public color: CardColor | null = null;
    public text: string | null = null;
    public id: string | null;

    public constructor(
        id: string | null = null,
        color: CardColor | null = null,
        text: string | null = null,
    ) {
        if (color !== undefined) this.color = color;
        if (text !== undefined) this.text = text;
        if (id !== undefined) this.id = id;
    }

    // Expose the schema for external use
    public static Schema = CardDTOSchema;
    public static Default = Object.freeze(new CardDTO());
}
