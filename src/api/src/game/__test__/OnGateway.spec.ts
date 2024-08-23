import { Socket } from 'socket.io';
import { Logger } from 'winston';
import { GameService } from '../game.service';
import { broadcastUpdatePlayerValidation, broadcastGameUpdate } from '../GatewayUtil';
import { handleOnGatewayDisconnect, handleOnGatewayConnection } from '../OnGateway';

jest.mock('../GatewayUtil', () => ({
    broadcastGameUpdate             : jest.fn(),
    broadcastUpdatePlayerValidation : jest.fn(),
}));

describe('OnGateway', () => {
    let mockSocket: Socket;
    let mockGameService: GameService;
    let mockSocketIoServer: any;
    let mockLogger: Logger;

    beforeEach(() => {
        mockSocket = {
            id    : 'socketId123',
            emit  : jest.fn(),
            join  : jest.fn(),
            leave : jest.fn(),
        } as unknown as Socket;

        mockGameService = {
            connectPlayer      : jest.fn(),
            findPlayerBySocket : jest.fn(),
            disconnectPlayer   : jest.fn(),
        } as unknown as GameService;

        mockSocketIoServer = {
            to   : jest.fn().mockReturnThis(),
            emit : jest.fn(),
        };

        mockLogger = {
            silly : jest.fn(),
            info  : jest.fn(),
        } as unknown as Logger;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('handleOnGatewayConnection', () => {
        it('should log connection and broadcast player validation', async () => {
            const mockPlayer = {
                id         : 'player123',
                auth_token : 'authToken123',
            };

            mockGameService.connectPlayer = jest.fn().mockResolvedValue(mockPlayer);
            (broadcastUpdatePlayerValidation as jest.Mock).mockResolvedValue(true);

            const result = await handleOnGatewayConnection(
                mockSocket,
                mockGameService,
                mockSocketIoServer,
                mockLogger,
            );

            expect(mockLogger.silly).toHaveBeenCalledWith('Gateway Connection:', { socketId : mockSocket.id });
            expect(mockGameService.connectPlayer).toHaveBeenCalledWith(mockSocket);
            expect(mockLogger.info).toHaveBeenCalledWith('Player connected', { playerId : mockPlayer.id, socketId : mockSocket.id });
            expect(broadcastUpdatePlayerValidation).toHaveBeenCalledWith(
                mockPlayer,
                mockPlayer.auth_token,
                mockSocketIoServer,
                mockLogger,
            );
            expect(result).toBe(true);
        });
    });

    describe('handleOnGatewayDisconnect', () => {
        it('should handle disconnection when no player is found', async () => {
            mockGameService.findPlayerBySocket = jest.fn().mockResolvedValue(null);

            const result = await handleOnGatewayDisconnect(
                mockSocket,
                mockGameService,
                mockSocketIoServer,
                mockLogger,
            );

            expect(mockLogger.silly).toHaveBeenCalledWith('Gateway Disconnection:', { socketID : mockSocket.id });
            expect(mockGameService.findPlayerBySocket).toHaveBeenCalledWith(mockSocket);
            expect(mockLogger.info).toHaveBeenCalledWith('No player found for socket', { socketId : mockSocket.id });
            expect(result).toBeUndefined();
            expect(broadcastGameUpdate).not.toHaveBeenCalled();
        });

        it('should handle disconnection when no game is found', async () => {
            const mockPlayer = { id : 'player123' };
            const mockDisconnectPlayerResponse = { game : null };

            mockGameService.findPlayerBySocket = jest.fn().mockResolvedValue(mockPlayer);
            mockGameService.disconnectPlayer = jest.fn().mockResolvedValue(mockDisconnectPlayerResponse);

            const result = await handleOnGatewayDisconnect(
                mockSocket,
                mockGameService,
                mockSocketIoServer,
                mockLogger,
            );

            expect(mockLogger.silly).toHaveBeenCalledWith('Gateway Disconnection:', { socketID : mockSocket.id });
            expect(mockGameService.findPlayerBySocket).toHaveBeenCalledWith(mockSocket);
            expect(mockLogger.info).toHaveBeenCalledWith('No game found for player', { socketId : mockSocket.id });
            expect(result).toBeUndefined();
            expect(broadcastGameUpdate).not.toHaveBeenCalled();
        });

        it('should handle disconnection and broadcast game update when a game is found', async () => {
            const mockPlayer = { id : 'player123' };
            const mockGame = { game_code : 'game123' };
            const mockDisconnectPlayerResponse = { game : mockGame };

            mockGameService.findPlayerBySocket = jest.fn().mockResolvedValue(mockPlayer);
            mockGameService.disconnectPlayer = jest.fn().mockResolvedValue(mockDisconnectPlayerResponse);
            (broadcastGameUpdate as jest.Mock).mockResolvedValue(true);

            const result = await handleOnGatewayDisconnect(
                mockSocket,
                mockGameService,
                mockSocketIoServer,
                mockLogger,
            );

            expect(mockLogger.silly).toHaveBeenCalledWith('Gateway Disconnection:', { socketID : mockSocket.id });
            expect(mockGameService.findPlayerBySocket).toHaveBeenCalledWith(mockSocket);
            expect(mockGameService.disconnectPlayer).toHaveBeenCalledWith(mockSocket);
            expect(mockLogger.info).toHaveBeenCalledWith('Game found for player, disconnecting...', {
                socketId : mockSocket.id,
                gameCode : mockGame.game_code,
                player   : mockPlayer,
            });
            expect(broadcastGameUpdate).toHaveBeenCalledWith(
                mockGame.game_code,
                mockGameService,
                mockSocketIoServer,
                mockLogger,
            );
            expect(result).toBe(true);
        });
    });
});
