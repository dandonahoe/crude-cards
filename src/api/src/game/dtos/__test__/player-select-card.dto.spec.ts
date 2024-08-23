import { PlayerSelectCardDTO } from '../player-select-card.dto';
import { AuthDTO } from '../auth.dto';
import { MockData } from '../../../test/MockData';
import { valueToString } from '../../../test/TestUtil';

describe('PlayerSelectCardDTO', () => {

    describe('constructor', () => {
        it('should create a PlayerSelectCardDTO instance with provided values', () => {
            const authToken = 'test-auth-token';
            const cardId = 'test-card-id';

            const dto = new PlayerSelectCardDTO(authToken, cardId);

            expect(dto.auth_token).toBe(authToken);
            expect(dto.card_id).toBe(cardId);
        });

        it('should create a PlayerSelectCardDTO instance with default values', () => {
            const dto = new PlayerSelectCardDTO();

            expect(dto.auth_token).toBeUndefined();
            expect(dto.card_id).toBeNull();
        });
    });

    describe('schema', () => {
        MockData.String.Valid.List.forEach(validInput => {
            it('should successfully validate and parse a valid card_id string', () => {
                const dto = new PlayerSelectCardDTO();
                dto.card_id = validInput;

                expect(PlayerSelectCardDTO.Schema.parse(dto)).toEqual(dto);
            });
        });

        MockData.String.Invalid.List
            .filter(value => ![null, undefined].includes(value))
            .forEach(invalidInput => {
                it(`should throw an error for invalid card_id values (${valueToString(invalidInput)})`, () => {
                    const dto = new PlayerSelectCardDTO();
                    dto.card_id = invalidInput as string;

                    expect(() => PlayerSelectCardDTO.Schema.parse(dto)).toThrow();
                });
            });

        it('should successfully validate and parse a valid null card_id', () => {
            const dto = new PlayerSelectCardDTO();
            dto.card_id = null;

            expect(PlayerSelectCardDTO.Schema.parse(dto)).toEqual(dto);
        });

        it('should successfully validate and parse a valid undefined card_id', () => {
            const dto = new PlayerSelectCardDTO();
            dto.card_id = undefined as unknown as string;

            expect(() => PlayerSelectCardDTO.Schema.parse(dto)).toThrow();
        });

        it('should successfully validate and parse a valid undefined auth_token', () => {
            const dto = new PlayerSelectCardDTO();
            dto.auth_token = undefined as unknown as string;

            expect(PlayerSelectCardDTO.Schema.parse(dto)).toEqual(dto);
        });
    });

    describe('Inheritance', () => {
        it('should be an instance of AuthDTO', () => {
            const dto = new PlayerSelectCardDTO('test-auth-token');

            expect(dto).toBeInstanceOf(AuthDTO);
        });
    });

    describe('DefaultPlayerSelectCardDTO', () => {
        it('should be a valid PlayerSelectCardDTO instance', () => {
            expect(PlayerSelectCardDTO.Schema.safeParse(PlayerSelectCardDTO.Default).success).toBe(true);
        });

        it('should have all properties as null or undefined', () => {
            expect(PlayerSelectCardDTO.Default.auth_token).toBeUndefined();
            expect(PlayerSelectCardDTO.Default.card_id).toBeNull();
        });
    });
});
