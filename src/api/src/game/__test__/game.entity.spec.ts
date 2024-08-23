import { Game } from "../game.entity";


describe('Game Entity', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    it('should have a default value of 0 for max_round_count', () => {
        expect(game.max_round_count).toBe(0);
    });

    it('should allow setting max_round_count', () => {
        game.max_round_count = 5;
        expect(game.max_round_count).toBe(5);
    });

    it('should have a default value of 0 for max_point_count', () => {
        expect(game.max_point_count).toBe(0);
    });

    it('should allow setting max_point_count', () => {
        game.max_point_count = 10;
        expect(game.max_point_count).toBe(10);
    });

    it('should have a default value of null for host_player_id', () => {
        expect(game.host_player_id).toBeNull();
    });

    it('should allow setting host_player_id', () => {
        game.host_player_id = 'player-123';
        expect(game.host_player_id).toBe('player-123');
    });

    it('should have a default value of null for game_code', () => {
        expect(game.game_code).toBeNull();
    });

    it('should allow setting game_code', () => {
        game.game_code = 'ABC123';
        expect(game.game_code).toBe('ABC123');
    });

    it('should have a default value of null for current_session_id', () => {
        expect(game.current_session_id).toBeNull();
    });

    it('should allow setting current_session_id', () => {
        game.current_session_id = 'session-uuid';
        expect(game.current_session_id).toBe('session-uuid');
    });

    it('should be an instance of Game', () => {
        expect(game).toBeInstanceOf(Game);
    });
});
