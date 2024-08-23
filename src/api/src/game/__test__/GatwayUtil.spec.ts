import { broadcastUpdatePlayerValidation, broadcastGameUpdate } from '../GatewayUtil';
import { Server as SocketIoServer } from 'socket.io';
import { GameService } from '../game.service';
import { Logger } from 'winston';
import { WebSocketEventType } from '../../constant/websocket-event.enum';
import { Player } from '../../player/player.entity';

describe('GatewayUtil', () => {
    let mockSocketIoServer: SocketIoServer;
    let mockLogger: Logger;
    let mockGameService: GameService;

    beforeEach(() => {
        mockSocketIoServer = {
            to   : jest.fn().mockReturnThis(),
            emit : jest.fn(),
        } as unknown as SocketIoServer;

        mockLogger = {
            silly : jest.fn(),
        } as unknown as Logger;

        mockGameService = {
            getAllPlayersGameStatus : jest.fn(),
        } as unknown as GameService;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('broadcastUpdatePlayerValidation', () => {
        it('should log and emit UpdatePlayerValidation event', async () => {
            const mockPlayer: Player = { id : 'player123' } as Player;
            const authToken = 'authToken123';

            await broadcastUpdatePlayerValidation(mockPlayer, authToken, mockSocketIoServer, mockLogger);

            expect(mockLogger.silly).toHaveBeenCalledWith('GameService::broadcastUpdatePlayerValidation', {
                player : mockPlayer, authToken });
            expect(mockSocketIoServer.to).toHaveBeenCalledWith(mockPlayer.id);
            expect(mockSocketIoServer.emit).toHaveBeenCalledWith(WebSocketEventType.UpdatePlayerValidation, authToken);
        });
    });

    describe('broadcastGameUpdate', () => {
        it('should log and emit UpdateGame event for each player in the game', async () => {
            const mockGameCode = 'game123';
            const mockGameStatusList = [
                { current_player_id : 'player1', status : 'status1' },
                { current_player_id : 'player2', status : 'status2' },
            ];

            mockGameService.getAllPlayersGameStatus = jest.fn().mockResolvedValue(mockGameStatusList);

            await broadcastGameUpdate(mockGameCode, mockGameService, mockSocketIoServer, mockLogger, true);

            expect(mockLogger.silly).toHaveBeenCalledWith('GameService::broadcastGameUpdate', {
                gameCode : mockGameCode, includeDeck : true,
            });
            expect(mockGameService.getAllPlayersGameStatus).toHaveBeenCalledWith(mockGameCode, true);

            mockGameStatusList.forEach(gameStatus => {
                expect(mockSocketIoServer.to).toHaveBeenCalledWith(gameStatus.current_player_id);
                expect(mockSocketIoServer.emit).toHaveBeenCalledWith(WebSocketEventType.UpdateGame, gameStatus);
            });
        });

        it('should handle an empty game status list gracefully', async () => {
            const mockGameCode = 'game123';
            mockGameService.getAllPlayersGameStatus = jest.fn().mockResolvedValue([]);

            await broadcastGameUpdate(mockGameCode, mockGameService, mockSocketIoServer, mockLogger, false);

            expect(mockLogger.silly).toHaveBeenCalledWith('GameService::broadcastGameUpdate', {
                gameCode : mockGameCode, includeDeck : false,
            });
            expect(mockGameService.getAllPlayersGameStatus)
                .toHaveBeenCalledWith(mockGameCode, false);
            expect(mockSocketIoServer.to).not.toHaveBeenCalled();
            expect(mockSocketIoServer.emit).not.toHaveBeenCalled();
        });
    });
});
