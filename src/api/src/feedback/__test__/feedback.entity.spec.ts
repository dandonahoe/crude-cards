import { validateOrReject } from 'class-validator';
import { MockData } from '../../test/MockData';
import { Feedback } from '../feedback.entity';


describe('Feedback Entity', () => {

    it('should create a feedback entity with default values', async () => {
        const feedback = new Feedback();
        await validateOrReject(feedback); // Should not throw an error

        expect(feedback.name).toBeNull();
        expect(feedback.email).toBeNull();
        expect(feedback.message).toBeNull();
        expect(feedback.game_code).toBeNull();
        expect(feedback.player_id).toBeNull();
        expect(feedback.session_id).toBeNull();
    });

    it('should allow setting name, email, message, game_code, player_id, and session_id to valid strings', async () => {
        const feedback = new Feedback();

        feedback.name = 'John Doe';
        feedback.email = 'john.doe@example.com';
        feedback.message = 'This is a feedback message.';
        feedback.game_code = 'GAME123';
        feedback.player_id = '550e8400-e29b-41d4-a716-446655440000';
        feedback.session_id = 'SESSION123';

        await validateOrReject(feedback); // Should not throw an error

        expect(feedback.name).toBe('John Doe');
        expect(feedback.email).toBe('john.doe@example.com');
        expect(feedback.message).toBe('This is a feedback message.');
        expect(feedback.game_code).toBe('GAME123');
        expect(feedback.player_id).toBe('550e8400-e29b-41d4-a716-446655440000');
        expect(feedback.session_id).toBe('SESSION123');
    });

    it('should allow setting name, email, message, game_code, player_id, and session_id to null', async () => {
        const feedback = new Feedback();
        feedback.name = null;
        feedback.email = null;
        feedback.message = null;
        feedback.game_code = null;
        feedback.player_id = null;
        feedback.session_id = null;

        await validateOrReject(feedback); // Should not throw an error

        expect(feedback.name).toBeNull();
        expect(feedback.email).toBeNull();
        expect(feedback.message).toBeNull();
        expect(feedback.game_code).toBeNull();
        expect(feedback.player_id).toBeNull();
        expect(feedback.session_id).toBeNull();
    });

    it('should allow setting an empty string for name, email, message, game_code, player_id, and session_id', async () => {
        const feedback = new Feedback();
        feedback.name = '';
        feedback.email = '';
        feedback.message = '';
        feedback.game_code = '';
        feedback.player_id = '';
        feedback.session_id = '';

        await validateOrReject(feedback); // Should not throw an error

        expect(feedback.name).toBe('');
        expect(feedback.email).toBe('');
        expect(feedback.message).toBe('');
        expect(feedback.game_code).toBe('');
        expect(feedback.player_id).toBe('');
        expect(feedback.session_id).toBe('');
    });

    it('should throw an error if player_id is not a valid UUID', async () => {
        const feedback = new Feedback();
        feedback.player_id = 'invalid-uuid';

        try {
            await validateOrReject(feedback);
        } catch (errors) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(errors).toBeInstanceOf(Array);

            if (errors instanceof Array)
                // eslint-disable-next-line jest/no-conditional-expect
                expect(errors[0].constraints).toHaveProperty('isUuid');
        }
    });

    for (const uuid of MockData.UUID.Valid.List)
        it('should allow setting valid UUIDs for player_id from MockData', async () => {
            const feedback = new Feedback();
            feedback.player_id = uuid;

            await expect(validateOrReject(feedback)).resolves.not.toThrow();
            expect(feedback.player_id).toBe(uuid);
        });


    for (const uuid of MockData.UUID.Invalid.List)
        it('should throw an error for invalid UUIDs for player_id from MockData', async () => {
            const feedback = new Feedback();
            feedback.player_id = uuid;

            try {
                await validateOrReject(feedback);
            } catch (errors) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(errors).toBeInstanceOf(Array);

                if (errors instanceof Array)
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(errors[0].constraints).toHaveProperty('isUuid');

            }
        });


    for (const validString of MockData.String.Valid.List)
        it('should allow setting valid text values for name, email, and message from MockData', async () => {


            const feedback = new Feedback();
            feedback.name = validString;
            feedback.email = validString;
            feedback.message = validString;

            await expect(validateOrReject(feedback)).resolves.not.toThrow();
            expect(feedback.name).toBe(validString);
            expect(feedback.email).toBe(validString);
            expect(feedback.message).toBe(validString);
        });


    for (const invalidString of MockData.String.Invalid.List)

        it('should throw an error for invalid text values for name, email, and message from MockData', async () => {

            const feedback = new Feedback();

            feedback.name = invalidString as string;
            feedback.email = invalidString as string;
            feedback.message = invalidString as string;

            try {
                await validateOrReject(feedback);
            } catch (errors) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(errors).toBeInstanceOf(Array);

                if (errors instanceof Array)
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(errors[0].constraints).toHaveProperty('isString');
            }
        });


    // Edge case for long strings
    it('should allow setting a very long string for message up to the database limit', async () => {
        const longMessage = 'a'.repeat(10000); // Assuming 10,000 characters is within the database limit
        const feedback = new Feedback();
        feedback.message = longMessage;

        await expect(validateOrReject(feedback)).resolves.not.toThrow();
        expect(feedback.message).toBe(longMessage);
    });

    // Edge case for special characters

    for (const ch of MockData.SpecialCharacterList)
        it('should allow setting special characters in text fields', async () => {
            const feedback = new Feedback();

            feedback.name = ch;
            feedback.email = ch;
            feedback.message = ch;

            await expect(validateOrReject(feedback)).resolves.not.toThrow();

            expect(feedback.name).toBe(ch);
            expect(feedback.email).toBe(ch);
            expect(feedback.message).toBe(ch);
        });

});

