import { broadcastGameUpdate, broadcastUpdatePlayerValidation } from './GatewayUtil';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { GameService } from './game.service';
import { Logger } from 'winston';


export const handleOnGatewayConnection = async (
    socket         : Socket,
    gameService    : GameService,
    socketIoServer : SocketIoServer,
    log            : Logger,
): Promise<boolean> => {
    log.silly('Gateway Connection:', { socketId : socket.id });

    const player = await gameService.connectPlayer(socket);

    log.info('Player connected', { playerId : player.id, socketId : socket.id });

    // set the auth cookie on the client
    return broadcastUpdatePlayerValidation(
        player, player.auth_token!, socketIoServer, log);
};

export const handleOnGatewayDisconnect = async (
    socket         : Socket,
    gameService    : GameService,
    socketIoServer : SocketIoServer,
    log            : Logger,
) => {
    log.silly('Gateway Disconnection:', { socketID : socket.id });

    const player = await gameService.findPlayerBySocket(socket);

    if(!player) {
        log.info('No player found for socket', { socketId : socket.id });

        return;
    }

    const { game } = await gameService.disconnectPlayer(socket);

    if (!game) {
        log.info('No game found for player', { socketId : socket.id });

        return;
    }

    log.info('Game found for player, disconnecting...', {
        socketId : socket.id, gameCode : game.game_code, player,
    });

    return broadcastGameUpdate(game.game_code!, gameService, socketIoServer, log);
};
