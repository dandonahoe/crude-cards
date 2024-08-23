import { UtilityUI } from '@app/ui/UtilityUI';


describe('toFormattedDate', () => {
    it('should return formatted date when valid ISO date string is passed', () => {
        const date = '2024-03-05T23:41:24.902Z';

        const result = UtilityUI.toFormattedDate(date);

        expect(result).toBe('Mar 5, 2024 at 11:41 PM');
    });

    it('should return formatted date for a different valid ISO date string', () => {
        const date = '2022-12-31T12:59:59.999Z';

        const result = UtilityUI.toFormattedDate(date);

        expect(result).toBe('Dec 31, 2022 at 12:59 PM');
    });
});
