import { CardColor } from '../../constant/card-color.enum';
import { validateOrReject } from 'class-validator';
import { Card } from '../card.entity';


describe('Card Entity', () => {

    it('should create a card with default values', async () => {
        const card = new Card();


        const value = 'mwhehehhe';

        card.text = value;

        expect(card.color).toBe(CardColor.Unknown);
        expect(card.text).toBe(value)
    });

    it('should throw an error if text is null', async () => {
        const card = new Card();
        card.text = null;

        try {
            await validateOrReject(card);
        } catch (errors) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(errors).toBeInstanceOf(Array);

            if (errors instanceof Array)
                // eslint-disable-next-line jest/no-conditional-expect
                expect(errors[0].constraints).toHaveProperty('isNotEmpty');

        }
    });

    it('should not throw an error for valid non-empty text', async () => {
        const validText = 'This is a valid card text';
        const card = new Card();
        card.text = validText;

        await expect(validateOrReject(card)).resolves.not.toThrow();
        expect(card.text).toBe(validText);
    });

    it('should throw an error if an invalid color enum value is assigned', async () => {
        const card = new Card();


        await expect(() => card.color = 'InvalidColor' as CardColor).toThrow();


    });

    it('should not throw an error for valid enum color values', async () => {
        const card = new Card();

        card.text = 'This is a valid card text';

        card.color = CardColor.Black;
        await expect(validateOrReject(card)).resolves.not.toThrow();

        card.color = CardColor.White;
        await expect(validateOrReject(card)).resolves.not.toThrow();

        card.color = CardColor.Unknown;
        await expect(validateOrReject(card)).resolves.not.toThrow();
    });

    it('should allow setting valid text and color values', async () => {
        const card = new Card();
        card.text = 'This is a valid card text';
        card.color = CardColor.White;

        await expect(validateOrReject(card)).resolves.not.toThrow();
        expect(card.text).toBe('This is a valid card text');
        expect(card.color).toBe(CardColor.White);
    });

});
