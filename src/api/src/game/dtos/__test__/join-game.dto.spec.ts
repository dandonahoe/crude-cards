import { JoinGameDTO } from '../join-game.dto';
import { AuthDTO } from '../auth.dto';
import { MockData } from '../../../test/MockData';
import { valueToString } from '../../../test/TestUtil';

describe('JoinGameDTO', () => {

    describe('constructor', () => {
        it('should create a JoinGameDTO instance with provided values', () => {
            const authToken = 'test-auth-token';
            const gameCode = 'test-game-code';

            const dto = new JoinGameDTO(authToken, gameCode);

            expect(dto.auth_token).toBe(authToken);
            expect(dto.game_code).toBe(gameCode);
        });

        it('should create a JoinGameDTO instance with default values', () => {
            const dto = new JoinGameDTO();

            expect(dto.auth_token).toBeUndefined();
            expect(dto.game_code).toBeNull();
        });
    });

    describe('schema', () => {
        MockData.String.Valid.List.forEach(validInput => {
            it('should successfully validate and parse a valid game_code string', () => {
                const dto = new JoinGameDTO();
                dto.game_code = validInput;

                expect(JoinGameDTO.Schema.parse(dto)).toEqual(dto);
            });
        });

        MockData.String.Invalid.List
            .filter(value => ![null, undefined].includes(value))
            .forEach(invalidInput => {
                it(`should throw an error for invalid game_code values (${valueToString(invalidInput)})`, () => {
                    const dto = new JoinGameDTO();
                    dto.game_code = invalidInput as string;

                    expect(() => JoinGameDTO.Schema.parse(dto)).toThrow();
                });
            });

        it('should successfully validate and parse a valid null game_code', () => {
            const dto = new JoinGameDTO();
            dto.game_code = null;

            expect(JoinGameDTO.Schema.parse(dto)).toEqual(dto);
        });

        it('should successfully validate and parse a valid undefined game_code', () => {
            const dto = new JoinGameDTO();
            dto.game_code = undefined as unknown as string;

            expect(() => JoinGameDTO.Schema.parse(dto)).toThrow();
        });
    });

    describe('Inheritance', () => {
        it('should be an instance of AuthDTO', () => {
            const dto = new JoinGameDTO('test-auth-token');

            expect(dto).toBeInstanceOf(AuthDTO);
        });
    });

    describe('DefaultJoinGameDTO', () => {
        it('should be a valid JoinGameDTO instance', () => {
            expect(JoinGameDTO.Schema.safeParse(JoinGameDTO.Default).success).toBe(true);
        });

        it('should have all properties as null or undefined', () => {
            expect(JoinGameDTO.Default.auth_token).toBeUndefined();
            expect(JoinGameDTO.Default.game_code).toBeNull();
        });
    });
});
