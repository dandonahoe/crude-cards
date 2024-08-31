import { GameStage } from '../../constant/game-stage.enum';
import { zodIsoDateTimeString } from '../../test/TestUtil';
import { PlayerDTO } from './player.dto';
import { CardDTO } from './card.dto';
import { z } from 'zod';


// Define the schema using Zod
const GameStateDTOSchema = z.object({
    selected_card_id_list : z.array(z.string()).default([]),
    dealer_card_id_list   : z.array(z.string()).default([]),
    new_deck_card_list    : z.array(z.instanceof(CardDTO)).nullable().default([]),
    champion_player_id    : z.string().nullable().default(null),
    current_player_id     : z.string().nullable().default(null),
    winner_player_id      : z.string().nullable().default(null),
    max_round_count       : z.number().default(0),
    max_point_count       : z.number().default(0),
    winner_card_id        : z.string().nullable().default(null),
    host_player_id        : z.string().nullable().default(null),
    dealer_card_id        : z.string().nullable().default(null),
    error_message         : z.string().nullable().default(null),
    round_number          : z.number().default(0),
    hand_number           : z.number().default(0),
    player_list           : z.array(z.instanceof(PlayerDTO)).default([]),
    created_by            : z.string().nullable().default(null),
    game_stage            : z.nativeEnum(GameStage).default(GameStage.Home),
    created_at            : zodIsoDateTimeString(),
    updated_at            : zodIsoDateTimeString(),
    session_id            : z.string().nullable().default(null),
    dealer_id             : z.string().nullable().default(null),
    game_code             : z.string().nullable().default(null),
    new_auth_token        : z.string().nullable().default(null),
}).strict();

export class GameStateDTO implements z.infer<typeof GameStateDTOSchema> {

    public selected_card_id_list: string[] = [];
    public dealer_card_id_list: string[] = [];
    public new_deck_card_list: CardDTO[] | null = [];
    public champion_player_id: string | null = null;
    public current_player_id: string | null = null;
    public winner_player_id: string | null = null;
    public max_round_count: number = 0;
    public max_point_count: number = 0;
    public winner_card_id: string | null = null;
    public host_player_id: string | null = null;
    public dealer_card_id: string | null = null;
    public error_message: string | null = null;
    public round_number: number = 0;
    public hand_number: number = 0;
    public player_list: PlayerDTO[] = [];
    public created_by: string | null = null;
    public game_stage: GameStage = GameStage.Home;
    public created_at: string | null = null;
    public updated_at: string | null = null;
    public session_id: string | null = null;
    public dealer_id: string | null = null;
    public game_code: string | null = null;
    public new_auth_token: string | null = null;

    public constructor(
        selected_card_id_list: string[] = [],
        dealer_card_id_list: string[] = [],
        new_deck_card_list: CardDTO[] | null = [],
        champion_player_id: string | null = null,
        current_player_id: string | null = null,
        winner_player_id: string | null = null,
        max_round_count: number = 0,
        max_point_count: number = 0,
        winner_card_id: string | null = null,
        host_player_id: string | null = null,
        dealer_card_id: string | null = null,
        error_message: string | null = null,
        round_number: number = 0,
        hand_number: number = 0,
        player_list: PlayerDTO[] = [],
        created_by: string | null = null,
        game_stage: GameStage = GameStage.Home,
        created_at: string | null = null,
        updated_at: string | null = null,
        session_id: string | null = null,
        dealer_id: string | null = null,
        game_code: string | null = null,
        new_auth_token: string | null = null,
    ) {
        this.selected_card_id_list = selected_card_id_list;
        this.dealer_card_id_list = dealer_card_id_list;
        this.new_deck_card_list = new_deck_card_list;
        this.champion_player_id = champion_player_id;
        this.current_player_id = current_player_id;
        this.winner_player_id = winner_player_id;
        this.max_round_count = max_round_count;
        this.max_point_count = max_point_count;
        this.winner_card_id = winner_card_id;
        this.host_player_id = host_player_id;
        this.dealer_card_id = dealer_card_id;
        this.error_message = error_message;
        this.round_number = round_number;
        this.hand_number = hand_number;
        this.player_list = player_list;
        this.created_by = created_by;
        this.game_stage = game_stage;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.session_id = session_id;
        this.dealer_id = dealer_id;
        this.game_code = game_code;
        this.new_auth_token = new_auth_token;
    }

    // Expose the schema for external use
    public static Schema = GameStateDTOSchema;
    public static Default = Object.freeze(new GameStateDTO());
}
