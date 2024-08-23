import { validateOrReject, ValidationError } from 'class-validator';
import { Player } from '../player.entity';
import { PlayerType } from '../../constant/player-type.enum';
import { MockData } from '../../test/MockData';
import { valueToString } from '../../test/TestUtil';

describe('Player Entity', () => {
    let player: Player;

    beforeEach(() => {
        player = new Player();
    });

    it('should initialize with default values', () => {
        expect(player.user_type).toBe(PlayerType.Unknown);
        expect(player.socket_id).toBeNull();
        expect(player.username).toBeNull();
        expect(player.score).toBe(0);
        expect(player.card_id_list).toEqual([]);
        expect(player.disconnected_at).toBeNull();
        expect(player.auth_token).toBeDefined();
    });

    describe('valid data tests', () => {
        MockData.String.Valid.ValidAlphaNumeric.forEach(validString => {
            it(`should fail valid invalid username: "${valueToString(validString)}"`, async () => {
                player.id = MockData.UUID.Valid.Value;
                player.username = validString;
                player.auth_token = MockData.UUID.Valid.Value;

                await expect(validateOrReject(player)).resolves.toBeUndefined();
            });

            it(`should accept valid socket_id: "${valueToString(validString)}"`, async () => {
                player.socket_id = validString;
                await expect(validateOrReject(player)).resolves.toBeUndefined();
            });
        });


        // Mock

        [0, 1, 2, 999].forEach(validNumber => {
            it(`should accept valid score: ${valueToString(validNumber)}`, async () => {
                player.score = validNumber as number;
                await expect(validateOrReject(player)).resolves.toBeUndefined();
            });
        });

        MockData.Date.Valid.List.forEach(validDate => {
            it(`should accept valid disconnected_at date: ${valueToString(validDate)}`, async () => {
                player.disconnected_at = validDate;
                await expect(validateOrReject(player)).resolves.toBeUndefined();
            });
        });
    });

    describe('invalid data tests', () => {
        MockData.String.Invalid.List
            .filter(invalidValue => ![undefined, null].includes(invalidValue))
            .forEach(invalidValue => {
                it(`should reject invalid socket_id: ${String(invalidValue)}`, async () => {
                    const player = new Player();
                    player.socket_id = invalidValue as any; // Do not force-cast to string

                    try {
                        await validateOrReject(player);
                        // Fail the test if no error is thrown
                        throw new Error('Validation should have failed, but it passed.');
                    } catch (errors) {
                        // Type the errors as an array of ValidationError
                        if (errors instanceof Array && errors[0] instanceof ValidationError)
                            // Check that the validation error is about the socket_id
                            // eslint-disable-next-line jest/no-conditional-expect
                            expect(errors[0].constraints).toHaveProperty('isString');
                         else
                            // Handle unexpected error types
                            throw new Error('Unexpected error format received.');

                    }
                });
            });
    });

    it('should handle edge cases for card_id_list', async () => {
        player.card_id_list = ['valid-id-1', 'valid-id-2'];
        await expect(validateOrReject(player)).resolves.toBeUndefined();

        player.card_id_list = [];
        await expect(validateOrReject(player)).resolves.toBeUndefined();

        player.card_id_list = Array(1000).fill('valid-id'); // Edge case: large array
        await expect(validateOrReject(player)).resolves.toBeUndefined();
    });

    it('should handle edge cases for auth_token generation', async () => {
        // Case 1: auth_token is null, which is valid
        player.auth_token = null;
        await expect(validateOrReject(player)).resolves.toBeUndefined();

        // Case 2: auth_token is an invalid UUID, which should throw an error
        player.auth_token = 'invalid-uuid-string'; // Simulate an invalid UUID

        await expect(validateOrReject(player)).rejects.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    property    : 'auth_token',
                    constraints : {
                        isUuid : 'auth_token must be a UUID',
                    },
                }),
            ]),
        );


        // Case 3: auth_token is a valid UUID, which should pass validation
        player.auth_token = '550e8400-e29b-41d4-a716-446655440000'; // Simulate a valid UUID
        await expect(validateOrReject(player)).resolves.toBeUndefined();
    });

});
