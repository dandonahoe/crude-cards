import { SubmitFeedbackDTO } from '../submit-feedback.dto';
import { AuthDTO } from '../auth.dto';
import { MockData } from '../../../test/MockData';
import { valueToString } from '../../../test/TestUtil';

describe('SubmitFeedbackDTO', () => {

    describe('constructor', () => {
        it('should create a SubmitFeedbackDTO instance with provided values', () => {
            const authToken = 'test-auth-token';
            const message = 'This is feedback';
            const email = 'test@example.com';
            const name = 'John Doe';

            const dto = new SubmitFeedbackDTO(authToken, message, email, name);

            expect(dto.auth_token).toBe(authToken);
            expect(dto.message).toBe(message);
            expect(dto.email).toBe(email);
            expect(dto.name).toBe(name);
        });

        it('should create a SubmitFeedbackDTO instance with default values', () => {
            const dto = new SubmitFeedbackDTO();

            expect(dto.auth_token).toBeUndefined();
            expect(dto.message).toBeNull();
            expect(dto.email).toBeNull();
            expect(dto.name).toBeNull();
        });
    });

    describe('schema', () => {
        MockData.String.Valid.List.forEach(validInput => {
            it('should successfully validate and parse a valid message string', () => {
                const dto = new SubmitFeedbackDTO(undefined, validInput);

                expect(SubmitFeedbackDTO.Schema.parse(dto)).toEqual(dto);
            });

            it('should successfully validate and parse a valid email string', () => {
                const dto = new SubmitFeedbackDTO(undefined, null, validInput);

                expect(SubmitFeedbackDTO.Schema.parse(dto)).toEqual(dto);
            });

            it('should successfully validate and parse a valid name string', () => {
                const dto = new SubmitFeedbackDTO(undefined, null, null, validInput);

                expect(SubmitFeedbackDTO.Schema.parse(dto)).toEqual(dto);
            });
        });

        MockData.String.Invalid.List
            .filter(value => ![null, undefined].includes(value))
            .forEach(invalidInput => {
                it(`should throw an error for invalid message values (${valueToString(invalidInput)})`, () => {
                    const dto = new SubmitFeedbackDTO(undefined, invalidInput as string);

                    expect(() => SubmitFeedbackDTO.Schema.parse(dto)).toThrow();
                });

                it(`should throw an error for invalid email values (${valueToString(invalidInput)})`, () => {
                    const dto = new SubmitFeedbackDTO(undefined, null, invalidInput as string);

                    expect(() => SubmitFeedbackDTO.Schema.parse(dto)).toThrow();
                });

                it(`should throw an error for invalid name values (${valueToString(invalidInput)})`, () => {
                    const dto = new SubmitFeedbackDTO(undefined, null, null, invalidInput as string);

                    expect(() => SubmitFeedbackDTO.Schema.parse(dto)).toThrow();
                });
            });

        it('should successfully validate and parse a valid null values', () => {
            const dto = new SubmitFeedbackDTO(undefined, null, null, null);

            expect(SubmitFeedbackDTO.Schema.parse(dto)).toEqual(dto);
        });

        it('should successfully validate and parse a valid undefined values', () => {
            const dto = new SubmitFeedbackDTO(
                undefined,
                 undefined as unknown as string,
                 undefined as unknown as string,
                 undefined as unknown as string);

            expect(SubmitFeedbackDTO.Schema.parse(dto)).toEqual(new SubmitFeedbackDTO());
        });
    });

    describe('Inheritance', () => {
        it('should be an instance of AuthDTO', () => {
            const dto = new SubmitFeedbackDTO('test-auth-token');

            expect(dto).toBeInstanceOf(AuthDTO);
        });
    });

    describe('DefaultSubmitFeedbackDTO', () => {
        it('should be a valid SubmitFeedbackDTO instance', () => {
            expect(SubmitFeedbackDTO.Schema.safeParse(SubmitFeedbackDTO.Default).success).toBe(true);
        });

        it('should have all properties as null or undefined', () => {
            expect(SubmitFeedbackDTO.Default.auth_token).toBeUndefined();
            expect(SubmitFeedbackDTO.Default.message).toBeNull();
            expect(SubmitFeedbackDTO.Default.email).toBeNull();
            expect(SubmitFeedbackDTO.Default.name).toBeNull();
        });
    });
});
