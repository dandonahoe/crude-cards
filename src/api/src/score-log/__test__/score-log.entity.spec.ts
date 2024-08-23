import { ScoreLog } from "../score-log.entity";


describe('ScoreLog Entity', () => {
    describe('constructor', () => {
        it('should create a ScoreLog instance with default values', () => {
            const scoreLog = new ScoreLog();

            expect(scoreLog.winner_card_id).toBeNull();
            expect(scoreLog.game_session_id).toBeNull();
            expect(scoreLog.judge_player_id).toBeNull();
            expect(scoreLog.winner_player_id).toBeNull();
            expect(scoreLog.player_selected_cards).toEqual([]);
        });

        it('should create a ScoreLog instance with provided values', () => {
            const initData = {
                winner_card_id        : '123e4567-e89b-12d3-a456-426614174000',
                game_session_id       : '123e4567-e89b-12d3-a456-426614174001',
                judge_player_id       : '123e4567-e89b-12d3-a456-426614174002',
                winner_player_id      : '123e4567-e89b-12d3-a456-426614174003',
                player_selected_cards : ['card1', 'card2'],
            };

            const scoreLog = new ScoreLog(initData);

            expect(scoreLog.winner_card_id).toBe(initData.winner_card_id);
            expect(scoreLog.game_session_id).toBe(initData.game_session_id);
            expect(scoreLog.judge_player_id).toBe(initData.judge_player_id);
            expect(scoreLog.winner_player_id).toBe(initData.winner_player_id);
            expect(scoreLog.player_selected_cards).toEqual(initData.player_selected_cards);
        });

        it('should allow partial updates through the constructor', () => {
            const scoreLog = new ScoreLog({ winner_card_id : '123e4567-e89b-12d3-a456-426614174000' });

            expect(scoreLog.winner_card_id).toBe('123e4567-e89b-12d3-a456-426614174000');
            expect(scoreLog.game_session_id).toBeNull();
            expect(scoreLog.judge_player_id).toBeNull();
            expect(scoreLog.winner_player_id).toBeNull();
            expect(scoreLog.player_selected_cards).toEqual([]);
        });
    });

    describe('player_selected_cards', () => {
        it('should default to an empty array if not provided', () => {
            const scoreLog = new ScoreLog();

            expect(scoreLog.player_selected_cards).toEqual([]);
        });

        it('should store an array of card IDs', () => {
            const scoreLog = new ScoreLog({ player_selected_cards : ['card1', 'card2'] });

            expect(scoreLog.player_selected_cards).toEqual(['card1', 'card2']);
        });
    });
});
