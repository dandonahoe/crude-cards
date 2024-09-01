import { valueToString } from '../../../test/TestUtil';
import { MockData } from '../../../test/MockData';
import { LeaveGameDTO } from '../leave-game.dto';
import { AuthDTO } from '../auth.dto';

describe('LeaveGameDTO', () => {

    describe('constructor', () => {
        it('should create an LeaveGameDTO instance with provided auth_token', () => {
            const authToken = 'test-auth-token';

            const dto = new LeaveGameDTO(authToken);

            expect(dto.auth_token).toBe(authToken);
        });

        it('should create an LeaveGameDTO instance with default values', () => {
            const dto = new LeaveGameDTO();

            expect(dto.auth_token).toBeUndefined();
        });
    });

    describe('schema', () => {
        MockData.UUID.Valid.List.forEach(validInput => {
            it(`should successfully validate and parse a valid auth_token string (${valueToString(validInput)})`, () => {

                const dto = new LeaveGameDTO();
                dto.auth_token = validInput;

                expect(LeaveGameDTO.Schema.parse(dto)).toEqual(dto);
            });
        });

        MockData.UUID.Invalid.List.forEach(invalidInput => {
            it(`should throw an error for invalid auth_token values (${valueToString(invalidInput)})`, () => {
                const dto = new LeaveGameDTO();
                dto.auth_token = invalidInput as string;

                expect(() => LeaveGameDTO.Schema.parse(dto)).toThrow();
            });
        });

        it('should successfully validate and parse a valid null auth_token', () => {
            const dto = new LeaveGameDTO();
            dto.auth_token = null as unknown as string;

            expect(() => LeaveGameDTO.Schema.parse(dto)).toThrow();
        });

        it('should successfully validate and parse a valid undefined auth_token', () => {
            const dto = new LeaveGameDTO();
            dto.auth_token = undefined as unknown as string;

            expect(LeaveGameDTO.Schema.parse(dto)).toEqual(dto);
        });
    });

    describe('Inheritance', () => {
        it('should be an instance of AuthDTO', () => {
            const dto = new LeaveGameDTO('test-auth-token');

            expect(dto).toBeInstanceOf(AuthDTO);
        });
    });
});
