import { GamePopupType } from './../game-popup-type.enum';
import { valueToString } from '../../test/TestUtil';
import { MockData } from '../../test/MockData';

// Assuming MockData has been updated to include GamePopupType tests as well.
describe('GamePopupType Enum', () => {

    const SCOREBOARD = 'Scoreboard';
    const SETTINGS = 'Settings';
    const FEEDBACK = 'Feedback';
    const UNKNOWN = 'Unknown';
    const LEAVE = 'Leave';
    const VALID_KEYS = ['Scoreboard', 'Settings', 'Feedback', 'Unknown', 'Leave'];

    it('should have correct values', () => {
        expect(GamePopupType.Scoreboard).toBe(SCOREBOARD);
        expect(GamePopupType.Settings).toBe(SETTINGS);
        expect(GamePopupType.Feedback).toBe(FEEDBACK);
        expect(GamePopupType.Unknown).toBe(UNKNOWN);
        expect(GamePopupType.Leave).toBe(LEAVE);
    });

    it('should contain the correct keys', () => {
        const enumKeys = Object.keys(GamePopupType);
        expect(enumKeys).toEqual(expect.arrayContaining(VALID_KEYS));
    });

    it('should not allow modification of enum values', () => {
        expect(() => {
            (GamePopupType as any).Scoreboard = 'GameOver';
        }).toThrow(TypeError);
    });

    it('should map correctly between keys and values', () => {
        expect(GamePopupType['Scoreboard']).toBe(SCOREBOARD);
        expect(GamePopupType['Settings']).toBe(SETTINGS);
        expect(GamePopupType['Feedback']).toBe(FEEDBACK);
        expect(GamePopupType['Unknown']).toBe(UNKNOWN);
        expect(GamePopupType['Leave']).toBe(LEAVE);
    });

    it('should have a unique value for each key', () => {
        const values = Object.values(GamePopupType);
        const uniqueValues = new Set(values);
        expect(values).toHaveLength(uniqueValues.size);
    });

    // Test with mock data
    describe('Validation with Mock Data', () => {
        MockData.GamePopupType.Invalid.List.forEach(invalidType => {
            it(`should reject invalid GamePopupType values from MockData (${valueToString(invalidType)})`, () => {
                expect(Object.values(GamePopupType)).not.toContain(invalidType);
            });
        });

        MockData.GamePopupType.Valid.List.forEach(validType => {
            it(`should accept valid GamePopupType values from MockData (${valueToString(validType)})`, () => {
                expect(Object.values(GamePopupType)).toContain(validType);
            });
        });

        it('should handle undefined and null values appropriately', () => {
            expect(() => {
                (GamePopupType as any).Undefined = undefined;
            }).toThrow(TypeError);
            expect(() => {
                (GamePopupType as any).Null = null;
            }).toThrow(TypeError);
        });

        MockData.GamePopupType.Invalid.List.forEach(invalidType => {
            it(`should not allow invalid data types as GamePopupType (${valueToString(invalidType)})`, () => {
                expect(() => {
                    (GamePopupType as any).InvalidType = invalidType;
                }).toThrow(TypeError);
            });
        });
    });

    // Additional Edge Cases
    describe('Edge Cases', () => {
        const NEW_TYPE = 'GameOver';

        it('should not allow adding new enum keys', () => {
            expect(() => {
                (GamePopupType as any).GameOver = NEW_TYPE;
            }).toThrow(TypeError);
        });

        it('should return undefined for non-existent keys', () => {
            expect((GamePopupType as any)['GameOver']).toBeUndefined();
            expect((GamePopupType as any)['Pause']).toBeUndefined();
        });

        it('should remain immutable when attempting to delete keys', () => {
            expect(() => {
                delete (GamePopupType as any).Leave;
            }).toThrow(TypeError);
        });

        it('should correctly compare strings to enum values', () => {
            const leaveType = 'Leave';
            expect(GamePopupType.Leave === leaveType).toBe(true);
        });
    });
});
