import { valueToString } from '../../test/TestUtil';
import { CardColor } from './../card-color.enum';
import { MockData } from '../../test/MockData';

describe('CardColor Enum', () => {
    const UNKNOWN = 'unknown';
    const BLACK = 'black';
    const WHITE = 'white';
    const VALID_KEYS = ['Unknown', 'Black', 'White'];

    it('should have correct values', () => {
        expect(CardColor.Unknown).toBe(UNKNOWN);
        expect(CardColor.Black).toBe(BLACK);
        expect(CardColor.White).toBe(WHITE);
    });

    it('should contain the correct keys', () => {
        const enumKeys = Object.keys(CardColor);
        expect(enumKeys).toEqual(expect.arrayContaining(VALID_KEYS));
    });

    it('should not allow modification of enum values', () => {
        expect(() => {
            (CardColor as any).Black = 'blue';
        }).toThrow(TypeError);
    });

    it('should map correctly between keys and values', () => {
        expect(CardColor['Unknown']).toBe(UNKNOWN);
        expect(CardColor['Black']).toBe(BLACK);
        expect(CardColor['White']).toBe(WHITE);
    });

    it('should have a unique value for each key', () => {
        const values = Object.values(CardColor);
        const uniqueValues = new Set(values);
        expect(values).toHaveLength(uniqueValues.size);
    });

    // Test with mock data
    describe('Validation with Mock Data', () => {
        MockData.CardColor.Invalid.List.forEach(invalidColor => {
            it(`should reject invalid CardColor values from MockData (${valueToString(invalidColor)})`, () => {
                expect(Object.values(CardColor)).not.toContain(invalidColor);
            });
        });

        MockData.CardColor.Valid.List.forEach(validColor => {
            it(`should accept valid CardColor values from MockData (${valueToString(validColor)})`, () => {
                expect(Object.values(CardColor)).toContain(validColor);
            });
        });

        it('should handle undefined and null values appropriately', () => {
            expect(() => {
                (CardColor as any).Undefined = undefined;
            }).toThrow(TypeError);
            expect(() => {
                (CardColor as any).Null = null;
            }).toThrow(TypeError);
        });

        MockData.CardColor.Invalid.List.forEach(invalidType => {
            it(`should not allow invalid data types as CardColor (${valueToString(invalidType)})`, () => {
                expect(() => {
                    (CardColor as any).InvalidType = invalidType;
                }).toThrow(TypeError);
            });
        });
    });

    // Additional Edge Cases
    describe('Edge Cases', () => {
        const NEW_COLOR = 'red';

        it('should not allow adding new enum keys', () => {
            expect(() => {
                (CardColor as any).Red = NEW_COLOR;
            }).toThrow(TypeError);
        });

        it('should return undefined for non-existent keys', () => {
            expect((CardColor as any)[NEW_COLOR]).toBeUndefined();
            expect((CardColor as any)['Blue']).toBeUndefined();
        });

        it('should remain immutable when attempting to delete keys', () => {
            expect(() => {
                delete (CardColor as any).Black;
            }).toThrow(TypeError);
        });

        it('should correctly compare strings to enum values', () => {
            expect(CardColor.Black === BLACK).toBe(true);
        });
    });
});
