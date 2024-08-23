import { CardColor } from '../../../constant/card-color.enum';
import { valueToString } from '../../../test/TestUtil';
import { MockData } from '../../../test/MockData';
import { CardDTO } from '../card.dto';


describe('CardDTO', () => {
    describe('constructor', () => {
        it('should create a CardDTO instance with provided values', () => {
            const id = 'test-id';
            const color = CardColor.White;
            const text = 'Test card';

            const cardDTO = new CardDTO(id, color, text);

            expect(cardDTO.id).toBe(id);
            expect(cardDTO.color).toBe(color);
            expect(cardDTO.text).toBe(text);
        });

        it('should create a CardDTO instance with default values', () => {
            const cardDTO = new CardDTO();

            expect(cardDTO.id).toBeNull();
            expect(cardDTO.color).toBeNull();
            expect(cardDTO.text).toBeNull();
        });
    });

    describe('schema', () => {
        MockData.String.Valid.List.forEach(validInput => {
            it('should successfully validate and parse a valid id string', () => {
                const cardDTO = new CardDTO();
                cardDTO.id = validInput;
                expect(CardDTO.Schema.parse(cardDTO)).toEqual(cardDTO);
            });
        });

        MockData.String.Invalid.List
            .filter(value => ![null, undefined].includes(value))
            .forEach(invalidInput => {
                it(`should throw an error for invalid id values (${valueToString(invalidInput)})`, () => {
                    const cardDTO = new CardDTO();

                    cardDTO.id = invalidInput as string;

                    expect(() => CardDTO.Schema.parse(cardDTO)).toThrow();
                });
            });

        it('should successfully validate and parse a valid null id', () => {
            const cardDTO = new CardDTO();
            cardDTO.id = null;
            expect(CardDTO.Schema.parse(cardDTO)).toEqual(cardDTO);
        });

        it('should successfully validate and parse a valid undefined id', () => {
            const cardDTO = new CardDTO();
            cardDTO.id = undefined as unknown as string;
            expect(CardDTO.Schema.parse(cardDTO)).toEqual(cardDTO);
        });

        Object.values(CardColor).forEach(validInput => {
            it(`should successfully validate and parse a valid CardColor: ${validInput}`, () => {
                const cardDTO = new CardDTO();
                cardDTO.color = validInput;
                expect(CardDTO.Schema.parse(cardDTO)).toEqual(cardDTO);
            });
        });

        MockData.String.Invalid
            .List.filter(value => ![null, undefined].includes(value))
            .forEach(invalidInput => {
                it(`should throw an error for invalid color values (${valueToString(invalidInput)})`, () => {
                    const cardDTO = new CardDTO();
                    cardDTO.color = invalidInput as CardColor;
                    expect(() => CardDTO.Schema.parse(cardDTO)).toThrow();
                });
            });

        it('should successfully validate and parse a valid null color', () => {
            const cardDTO = new CardDTO();
            cardDTO.color = null;
            expect(CardDTO.Schema.parse(cardDTO)).toEqual(cardDTO);
        });

        it('should explode  and parse a valid undefined color', () => {
            const cardDTO = new CardDTO();
            cardDTO.color = undefined as unknown as CardColor.Unknown;

            expect(() => CardDTO.Schema.parse(cardDTO)).toThrow();
        });

        MockData.String.Valid.List.forEach(validInput => {
            it('should successfully validate and parse a valid text string', () => {
                const cardDTO = new CardDTO();
                cardDTO.text = validInput;
                expect(CardDTO.Schema.parse(cardDTO)).toEqual(cardDTO);
            });
        });

        MockData.String.Invalid.List
            .filter(value => ![null, undefined].includes(value))
            .forEach(invalidInput => {
                it(`should throw an error for invalid text values ${valueToString(invalidInput)}`, () => {
                    const cardDTO = new CardDTO();
                    cardDTO.text = invalidInput as string;

                    expect(() => CardDTO.Schema.parse(cardDTO)).toThrow();
                });
            });

        it('should successfully validate and parse a valid null text', () => {
            const cardDTO = new CardDTO();
            cardDTO.text = null;
            expect(CardDTO.Schema.parse(cardDTO)).toEqual(cardDTO);
        });

        it('should successfully validate and parse a valid undefined text', () => {
            const cardDTO = new CardDTO();
            cardDTO.text = undefined as unknown as string;
            expect(() => CardDTO.Schema.parse(cardDTO)).toThrow();
        });
    });

    describe('CardDTO', () => {
        it('should be a valid CardDTO instance', () => {
            expect(CardDTO.Schema.safeParse(CardDTO.Default).success).toBe(true);
        });

        it('should have all properties as null or undefined', () => {
            expect(CardDTO.Default.id).toBeNull();
            expect(CardDTO.Default.color).toBeNull();
            expect(CardDTO.Default.text).toBeNull();
        });
    });
});
