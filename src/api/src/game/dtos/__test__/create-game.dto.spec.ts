import { valueToString } from '../../../test/TestUtil';
import { CreateGameDTO } from '../create-game.dto';
import { MockData } from '../../../test/MockData';
import { AuthDTO } from '../auth.dto';
import { v4 as uuid } from 'uuid';


describe('CreateGameDTO', () => {

    describe('constructor', () => {
        it('should create a CreateGameDTO instance with provided auth_token', () => {
            const authToken = uuid();

            const createGameDTO = new CreateGameDTO(authToken);

            expect(createGameDTO.auth_token).toBe(authToken);
        });

        it('should create a CreateGameDTO instance with default values', () => {
            const createGameDTO = new CreateGameDTO();

            expect(createGameDTO.auth_token).toBeUndefined();
        });
    });

    describe('schema', () => {
        MockData.UUID.Valid.List.forEach(validInput => {
            it('should successfully validate and parse a valid auth_token string', () => {
                const createGameDTO = new CreateGameDTO();
                createGameDTO.auth_token = validInput;

                expect(CreateGameDTO.Schema.parse(createGameDTO)).toEqual(createGameDTO);
            });
        });

        MockData.UUID.Invalid.List
            .forEach(invalidInput => {
                it(`should throw an error for invalid auth_token values (${valueToString(invalidInput)})`, () => {
                    const createGameDTO = new CreateGameDTO();
                    createGameDTO.auth_token = invalidInput as string;

                    expect(() => CreateGameDTO.Schema.parse(createGameDTO)).toThrow();
                });
            });

        it('should successfully validate and parse a valid null auth_token', () => {
            const createGameDTO = new CreateGameDTO();
            createGameDTO.auth_token = null as unknown as string;

            expect(() => CreateGameDTO.Schema.parse(createGameDTO)).toThrow();
        });

        it('should successfully validate and parse a valid undefined auth_token', () => {
            const createGameDTO = new CreateGameDTO();
            createGameDTO.auth_token = undefined as unknown as string;

            expect(CreateGameDTO.Schema.parse(createGameDTO)).toEqual(createGameDTO);
        });
    });

    describe('Inheritance', () => {
        it('should be an instance of AuthDTO', () => {
            const createGameDTO = new CreateGameDTO(uuid());

            expect(createGameDTO).toBeInstanceOf(AuthDTO);
        });
    });
});
