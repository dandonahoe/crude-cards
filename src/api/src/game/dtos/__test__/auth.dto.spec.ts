import { valueToString } from '../../../test/TestUtil';
import { MockData } from '../../../test/MockData';
import { AuthDTO } from '../auth.dto';

describe('AuthDTO', () => {

    MockData.UnserializableList.forEach(invalidInput => {
        it('should throw an error for invalid modelId values when defaultValue is also undefined', () => {
            const authDTO = new AuthDTO();

            authDTO.auth_token = invalidInput as unknown as string;

            expect(() => AuthDTO.Schema.parse(authDTO)).toThrow();
        });
    });

    MockData.UUID.Valid.List.forEach(validInput => {
        it(`should not throw an error for valid auth_token values ${validInput}`, () => {
            const authDTO = new AuthDTO();

            authDTO.auth_token = validInput;

            expect(AuthDTO.Schema.parse(authDTO)).toEqual(authDTO);
        })
    });

    MockData.UUID.Invalid.List.
        forEach(invalidInput => {
            it(`should throw an error for invalid auth_token values (${valueToString(invalidInput)})`, () => {
                const authDTO = new AuthDTO();

                authDTO.auth_token = invalidInput as unknown as string;

                expect(() => AuthDTO.Schema.parse(authDTO)).toThrow();
            });
        });

    MockData.Boolean.Valid.List.forEach(validInput => {
        it(`should throw an error for invalid auth_token values (${valueToString(validInput)})`, () => {
            const authDTO = new AuthDTO();

            authDTO.auth_token = validInput as unknown as string;

            expect(() => AuthDTO.Schema.parse(true)).toThrow();
        });
    });
});
