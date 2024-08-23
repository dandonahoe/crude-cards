import { UpdateUsernameDTO } from '../update-username.dto';
import { AuthDTO } from '../auth.dto';
import { MockData } from '../../../test/MockData';
import { valueToString } from '../../../test/TestUtil';

describe('UpdateUsernameDTO', () => {

    describe('constructor', () => {
        it('should create an UpdateUsernameDTO instance with provided values', () => {
            const username = 'new-username';
            const authToken = 'test-auth-token';

            const dto = new UpdateUsernameDTO(username, authToken);

            expect(dto.username).toBe(username);
            expect(dto.auth_token).toBe(authToken);
        });

        it('should create an UpdateUsernameDTO instance with default values', () => {
            const username = 'default-username';

            const dto = new UpdateUsernameDTO(username);

            expect(dto.username).toBe(username);
            expect(dto.auth_token).toBeUndefined();
        });
    });

    describe('schema', () => {
        MockData.String.Valid.List.forEach(validUsername => {
            it('should successfully validate and parse a valid username string', () => {
                const dto = new UpdateUsernameDTO(validUsername);

                expect(UpdateUsernameDTO.Schema.parse(dto)).toEqual(dto);
            });
        });

        MockData.String.Invalid.List
            .filter(value => ![null, undefined].includes(value))
            .forEach(invalidUsername => {
                it(`should throw an error for invalid username values (${valueToString(invalidUsername)})`, () => {
                    const dto = new UpdateUsernameDTO(invalidUsername as string);

                    expect(() => UpdateUsernameDTO.Schema.parse(dto)).toThrow();
                });
            });

        it('should successfully validate and parse a valid auth_token', () => {
            const dto = new UpdateUsernameDTO('valid-username', MockData.UUID.Valid.Value);

            expect(UpdateUsernameDTO.Schema.parse(dto)).toEqual(dto);
        });

        it('should throw an error for undefined username', () => {
            expect(() => new UpdateUsernameDTO(undefined as unknown as string)).toBeTruthy();
        });
    });

    describe('Inheritance', () => {
        it('should be an instance of AuthDTO', () => {
            const dto = new UpdateUsernameDTO('new-username', 'test-auth-token');

            expect(dto).toBeInstanceOf(AuthDTO);
        });
    });
});
