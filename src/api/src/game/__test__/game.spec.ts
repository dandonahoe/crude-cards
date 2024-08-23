import { Game } from '../game.entity'; // Assuming your entity file is named game.entity.ts

describe('Game DTO', () => {
    it('should create a Game instance with valid data', () => {
        const game = new Game();
        game.max_round_count = 10;
        game.max_point_count = 20;
        game.host_player_id = 'player123';
        game.game_code = 'uniqueCode';

        expect(game.max_round_count).toBe(10);
        expect(game.max_point_count).toBe(20);
        expect(game.host_player_id).toBe('player123');
        expect(game.game_code).toBe('uniqueCode');
    });

    it('should create a Game instance with null host_player_id', () => {
        const game = new Game();
        game.max_round_count = 10;
        game.max_point_count = 20;
        game.game_code = 'uniqueCode';

        expect(game.host_player_id).toBeNull();
    });

    it('should create a Game instance with null current_session_id', () => {
        const game = new Game();
        game.max_round_count = 10;
        game.max_point_count = 20;
        game.host_player_id = 'player123';
        game.game_code = 'uniqueCode';


        expect(game.current_session_id).toBeNull();
    });
});
