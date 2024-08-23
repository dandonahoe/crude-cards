import { PlayerDTO } from '../player.dto';

describe('PlayerDTO', () => {

    describe('constructor', () => {
        it('should create a PlayerDTO instance with provided values', () => {
            const disconnectedAt = '2024-01-01T00:00:00Z';
            const cardIdList = ['card1', 'card2'];
            const socketId = 'socket-id';
            const username = 'test-user';
            const score = 10;
            const id = 'player-id';

            const dto = new PlayerDTO(disconnectedAt, cardIdList, socketId, username, score, id);

            expect(dto.disconnected_at).toBe(disconnectedAt);
            expect(dto.card_id_list).toEqual(cardIdList);
            expect(dto.socket_id).toBe(socketId);
            expect(dto.username).toBe(username);
            expect(dto.score).toBe(score);
            expect(dto.id).toBe(id);
        });

        it('should create a PlayerDTO instance with default values', () => {
            const dto = new PlayerDTO();

            expect(dto.disconnected_at).toBeNull();
            expect(dto.card_id_list).toEqual([]);
            expect(dto.socket_id).toBeNull();
            expect(dto.username).toBeNull();
            expect(dto.score).toBe(0);
            expect(dto.id).toBeNull();
        });
    });

    describe('schema', () => {
        it('should successfully validate and parse a valid PlayerDTO instance', () => {
            const dto = new PlayerDTO('2024-01-01T00:00:00Z', ['card1', 'card2'], 'socket-id', 'test-user', 10, 'player-id');
            expect(PlayerDTO.Schema.parse(dto)).toEqual(dto);
        });

        it('should throw an error for invalid disconnected_at values', () => {
            const dto = new PlayerDTO('invalid-date', [], null, null, 0, null);
            expect(() => PlayerDTO.Schema.parse(dto)).toThrow();
        });

        it('should throw an error for invalid card_id_list values', () => {
            const dto = new PlayerDTO(null, ['valid-card-id', 123 as unknown as string], null, null, 0, null);
            expect(() => PlayerDTO.Schema.parse(dto)).toThrow();
        });

        it('should throw an error for invalid score values', () => {
            const dto = new PlayerDTO(null, [], null, null, 'invalid-score' as unknown as number, null);
            expect(() => PlayerDTO.Schema.parse(dto)).toThrow();
        });

        it('should successfully validate and parse a valid null values', () => {
            const dto = new PlayerDTO(null, [], null, null, 0, null);
            expect(PlayerDTO.Schema.parse(dto)).toEqual(dto);
        });

        it('should successfully validate and parse a valid undefined values', () => {
            const dto = new PlayerDTO(
                undefined as unknown as string,
                 [],
                 undefined as unknown as string,
                 undefined as unknown as string,
                 0,
                 undefined as unknown as string,
            );

            expect(PlayerDTO.Schema.parse(dto)).toEqual(dto);
        });
    });

    describe('DefaultPlayerDTO', () => {
        it('should be a valid PlayerDTO instance', () => {
            expect(PlayerDTO.Schema.safeParse(PlayerDTO.Default).success).toBe(true);
        });

        it('should have all properties as null, empty array, or zero', () => {
            expect(PlayerDTO.Default.disconnected_at).toBeNull();
            expect(PlayerDTO.Default.card_id_list).toEqual([]);
            expect(PlayerDTO.Default.socket_id).toBeNull();
            expect(PlayerDTO.Default.username).toBeNull();
            expect(PlayerDTO.Default.score).toBe(0);
            expect(PlayerDTO.Default.id).toBeNull();
        });
    });
});
