import { valueToString } from '../../test/TestUtil';
import { GameStage } from './../game-stage.enum';
import { MockData } from '../../test/MockData';

describe('GameStage Enum', () => {
    const PLAYER_PICK_WHITE_CARD = 'player_pick_white_card';
    const DEALER_PICK_BLACK_CARD = 'dealer_pick_black_card';
    const DEALER_PICK_WINNER = 'dealer_pick_winner';
    const GAME_COMPLETE = 'game_complete';
    const GAME_RESULTS = 'game_results';
    const UNKNOWN = 'unknown';
    const LOBBY = 'lobby';
    const HOME = 'home';
    const VALID_KEYS = [
        'PlayerPickWhiteCard',
        'DealerPickBlackCard',
        'DealerPickWinner',
        'GameComplete',
        'GameResults',
        'Unknown',
        'Lobby',
        'Home',
    ];

    it('should have correct values', () => {
        expect(GameStage.PlayerPickWhiteCard).toBe(PLAYER_PICK_WHITE_CARD);
        expect(GameStage.DealerPickBlackCard).toBe(DEALER_PICK_BLACK_CARD);
        expect(GameStage.DealerPickWinner).toBe(DEALER_PICK_WINNER);
        expect(GameStage.GameComplete).toBe(GAME_COMPLETE);
        expect(GameStage.GameResults).toBe(GAME_RESULTS);
        expect(GameStage.Unknown).toBe(UNKNOWN);
        expect(GameStage.Lobby).toBe(LOBBY);
        expect(GameStage.Home).toBe(HOME);
    });

    it('should contain the correct keys', () => {
        const enumKeys = Object.keys(GameStage);
        expect(enumKeys).toEqual(expect.arrayContaining(VALID_KEYS));
    });

    it('should not allow modification of enum values', () => {
        expect(() => {
            (GameStage as any).GameComplete = 'in_progress';
        }).toThrow(TypeError);
    });

    it('should map correctly between keys and values', () => {
        expect(GameStage['PlayerPickWhiteCard']).toBe(PLAYER_PICK_WHITE_CARD);
        expect(GameStage['DealerPickBlackCard']).toBe(DEALER_PICK_BLACK_CARD);
        expect(GameStage['DealerPickWinner']).toBe(DEALER_PICK_WINNER);
        expect(GameStage['GameComplete']).toBe(GAME_COMPLETE);
        expect(GameStage['GameResults']).toBe(GAME_RESULTS);
        expect(GameStage['Unknown']).toBe(UNKNOWN);
        expect(GameStage['Lobby']).toBe(LOBBY);
        expect(GameStage['Home']).toBe(HOME);
    });

    it('should have a unique value for each key', () => {
        const values = Object.values(GameStage);
        const uniqueValues = new Set(values);
        expect(values).toHaveLength(uniqueValues.size);
    });

    // Test with mock data
    describe('Validation with Mock Data', () => {
        MockData.GameStage.Invalid.List.forEach(invalidStage => {
            it(`should reject invalid GameStage values from MockData (${valueToString(invalidStage)})`, () => {
                expect(Object.values(GameStage)).not.toContain(invalidStage);
            });
        });

        MockData.GameStage.Valid.List.forEach(validStage => {
            it(`should accept valid GameStage values from MockData (${valueToString(validStage)})`, () => {
                expect(Object.values(GameStage)).toContain(validStage);
            });
        });

        it('should handle undefined and null values appropriately', () => {
            expect(() => {
                (GameStage as any).Undefined = undefined;
            }).toThrow(TypeError);
            expect(() => {
                (GameStage as any).Null = null;
            }).toThrow(TypeError);
        });

        MockData.GameStage.Invalid.List.forEach(invalidType => {
            it(`should not allow invalid data types as GameStage (${valueToString(invalidType)})`, () => {
                expect(() => {
                    (GameStage as any).InvalidType = invalidType;
                }).toThrow(TypeError);
            });
        });
    });

    // Additional Edge Cases
    describe('Edge Cases', () => {
        const NEW_STAGE = 'in_progress';

        it('should not allow adding new enum keys', () => {
            expect(() => {
                (GameStage as any).InProgress = NEW_STAGE;
            }).toThrow(TypeError);
        });

        it('should return undefined for non-existent keys', () => {
            expect((GameStage as any)[NEW_STAGE]).toBeUndefined();
            expect((GameStage as any)['Paused']).toBeUndefined();
        });

        it('should remain immutable when attempting to delete keys', () => {
            expect(() => {
                delete (GameStage as any).Lobby;
            }).toThrow(TypeError);
        });

        it('should correctly compare strings to enum values', () => {
            expect(GameStage.Lobby === LOBBY).toBe(true);
        });
    });
});
