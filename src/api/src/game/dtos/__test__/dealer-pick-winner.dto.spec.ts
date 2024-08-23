import { DealerPickWinnerDTO } from '../dealer-pick-winner.dto';
import { valueToString } from '../../../test/TestUtil';
import { MockData } from '../../../test/MockData';
import { AuthDTO } from '../auth.dto';

describe('DealerPickWinnerDTO', () => {

    describe('constructor', () => {
        it('should create a DealerPickWinnerDTO instance with provided values', () => {
            const authToken = 'test-auth-token';
            const cardId = 'test-card-id';

            const dto = new DealerPickWinnerDTO(authToken, cardId);

            expect(dto.auth_token).toBe(authToken);
            expect(dto.card_id).toBe(cardId);
        });

        it('should create a DealerPickWinnerDTO instance with default values', () => {
            const dto = new DealerPickWinnerDTO();

            expect(dto.auth_token).toBeUndefined();
            expect(dto.card_id).toBeNull();
        });
    });

    describe('schema', () => {
        MockData.String.Valid.List.forEach(validInput => {
            it('should successfully validate and parse a valid card_id string', () => {
                const dto = new DealerPickWinnerDTO();
                dto.card_id = validInput;

                expect(DealerPickWinnerDTO.Schema.parse(dto)).toEqual(dto);
            });
        });

        MockData.String.Invalid.List
            .filter(value => ![null, undefined].includes(value))
            .forEach(invalidInput => {
                it(`should throw an error for invalid card_id values (${valueToString(invalidInput)})`, () => {
                    const dto = new DealerPickWinnerDTO();
                    dto.card_id = invalidInput as string;

                    expect(() => DealerPickWinnerDTO.Schema.parse(dto)).toThrow();
                });
            });

        it('should successfully validate and parse a valid null card_id', () => {
            const dto = new DealerPickWinnerDTO();
            dto.card_id = null;

            expect(DealerPickWinnerDTO.Schema.parse(dto)).toEqual(dto);
        });

        it('should successfully validate and parse a valid undefined card_id', () => {
            const dto = new DealerPickWinnerDTO();
            dto.card_id = undefined as unknown as string;

            expect(() => DealerPickWinnerDTO.Schema.parse(dto)).toThrow();
        });
    });

    describe('Inheritance', () => {
        it('should be an instance of AuthDTO', () => {
            const dto = new DealerPickWinnerDTO('test-auth-token');

            expect(dto).toBeInstanceOf(AuthDTO);
        });
    });

    describe('DefaultDealerPickWinnerDTO', () => {
        it('should be a valid DealerPickWinnerDTO instance', () => {
            expect(DealerPickWinnerDTO.Schema.safeParse(DealerPickWinnerDTO.Default).success).toBe(true);
        });

        it('should have all properties as null or undefined', () => {
            expect(DealerPickWinnerDTO.Default.auth_token).toBeUndefined();
            expect(DealerPickWinnerDTO.Default.card_id).toBeNull();
        });
    });
});
