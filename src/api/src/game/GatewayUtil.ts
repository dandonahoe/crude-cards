import { WebSocketEventType } from '../constant/websocket-event.enum';
import { Server as SocketIoServer } from 'socket.io';
import { Player } from '../player/player.entity';
import { GameService } from './game.service';
import { Logger } from 'winston';


export const broadcastUpdatePlayerValidation = async (
    player: Player,
    authToken: string,
    socketIoServer: SocketIoServer,
    log : Logger,
) => {
    log.silly('GameService::broadcastUpdatePlayerValidation', { player, authToken });

    return socketIoServer
        .to(player.id!)
        .emit(
            WebSocketEventType.UpdatePlayerValidation,
            authToken,
        );
}

export const broadcastGameUpdate = async (
    gameCode       : string,
    gameService    : GameService,
    socketIoServer : SocketIoServer,
    log            : Logger,
    includeDeck    : boolean = false,
) => {
    log.silly('GameService::broadcastGameUpdate', { gameCode, includeDeck });

    const gameStatusList = await gameService.getAllPlayersGameStatus(gameCode, includeDeck);

    return Promise.all(
        gameStatusList.map(gameStatus =>
            socketIoServer
                .to(gameStatus.current_player_id!)
                .emit(WebSocketEventType.UpdateGame, gameStatus),
        ),
    );
}
