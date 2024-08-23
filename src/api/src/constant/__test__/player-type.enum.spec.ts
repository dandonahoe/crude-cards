import { valueToString } from '../../test/TestUtil';
import { PlayerType } from './../player-type.enum';
import { MockData } from '../../test/MockData';

describe('PlayerType Enum', () => {
    const UNKNOWN = 'unknown';
    const VISITOR = 'visitor';
    const PLAYER = 'player';
    const VALID_KEYS = ['Unknown', 'Visitor', 'Player'];

    it('should have correct values', () => {
        expect(PlayerType.Unknown).toBe(UNKNOWN);
        expect(PlayerType.Visitor).toBe(VISITOR);
        expect(PlayerType.Player).toBe(PLAYER);
    });

    it('should contain the correct keys', () => {
        const enumKeys = Object.keys(PlayerType);
        expect(enumKeys).toEqual(expect.arrayContaining(VALID_KEYS));
    });

    it('should not allow modification of enum values', () => {
        expect(() => {
            (PlayerType as any).Visitor = 'guest';
        }).toThrow(TypeError);
    });

    it('should map correctly between keys and values', () => {
        expect(PlayerType['Unknown']).toBe(UNKNOWN);
        expect(PlayerType['Visitor']).toBe(VISITOR);
        expect(PlayerType['Player']).toBe(PLAYER);
    });

    it('should have a unique value for each key', () => {
        const values = Object.values(PlayerType);
        const uniqueValues = new Set(values);
        expect(values).toHaveLength(uniqueValues.size);
    });

    // Test with mock data
    describe('Validation with Mock Data', () => {
        MockData.PlayerType.Invalid.List.forEach(invalidType => {
            it(`should reject invalid PlayerType values from MockData (${valueToString(invalidType)})`, () => {
                expect(Object.values(PlayerType)).not.toContain(invalidType);
            });
        });

        MockData.PlayerType.Valid.List.forEach(validType => {
            it(`should accept valid PlayerType values from MockData (${valueToString(validType)})`, () => {
                expect(Object.values(PlayerType)).toContain(validType);
            });
        });

        it('should handle undefined and null values appropriately', () => {
            expect(() => {
                (PlayerType as any).Undefined = undefined;
            }).toThrow(TypeError);
            expect(() => {
                (PlayerType as any).Null = null;
            }).toThrow(TypeError);
        });

        MockData.PlayerType.Invalid.List.forEach(invalidType => {
            it(`should not allow invalid data types as PlayerType (${valueToString(invalidType)})`, () => {
                expect(() => {
                    (PlayerType as any).InvalidType = invalidType;
                }).toThrow(TypeError);
            });
        });
    });

    // Additional Edge Cases
    describe('Edge Cases', () => {
        const NEW_TYPE = 'guest';

        it('should not allow adding new enum keys', () => {
            expect(() => {
                (PlayerType as any).Guest = NEW_TYPE;
            }).toThrow(TypeError);
        });

        it('should return undefined for non-existent keys', () => {
            expect((PlayerType as any)[NEW_TYPE]).toBeUndefined();
            expect((PlayerType as any)['Admin']).toBeUndefined();
        });

        it('should remain immutable when attempting to delete keys', () => {
            expect(() => {
                delete (PlayerType as any).Visitor;
            }).toThrow(TypeError);
        });

        it('should correctly compare strings to enum values', () => {
            expect(PlayerType.Player === PLAYER).toBe(true);
        });
    });
});
