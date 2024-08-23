import { z } from 'zod';

// Define the schema using zod
export const MenuItemClickedDTOSchema = z.object({
    game_code : z.string().nullable().refine(value => value === null || /^[a-zA-Z]{3}$/.test(value), {
        message : 'game_code must be a three-letter word or null',
    }),
    player_id : z.string().nullable().refine(
        value => value === null || /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value), {
        message : 'player_id must be a valid UUIDv4 or null',
    }),
    item_id : z.string().min(1, { message : 'item_id must be a non-empty string' }),
}).strict(); // Ensure no additional properties are allowed

// Define the DTO class
export class MenuItemClickedDTO {

    public game_code: string | null = null;
    public player_id: string | null = null;
    public item_id: string | null = null;

    public constructor(
        game_code: string | null = null,
        player_id: string | null = null,
        item_id: string,
    ) {
        const parsed = MenuItemClickedDTOSchema.parse({ game_code, player_id, item_id });

        this.game_code = parsed.game_code;
        this.player_id = parsed.player_id;
        this.item_id = parsed.item_id;
    }

    public static Default = Object.freeze(new MenuItemClickedDTO(null, null, 'defaultItemId'));
}

