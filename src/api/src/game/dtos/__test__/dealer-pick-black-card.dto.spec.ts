import { DealerPickBlackCardDTO } from '../dealer-pick-black-card.dto';
import { valueToString } from '../../../test/TestUtil';
import { MockData } from '../../../test/MockData';
import { AuthDTO } from '../auth.dto';

describe('DealerPickBlackCardDTO', () => {

    describe('constructor', () => {
        it('should create a DealerPickBlackCardDTO instance with provided values', () => {
            const authToken = 'test-auth-token';
            const cardId = 'test-card-id';

            const dto = new DealerPickBlackCardDTO(authToken, cardId);

            expect(dto.auth_token).toBe(authToken);
            expect(dto.card_id).toBe(cardId);
        });

        it('should create a DealerPickBlackCardDTO instance with default values', () => {
            const dto = new DealerPickBlackCardDTO();

            expect(dto.auth_token).toBeUndefined();
            expect(dto.card_id).toBeNull();
        });
    });

    describe('schema', () => {
        MockData.String.Valid.List.forEach(validInput => {
            it('should successfully validate and parse a valid card_id string', () => {
                const dto = new DealerPickBlackCardDTO();
                dto.card_id = validInput;

                expect(DealerPickBlackCardDTO.Schema.parse(dto)).toEqual(dto);
            });
        });

        MockData.String.Invalid.List
            .filter(value => ![null, undefined].includes(value))
            .forEach(invalidInput => {
                it(`should throw an error for invalid card_id values (${valueToString(invalidInput)})`, () => {
                    const dto = new DealerPickBlackCardDTO();
                    dto.card_id = invalidInput as string;

                    expect(() => DealerPickBlackCardDTO.Schema.parse(dto)).toThrow();
                });
            });

        it('should successfully validate and parse a valid null card_id', () => {
            const dto = new DealerPickBlackCardDTO();
            dto.card_id = null;

            expect(DealerPickBlackCardDTO.Schema.parse(dto)).toEqual(dto);
        });

        it('should successfully validate and parse a valid undefined card_id', () => {
            const dto = new DealerPickBlackCardDTO();
            dto.card_id = undefined as unknown as string;

            expect(() => DealerPickBlackCardDTO.Schema.parse(dto)).toThrow();
        });
    });

    describe('Inheritance', () => {
        it('should be an instance of AuthDTO', () => {
            const dto = new DealerPickBlackCardDTO('test-auth-token');

            expect(dto).toBeInstanceOf(AuthDTO);
        });
    });

    describe('DefaultDealerPickBlackCardDTO', () => {
        it('should be a valid DealerPickBlackCardDTO instance', () => {
            expect(DealerPickBlackCardDTO.Schema.safeParse(DealerPickBlackCardDTO.Default).success).toBe(true);
        });

        it('should have all properties as null or undefined', () => {
            expect(DealerPickBlackCardDTO.Default.auth_token).toBeUndefined();
            expect(DealerPickBlackCardDTO.Default.card_id).toBeNull();
        });
    });
});
