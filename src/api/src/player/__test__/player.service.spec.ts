import { GameSession } from './../../game-session/game-session.entity';
import { PlayerType } from './../../constant/player-type.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerService } from '../player.service';
import { In, IsNull, Repository } from 'typeorm';
import { Player } from '../player.entity';
import { Socket } from 'socket.io';


// Create a mock logger
const mockLogger = {
    log     : jest.fn(),
    error   : jest.fn(),
    warn    : jest.fn(),
    debug   : jest.fn(),
    verbose : jest.fn(),
};

describe('PlayerService', () => {
    let playerService: PlayerService;
    let playerRepository: Repository<Player>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers : [
                {
                    provide  : 'winston',
                    useValue : mockLogger,
                },
                PlayerService,
                {
                    provide  : getRepositoryToken(Player),
                    useClass : Repository, // Use TypeORM's Repository as the mock
                },
            ],
        }).compile();

        playerService = module.get<PlayerService>(PlayerService);
        playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
    });

    it('should be defined', () => {
        expect(playerService).toBeDefined();
        expect(playerRepository).toBeDefined();
    });

    describe('ensureReadyToJoin', () => {
        it('should save the player with the PlayerType.Player user type', async () => {
            const mockPlayer = { id : '1', username : 'TestPlayer' } as Player;
            const savedPlayer = { ...mockPlayer, user_type : PlayerType.Player };

            jest.spyOn(playerRepository, 'save').mockResolvedValue(savedPlayer);

            const result = await playerService.ensureReadyToJoin(mockPlayer);
            expect(result).toEqual(savedPlayer);
            expect(playerRepository.save).toHaveBeenCalledWith({
                ...mockPlayer,
                user_type : PlayerType.Player,
            });
        });
    });

    describe('updateUsername', () => {
        it('should update the username of the player', async () => {
            const mockPlayer = { id : '1', username : 'OldUsername' } as Player;
            const updatedPlayer = { ...mockPlayer, username : 'NewUsername' };

            jest.spyOn(playerRepository, 'save').mockResolvedValue(updatedPlayer);

            const result = await playerService.updateUsername(mockPlayer, 'NewUsername');
            expect(result).toEqual(updatedPlayer);
            expect(playerRepository.save).toHaveBeenCalledWith({
                ...mockPlayer,
                username : 'NewUsername',
            });
        });
    });

    describe('updatePlayerWhiteCardIds', () => {
        it('should update the player white card IDs', async () => {
            const mockPlayerId = '1';
            const mockWhiteCardIds = ['card1', 'card2'];

            const updateSpy = jest.spyOn(playerRepository, 'update').mockResolvedValue({} as any);

            await playerService.updatePlayerWhiteCardIds(mockPlayerId, mockWhiteCardIds);

            expect(updateSpy).toHaveBeenCalledWith(mockPlayerId, {
                card_id_list : mockWhiteCardIds,
            });
        });
    });

    describe('incrementPlayerScore', () => {
        it('should increment the player score by 1', async () => {
            const mockPlayer = { id : '1', score : 3 } as Player;
            const updatedPlayer = { ...mockPlayer, score : 4 };

            jest.spyOn(playerRepository, 'save').mockResolvedValue(updatedPlayer);

            const result = await playerService.incrementPlayerScore(mockPlayer);
            expect(result).toEqual(updatedPlayer);
            expect(playerRepository.save).toHaveBeenCalledWith({
                ...mockPlayer,
                score : 4,
            });
        });
    });

    describe('findPlayersInSession', () => {
        it('should find players by session player_id_list', async () => {
            const mockSession = { player_id_list : ['1', '2'] } as GameSession;
            const mockPlayers = [{ id : '1' }, { id : '2' }] as Player[];

            jest.spyOn(playerRepository, 'find').mockResolvedValue(mockPlayers);

            const result = await playerService.findPlayersInSession(mockSession);
            expect(result).toEqual(mockPlayers);
            expect(playerRepository.find).toHaveBeenCalledWith({
                where : {
                    id : In(mockSession.player_id_list),
                },
            });
        });
    });

    describe('createPlayer', () => {
        it('should create a player with default values and a generated UUID', async () => {
            const mockSocket = { id : 'socketId' } as Socket;
            const mockPlayer = new Player();

            mockPlayer.card_id_list = [];
            mockPlayer.user_type = PlayerType.Unknown;
            mockPlayer.id = 'some-uuid';
            mockPlayer.socket_id = mockSocket.id;

            jest.spyOn(playerRepository, 'save').mockResolvedValue(mockPlayer);

            const result = await playerService.createPlayer(mockSocket);
            expect(result).toEqual(mockPlayer);
            expect(playerRepository.save).toHaveBeenCalledWith(expect.objectContaining({
                card_id_list : [],
                user_type    : PlayerType.Unknown,
                socket_id    : mockSocket.id,
            }));
        });
    });

    describe('getPlayerByAuthToken', () => {
        it('should find a player by auth token', async () => {
            const mockAuthToken = 'auth-token';
            const mockPlayer = { id : '1', auth_token : mockAuthToken } as Player;

            jest.spyOn(playerRepository, 'findOneByOrFail').mockResolvedValue(mockPlayer);

            const result = await playerService.getPlayerByAuthToken(mockAuthToken);
            expect(result).toEqual(mockPlayer);
            expect(playerRepository.findOneByOrFail).toHaveBeenCalledWith({
                auth_token      : mockAuthToken,
                disconnected_at : IsNull(),
            });
        });

        it('should throw an error if the player is not found', async () => {
            const mockAuthToken = 'auth-token';

            jest.spyOn(playerRepository, 'findOneByOrFail').mockRejectedValue(new Error('Player not found'));

            await expect(playerService.getPlayerByAuthToken(mockAuthToken)).rejects.toThrow('Player not found');
        });
    });
});
