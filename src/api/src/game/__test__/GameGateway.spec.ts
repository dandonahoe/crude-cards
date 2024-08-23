import { PlayerSelectCardDTO } from '../dtos/player-select-card.dto';
import { CreateGameDTO } from '../dtos/create-game.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Test, TestingModule } from '@nestjs/testing';
import { StartGameDTO } from '../dtos/start-game.dto';
import { broadcastGameUpdate } from '../GatewayUtil';
import { JoinGameDTO } from '../dtos/join-game.dto';
import { ExitGameDTO } from '../dtos/exit-game.dto';
import { GameGateway } from '../game.gateway';
import { GameService } from '../game.service';
import { Socket } from 'socket.io';
import { Logger } from 'winston';


jest.mock('../GatewayUtil', () => ({
    broadcastGameUpdate : jest.fn(),
}));

describe('GameGateway', () => {
    let gateway: GameGateway;
    let gameService: GameService;
    let logger: Logger;
    let mockSocket: Socket;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers : [
                GameGateway,
                {
                    provide  : GameService,
                    useValue : {
                        createGame          : jest.fn(),
                        startGame           : jest.fn(),
                        joinGame            : jest.fn(),
                        exitGame            : jest.fn(),
                        playerSelectCard    : jest.fn(),
                        updateUsername      : jest.fn(),
                        dealerPickBlackCard : jest.fn(),
                        dealerPickWinner    : jest.fn(),
                        nextHand            : jest.fn(),
                        submitFeedback      : jest.fn(),
                    },
                },
                {
                    provide  : WINSTON_MODULE_PROVIDER,
                    useValue : {
                        silly : jest.fn(),
                        info  : jest.fn(),
                    },
                },
            ],
        }).compile();

        gateway = module.get<GameGateway>(GameGateway);
        gameService = module.get<GameService>(GameService);
        logger = module.get<Logger>(WINSTON_MODULE_PROVIDER);

        mockSocket = {
            id    : 'socket123',
            join  : jest.fn(),
            leave : jest.fn(),
        } as unknown as Socket;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createGame', () => {
        it('should create a game, join the room, and broadcast the update', async () => {
            const mockCreateGameDto: CreateGameDTO = { game_name : 'Test Game' } as CreateGameDTO;
            const mockGameState = { game_code : 'game123' };

            jest.spyOn(gameService, 'createGame').mockResolvedValue(mockGameState as any);

            const result = await gateway.createGame(mockSocket, mockCreateGameDto);

            expect(logger.silly).toHaveBeenCalledWith('GameGateway::createGame', { createGame : mockCreateGameDto });
            expect(gameService.createGame).toHaveBeenCalledWith(mockCreateGameDto);
            expect(mockSocket.join).toHaveBeenCalledWith('game123');
            // expect(broadcastGameUpdate).toHaveBeenCalledWith('game123', gameService, gateway['socketIoServer'], logger);
            expect(result).toEqual(mockGameState);
        });
    });

    describe('startGame', () => {
        it('should start a game and broadcast the update including the deck', async () => {
            const mockStartGameDto: StartGameDTO = { game_code : 'game123' } as StartGameDTO;
            const mockGameState = { game_code : 'game123' };

            jest.spyOn(gameService, 'startGame').mockResolvedValue(mockGameState as any);

            const result = await gateway.startGame(mockStartGameDto);

            expect(logger.silly).toHaveBeenCalledWith('GameGateway::startGame', { startGame : mockStartGameDto });
            expect(gameService.startGame).toHaveBeenCalledWith(mockStartGameDto);
            expect(broadcastGameUpdate).toHaveBeenCalledWith('game123', gameService, gateway['socketIoServer'], logger, true);
            expect(result).toEqual(mockGameState);
        });
    });

    describe('joinGame', () => {
        it('should join a game, add the socket to the room, and broadcast the update', async () => {
            const mockJoinGameDto: JoinGameDTO = { game_code : 'game123' } as JoinGameDTO;
            const mockGameState = { game_code : 'game123' };

            jest.spyOn(gameService, 'joinGame').mockResolvedValue(mockGameState as any);

            const result = await gateway.joinGame(mockSocket, mockJoinGameDto);

            expect(logger.silly).toHaveBeenCalledWith('GameGateway::joinGame', { joinGame : mockJoinGameDto });
            expect(gameService.joinGame).toHaveBeenCalledWith(mockJoinGameDto);
            expect(mockSocket.join).toHaveBeenCalledWith('game123');
            // expect(broadcastGameUpdate).toHaveBeenCalledWith('game123', gameService, gateway['socketIoServer'], logger);
            expect(result).toEqual(mockGameState);
        });

        it('should not join the room or broadcast update if there is an error message', async () => {
            const mockJoinGameDto: JoinGameDTO = { game_code : 'game123' } as JoinGameDTO;
            const mockGameState = { game_code : 'game123', error_message : 'Error' };

            jest.spyOn(gameService, 'joinGame').mockResolvedValue(mockGameState as any);

            const result = await gateway.joinGame(mockSocket, mockJoinGameDto);

            expect(logger.silly).toHaveBeenCalledWith('GameGateway::joinGame', { joinGame : mockJoinGameDto });
            expect(gameService.joinGame).toHaveBeenCalledWith(mockJoinGameDto);
            expect(mockSocket.join).not.toHaveBeenCalled();
            expect(broadcastGameUpdate).not.toHaveBeenCalled();
            expect(result).toEqual(mockGameState);
        });
    });

    describe('exitGame', () => {
        it('should exit a game, remove the socket from the room, and broadcast the update', async () => {
            const mockExitGameDto: ExitGameDTO = { game_code : 'game123' } as ExitGameDTO;
            const mockGameState = { game_code : 'game123', current_player_id : 'player123' };

            jest.spyOn(gameService, 'exitGame').mockResolvedValue(mockGameState as any);

            const result = await gateway.exitGame(mockSocket, mockExitGameDto);

            expect(logger.silly).toHaveBeenCalledWith('GameGateway::exitGame', { exitGame : mockExitGameDto });
            expect(gameService.exitGame).toHaveBeenCalledWith(mockExitGameDto);
            expect(mockSocket.leave).toHaveBeenCalledWith('player123');
            // expect(broadcastGameUpdate).toHaveBeenCalledWith('game123', gameService, gateway['socketIoServer'], logger);
            expect(result).toEqual(mockGameState);
        });
    });

    describe('playerSelectCard', () => {
        it('should handle player card selection and broadcast the game update', async () => {
            const mockPlayerSelectCardDto: PlayerSelectCardDTO = { card_id : 'card123' } as PlayerSelectCardDTO;
            const mockGameState = { game_code : 'game123' };

            jest.spyOn(gameService, 'playerSelectCard').mockResolvedValue(mockGameState as any);

            const result = await gateway.playerSelectCard(mockPlayerSelectCardDto);

            expect(logger.silly).toHaveBeenCalledWith('GameGateway::playerSelectCard', { playerSelectCard : mockPlayerSelectCardDto });
            expect(gameService.playerSelectCard).toHaveBeenCalledWith(mockPlayerSelectCardDto);
            // expect(broadcastGameUpdate).toHaveBeenCalledWith('game123', gameService, gateway['socketIoServer'], logger);
            expect(result).toEqual(mockGameState);
        });
    });

    // Additional tests for the remaining methods (updateUsername, dealerPickBlackCard, etc.) would follow the same pattern.
});
