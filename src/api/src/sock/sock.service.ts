import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { WebSocketEventType } from '../constant/websocket-event.enum';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { GameStateDTO } from '../game/dtos/game-state.dto';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { WebSocketServer } from "@nestjs/websockets";
import { Inject, Injectable } from "@nestjs/common";
import { P } from '../../../type/framework/data/P';
import { GameService } from '../game/game.service';
import { Logger } from "winston";


@Injectable()
export class SockService {

    @WebSocketServer()
    private socketIoServer: SocketIoServer;

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
    ) { }

    public handleConnection = async (socket: Socket): P<unknown> => {
        this.log.silly('GameGateway::handleConnection', { socketId : socket.id });


        const player = await gameService.connectPlayer(socket);

        this.log.info('Player connected', { playerId : player.id, socketId : socket.id });

        // set the auth cookie on the client
        return broadcastUpdatePlayerValidation(
            player, player.auth_token!, socketIoServer, log);

    }

    public handleDisconnect = async (socket: Socket): P<void> => {
        this.log.silly('GameGateway:handleDisconnect');

        this.log.silly('Gateway Disconnection:', { socketID : socket.id });

        // const player = await this.gameService.findPlayerBySocket(socket);

        // if (!player) {
        //     log.info('No player found for socket', { socketId : socket.id });

        //     return;
        // }

        // const { game } = await gameService.disconnectPlayer(socket);

        // if (!game) {
        //     log.info('No game found for player', { socketId : socket.id });

        //     return;
        // }

        // log.info('Game found for player, disconnecting...', {
        //     socketId : socket.id, gameCode : game.game_code, player,
        // });

        // return broadcastGameUpdate(game.game_code!, gameService, socketIoServer, log);
    }


    public emitPlayerAuthToken = async (
        playerId : string,
        authToken: string,
    ) => {
        this.log.silly('GameService::broadcastUpdatePlayerValidation', { playerId });

        return this.socketIoServer
            .to(playerId)
            .emit(
                WebSocketEventType.UpdatePlayerValidation,
                authToken,
            );
    }

    public broadcastGameUpdate = async (
        playerGameStates: GameStateDTO[],
    ) : P<boolean[]> => {
        this.log.silly('GameService::broadcastGameUpdate', { playerGameStates });

        return Promise.all(
            playerGameStates.map(gameStatus =>
                this.socketIoServer
                    .to(gameStatus.current_player_id!)
                    .emit(WebSocketEventType.UpdateGame, gameStatus),
            ),
        );
    }
}
