import { valueToString } from '../../test/TestUtil';

import { MockData } from '../../test/MockData';
import { WebSocketEventType } from '../websocket-event.enum';

describe('WebSocketEventType Enum', () => {
    const UPDATE_PLAYER_VALIDATION = 'UpdatePlayerValidation';
    const DEALER_PICK_BLACK_CARD = 'DealerPickBlackCard';
    const DEALER_PICK_WINNER = 'DealerPickWinner';
    const PLAYER_SELECT_CARD = 'PlayerSelectCard';
    const MENU_ITEM_CLICKED = 'MenuItemClicked';
    const UPDATE_USERNAME = 'UpdateUsername';
    const SUBMIT_FEEDBACK = 'SubmitFeedback';
    const UPDATE_GAME = 'UpdateGame';
    const CREATE_GAME = 'CreateGame';
    const START_GAME = 'StartGame';
    const NEXT_HAND = 'NextHand';
    const JOIN_GAME = 'JoinGame';
    const EXIT_GAME = 'LeaveGame';

    const VALID_KEYS = [
        'UpdatePlayerValidation',
        'DealerPickBlackCard',
        'DealerPickWinner',
        'PlayerSelectCard',
        'MenuItemClicked',
        'UpdateUsername',
        'SubmitFeedback',
        'UpdateGame',
        'CreateGame',
        'StartGame',
        'NextHand',
        'JoinGame',
        'LeaveGame',
    ];

    it('should have correct values', () => {
        expect(WebSocketEventType.UpdatePlayerValidation).toBe(UPDATE_PLAYER_VALIDATION);
        expect(WebSocketEventType.DealerPickBlackCard).toBe(DEALER_PICK_BLACK_CARD);
        expect(WebSocketEventType.DealerPickWinner).toBe(DEALER_PICK_WINNER);
        expect(WebSocketEventType.PlayerSelectCard).toBe(PLAYER_SELECT_CARD);
        expect(WebSocketEventType.MenuItemClicked).toBe(MENU_ITEM_CLICKED);
        expect(WebSocketEventType.UpdateUsername).toBe(UPDATE_USERNAME);
        expect(WebSocketEventType.SubmitFeedback).toBe(SUBMIT_FEEDBACK);
        expect(WebSocketEventType.UpdateGame).toBe(UPDATE_GAME);
        expect(WebSocketEventType.CreateGame).toBe(CREATE_GAME);
        expect(WebSocketEventType.StartGame).toBe(START_GAME);
        expect(WebSocketEventType.NextHand).toBe(NEXT_HAND);
        expect(WebSocketEventType.JoinGame).toBe(JOIN_GAME);
        expect(WebSocketEventType.LeaveGame).toBe(EXIT_GAME);
    });

    it('should contain the correct keys', () => {
        const enumKeys = Object.keys(WebSocketEventType);
        expect(enumKeys).toEqual(expect.arrayContaining(VALID_KEYS));
    });

    it('should not allow modification of enum values', () => {
        expect(() => {
            (WebSocketEventType as any).CreateGame = 'NewGame';
        }).toThrow(TypeError);
    });

    it('should map correctly between keys and values', () => {
        expect(WebSocketEventType['UpdatePlayerValidation']).toBe(UPDATE_PLAYER_VALIDATION);
        expect(WebSocketEventType['DealerPickBlackCard']).toBe(DEALER_PICK_BLACK_CARD);
        expect(WebSocketEventType['DealerPickWinner']).toBe(DEALER_PICK_WINNER);
        expect(WebSocketEventType['PlayerSelectCard']).toBe(PLAYER_SELECT_CARD);
        expect(WebSocketEventType['MenuItemClicked']).toBe(MENU_ITEM_CLICKED);
        expect(WebSocketEventType['UpdateUsername']).toBe(UPDATE_USERNAME);
        expect(WebSocketEventType['SubmitFeedback']).toBe(SUBMIT_FEEDBACK);
        expect(WebSocketEventType['UpdateGame']).toBe(UPDATE_GAME);
        expect(WebSocketEventType['CreateGame']).toBe(CREATE_GAME);
        expect(WebSocketEventType['StartGame']).toBe(START_GAME);
        expect(WebSocketEventType['NextHand']).toBe(NEXT_HAND);
        expect(WebSocketEventType['JoinGame']).toBe(JOIN_GAME);
        expect(WebSocketEventType['LeaveGame']).toBe(EXIT_GAME);
    });

    it('should have a unique value for each key', () => {
        const values = Object.values(WebSocketEventType);
        const uniqueValues = new Set(values);
        expect(values).toHaveLength(uniqueValues.size);
    });

    // Test with mock data
    describe('Validation with Mock Data', () => {
        MockData.WebSocketEventType.Invalid.List.forEach(invalidType => {
            it(`should reject invalid WebSocketEventType values from MockData (${valueToString(invalidType)})`, () => {
                expect(Object.values(WebSocketEventType)).not.toContain(invalidType);
            });
        });

        MockData.WebSocketEventType.Valid.List.forEach(validType => {
            it(`should accept valid WebSocketEventType values from MockData (${valueToString(validType)})`, () => {
                expect(Object.values(WebSocketEventType)).toContain(validType);
            });
        });

        it('should handle undefined and null values appropriately', () => {
            expect(() => {
                (WebSocketEventType as any).Undefined = undefined;
            }).toThrow(TypeError);
            expect(() => {
                (WebSocketEventType as any).Null = null;
            }).toThrow(TypeError);
        });

        MockData.WebSocketEventType.Invalid.List.forEach(invalidType => {
            it(`should not allow invalid data types as WebSocketEventType (${valueToString(invalidType)})`, () => {
                expect(() => {
                    (WebSocketEventType as any).InvalidType = invalidType;
                }).toThrow(TypeError);
            });
        });
    });

    // Additional Edge Cases
    describe('Edge Cases', () => {
        const NEW_EVENT = 'NewEvent';

        it('should not allow adding new enum keys', () => {
            expect(() => {
                (WebSocketEventType as any).NewEvent = NEW_EVENT;
            }).toThrow(TypeError);
        });

        it('should return undefined for non-existent keys', () => {
            expect((WebSocketEventType as any)[NEW_EVENT]).toBeUndefined();
            expect((WebSocketEventType as any)['NonExistentEvent']).toBeUndefined();
        });

        it('should remain immutable when attempting to delete keys', () => {
            expect(() => {
                delete (WebSocketEventType as any).StartGame;
            }).toThrow(TypeError);
        });

        it('should correctly compare strings to enum values', () => {
            const startGameEvent = 'StartGame';
            expect(WebSocketEventType.StartGame === startGameEvent).toBe(true);
        });
    });
});
