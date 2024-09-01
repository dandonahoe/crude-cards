import { GameStage } from '../../../constant/game-stage.enum';
import { GameStateDTO } from '../game-state.dto';
import { PlayerDTO } from '../player.dto';
import { CardDTO } from '../card.dto';


describe('GameStateDTO', () => {

    describe('constructor', () => {
        it('should create a GameStateDTO instance with default values', () => {

            const dto = new GameStateDTO();

            expect(dto.selected_card_id_list).toEqual([]);
            expect(dto.dealer_card_id_list).toEqual([]);
            expect(dto.new_deck_card_list).toEqual([]);
            expect(dto.champion_player_id).toBeNull();
            expect(dto.current_player_id).toBeNull();
            expect(dto.winner_player_id).toBeNull();
            expect(dto.max_round_count).toBe(0);
            expect(dto.max_point_count).toBe(0);
            expect(dto.winner_card_id).toBeNull();
            expect(dto.host_player_id).toBeNull();
            expect(dto.dealer_card_id).toBeNull();
            expect(dto.error_message).toBeNull();
            expect(dto.round_number).toBe(0);
            expect(dto.hand_number).toBe(0);
            expect(dto.player_list).toEqual([]);
            expect(dto.created_by).toBeNull();
            expect(dto.game_stage).toBe(GameStage.Home);
            expect(dto.created_at).toBeNull();
            expect(dto.updated_at).toBeNull();
            expect(dto.session_id).toBeNull();
            expect(dto.dealer_id).toBeNull();
            expect(dto.game_code).toBeNull();
        });

        it('should create a GameStateDTO instance with provided values', () => {
            const players = [new PlayerDTO()];
            const cards = [new CardDTO()];
            const dto = new GameStateDTO(
                ['card1', 'card2'],
                ['dealerCard1'],
                cards,
                'champion-player',
                'current-player',
                'winner-player',
                'Endgame Message',
                10,
                5,
                'winner-card',
                'host-player',
                'dealer-card',
                'error',
                'im hungry',
                2,
                3,
                players,
                'creator',
                GameStage.DealerPickWinner,
                '2024-01-01T00:00:00Z',
                '2024-01-02T00:00:00Z',
                'session-id',
                'dealer-id',
                'game-code',
            );

            expect(dto.selected_card_id_list).toEqual(['card1', 'card2']);
            expect(dto.dealer_card_id_list).toEqual(['dealerCard1']);
            expect(dto.new_deck_card_list).toEqual(cards);
            expect(dto.champion_player_id).toBe('champion-player');
            expect(dto.current_player_id).toBe('current-player');
            expect(dto.winner_player_id).toBe('winner-player');
            expect(dto.max_round_count).toBe(10);
            expect(dto.max_point_count).toBe(5);
            expect(dto.winner_card_id).toBe('winner-card');
            expect(dto.host_player_id).toBe('host-player');
            expect(dto.dealer_card_id).toBe('dealer-card');
            expect(dto.error_message).toBe('error');
            expect(dto.round_number).toBe(2);
            expect(dto.hand_number).toBe(3);
            expect(dto.player_list).toEqual(players);
            expect(dto.created_by).toBe('creator');
            expect(dto.game_stage).toBe(GameStage.DealerPickWinner);
            expect(dto.created_at).toBe('2024-01-01T00:00:00Z');
            expect(dto.updated_at).toBe('2024-01-02T00:00:00Z');
            expect(dto.session_id).toBe('session-id');
            expect(dto.dealer_id).toBe('dealer-id');
            expect(dto.game_code).toBe('game-code');
        });
    });

    describe('schema', () => {
        it('should validate a GameStateDTO instance successfully', () => {
            const dto = new GameStateDTO(
                ['card1', 'card2'],
                ['dealerCard1'],
                [new CardDTO()],
                'champion-player',
                'current-player',
                'winner-player',
                'Endgame Message',
                10,
                5,
                'winner-card',
                'host-player',
                'dealer-card',
                'error',
                'uhhhhh',
                2,
                3,
                [new PlayerDTO()],
                'creator',
                GameStage.DealerPickWinner,
                '2024-01-01T00:00:00Z',
                '2024-01-02T00:00:00Z',
                'session-id',
                'dealer-id',
                'game-code',
            );

            expect(() => GameStateDTO.Schema.parse(dto)).not.toThrow();
        });

        it('should throw an error for invalid created_at and updated_at values', () => {
            const dto = new GameStateDTO(
                [],
                [],
                null,
                null,
                null,
                null,
                null,
                0,
                0,
                null,
                null,
                null,
                null,
                null,
                0,
                0,
                [],
                null,
                GameStage.Home,
                'invalid-date',
                'invalid-date',
                null,
                null,
                null,
            );

            expect(() => GameStateDTO.Schema.parse(dto)).toThrow();
        });

        it('should allow null values for created_at and updated_at', () => {
            const dto = new GameStateDTO(
                [],
                [],
                null,
                null,
                null,
                null,
                null,
                0,
                0,
                null,
                null,
                null,
                null,
                null,
                0,
                0,
                [],
                null,
                GameStage.Home,
                null,
                null,
                null,
                null,
                null,
            );

            expect(() => GameStateDTO.Schema.parse(dto)).not.toThrow();
        });
    });

    describe('DefaultGameStateDTO', () => {
        it('should be a valid GameStateDTO instance', () => {
            expect(GameStateDTO.Schema.safeParse(GameStateDTO.Default).success).toBe(true);
        });

        it('should have all properties set to default values', () => {
            const { Default } = GameStateDTO;

            expect(Default.selected_card_id_list).toEqual([]);
            expect(Default.dealer_card_id_list).toEqual([]);
            expect(Default.new_deck_card_list).toEqual([]);
            expect(Default.champion_player_id).toBeNull();
            expect(Default.current_player_id).toBeNull();
            expect(Default.winner_player_id).toBeNull();
            expect(Default.max_round_count).toBe(0);
            expect(Default.max_point_count).toBe(0);
            expect(Default.winner_card_id).toBeNull();
            expect(Default.host_player_id).toBeNull();
            expect(Default.dealer_card_id).toBeNull();
            expect(Default.error_message).toBeNull();
            expect(Default.round_number).toBe(0);
            expect(Default.hand_number).toBe(0);
            expect(Default.player_list).toEqual([]);
            expect(Default.created_by).toBeNull();
            expect(Default.game_stage).toBe(GameStage.Home);
            expect(Default.created_at).toBeNull();
            expect(Default.updated_at).toBeNull();
            expect(Default.session_id).toBeNull();
            expect(Default.dealer_id).toBeNull();
            expect(Default.game_code).toBeNull();
        });
    });
});
