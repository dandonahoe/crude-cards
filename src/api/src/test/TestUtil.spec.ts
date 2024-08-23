import { valueToString, zodIsoDateTimeString } from "./TestUtil";


describe('valueToString', () => {
    it('should return "null" for null', () => {
        expect(valueToString(null)).toBe('null');
    });

    it('should return "undefined" for undefined', () => {
        expect(valueToString(undefined)).toBe('undefined');
    });

    it('should return "()" for functions', () => {
        expect(valueToString(() => { })).toBe('()');
    });

    it('should handle BigInt values', () => {
        expect(valueToString(BigInt(123))).toBe('123');
    });

    it('should handle Symbol values', () => {
        const sym = Symbol('test');
        expect(valueToString(sym)).toBe(sym.toString());
    });

    it('should return JSON string for objects', () => {
        const obj = { a : 1, b : 2 };
        expect(valueToString(obj)).toBe(JSON.stringify(obj));
    });

    it('should return JSON string for arrays', () => {
        const arr = [1, 2, 3];
        expect(valueToString(arr)).toBe(JSON.stringify(arr));
    });
});


describe('zodIsoDateTimeString', () => {
    const schema = zodIsoDateTimeString();

    it('should validate a correct ISO 8601 date-time string', () => {
        const validDates = [
            '2024-01-01T00:00:00Z',
            '2024-01-01T00:00:00.123Z',
            '2024-01-01T00:00:00+00:00',
            '2024-01-01T00:00:00-05:00',
            '2024-01-01T00:00:00.123+00:00',
            '2024-01-01T00:00:00.123-05:00',
        ];

        validDates.forEach(date => {
            expect(() => schema.parse(date)).not.toThrow();
        });
    });

    it('should throw an error for an incorrect ISO 8601 date-time string', () => {
        const invalidDates = [
            '2024-01-01 00:00:00Z',       // Space instead of 'T'
            '2024-01-01T00:00:00',         // Missing timezone
            '2024-01-01T00:00:00.123',     // Missing timezone
            '2024-01-01T00:00',            // Missing seconds
            '2024-01-01',                  // Date only
            '2024/01/01T00:00:00Z',        // Invalid date format
            '01-01-2024T00:00:00Z',        // Invalid date format
            '2024-01-01T00:60:00Z',        // Invalid minute value
            '2024-01-01T24:00:00Z',        // Invalid hour value
            'not-a-date',                  // Completely invalid
        ];

        invalidDates.forEach(date => {
            expect(() => schema.parse(date)).toThrow();
        });
    });

    it('should allow null values', () => {
        expect(() => schema.parse(null)).not.toThrow();
    });

    it('should throw an error for non-string values', () => {
        const nonStringValues = [
            12345,
            true,
            {},
            [],
            undefined,
        ];

        nonStringValues.forEach(value => {
            expect(() => schema.parse(value)).toThrow();
        });
    });
});
