import { Inject, Injectable, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { GameWebSocketExceptionFilter } from '../filters/GameWebSocketException.filter';
import { AllowPlayerTypes } from '../decorators/allow-player-types.decorator';
import { DealerPickBlackCardDTO } from './dtos/dealer-pick-black-card.dto';
import { WebSocketEventType } from './../constant/websocket-event.enum';
import { GameExceptionFilter } from '../filters/GameException.filter';
import { PlayerSelectCardDTO } from './dtos/player-select-card.dto';
import { DealerPickWinnerDTO } from './dtos/dealer-pick-winner.dto';
import { GameInterceptor } from '../interceptors/game.interceptor';
import { ZodValidationPipe } from './../pipes/ZodValidation.pipe';
import { CatchAllWsFilter } from '../filters/CatchAllWs.filter';
import { UpdateUsernameDTO } from './dtos/update-username.dto';
import { SubmitFeedbackDTO } from './dtos/submit-feedback.dto';
import { PlayerType } from '../constant/player-type.enum';
import { GameAuthGuard } from '../guards/GameAuth.guard';
import { type P } from '../../../type/framework/data/P';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateGameDTO } from './dtos/create-game.dto';
import { StartGameDTO } from './dtos/start-game.dto';
import { LeaveGameDTO } from './dtos/leave-game.dto';
import { JoinGameDTO } from './dtos/join-game.dto';
import { NextHandDTO } from './dtos/next-hand.dto';
import { LogRelayDTO } from './dtos/log-relay.dto';
import { GameService } from './game.service';
import { Server, Socket } from 'socket.io';
import { corsPolicy } from './Cors';
import { Logger } from 'winston';
import {
    SubscribeMessage, MessageBody, WebSocketGateway,
    ConnectedSocket, OnGatewayConnection,
    OnGatewayDisconnect, WebSocketServer,
} from '@nestjs/websockets';


@UseFilters(GameWebSocketExceptionFilter, GameExceptionFilter, CatchAllWsFilter)
@WebSocketGateway({ cors : corsPolicy })
@UseInterceptors(GameInterceptor)
@UseGuards(GameAuthGuard)
@Injectable()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    private server: Server;


    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        private readonly gameService: GameService,
    ) { }

    public getSocketServer(): Server {
        return this.server;
    }

    public handleConnection = async (socket: Socket): P<unknown> => {
        this.log.silly('GameGateway::handleConnection', { socketId : socket.id });

        return this.gameService.connectPlayer(this.server, socket);
    }

    public handleDisconnect = async (socket: Socket): P<unknown> => {
        this.log.silly('GameGateway:::handleDisconnect', { socketID : socket.id });

        return this.gameService.disconnectPlayer(socket);
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.CreateGame)
    public async createGame(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(CreateGameDTO.Schema))
        createGame: CreateGameDTO,
    ) : P<unknown>{
        this.log.info('GameGateway::createGame', { createGame });

        return this.gameService.createGame(this.server, socket, createGame);
    }

    @SubscribeMessage(WebSocketEventType.LogRelay)
    @AllowPlayerTypes(PlayerType.Player, PlayerType.Visitor, PlayerType.Unknown)
    public async logClient(
        @MessageBody(new ZodValidationPipe(LogRelayDTO.Schema))
        logRelay: LogRelayDTO,
    ) : P<unknown> {
        return this.log.info(`CLIENT: ${logRelay.message}`, logRelay.payload);
    }


    @SubscribeMessage(WebSocketEventType.StartGame)
    public async startGame(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(StartGameDTO.Schema))
        startGame: StartGameDTO,
    ): P<unknown> {
        this.log.silly('GameGateway::startGame', { startGame });

        return this.gameService.startGame(this.server, socket, startGame);
    }

    @SubscribeMessage(WebSocketEventType.JoinGame)
    @AllowPlayerTypes(PlayerType.Player)
    public async joinGame(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(JoinGameDTO.Schema))
        joinGame: JoinGameDTO,
    ) : P<unknown> {
        this.log.silly('GameGateway::joinGame', { joinGame });

        return this.gameService.joinGame(
            this.server, socket, joinGame, 'Joining via WebSocketEventType.JoinGame');
    }

    @SubscribeMessage(WebSocketEventType.LeaveGame)
    @AllowPlayerTypes(PlayerType.Player)
    public async leaveGame(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(LeaveGameDTO.Schema))
        leaveGame: LeaveGameDTO,
    ) : P<unknown> {
        this.log.silly('GameGateway::leaveGame', { leaveGame });

        return this.gameService.leaveGame(this.server, socket, leaveGame);
    }

    @SubscribeMessage(WebSocketEventType.PlayerSelectCard)
    @AllowPlayerTypes(PlayerType.Player)
    public async playerSelectCard(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(PlayerSelectCardDTO.Schema))
        playerSelectCard: PlayerSelectCardDTO,
    ) : P<unknown> {
        this.log.silly('GameGateway::playerSelectCard', { playerSelectCard });

        return this.gameService.playerSelectCard(this.server, socket, playerSelectCard);
    }

    @SubscribeMessage(WebSocketEventType.SubmitFeedback)
    @AllowPlayerTypes(PlayerType.Player, PlayerType.Visitor, PlayerType.Unknown)
    public async submitFeedback(
        @MessageBody(new ZodValidationPipe(SubmitFeedbackDTO.Schema))
        submitFeedback: SubmitFeedbackDTO,
    ) : P<unknown> {
        this.log.silly('GameGateway::submitFeedback', submitFeedback);

        return this.gameService.submitFeedback(submitFeedback);
    }

    @SubscribeMessage(WebSocketEventType.UpdateUsername)
    @AllowPlayerTypes(PlayerType.Player)
    public async updateUsername(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(UpdateUsernameDTO.Schema))
        updateUsername: UpdateUsernameDTO,
    ): P<unknown> {
        this.log.silly('GameGateway::updateUsername', { updateUsername });

        return this.gameService.updateUsername(this.server, socket, updateUsername);
    }

    @SubscribeMessage(WebSocketEventType.DealerPickBlackCard)
    @AllowPlayerTypes(PlayerType.Player)
    public async dealerPickBlackCard(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(DealerPickBlackCardDTO.Schema))
        dealerPickBlackCard: DealerPickBlackCardDTO,
    ): P<unknown> {
        this.log.silly('GameGateway::dealerPickBlackCard', { dealerPickBlackCard });

        return this.gameService.dealerPickBlackCard(this.server, socket, dealerPickBlackCard);
    }

    @SubscribeMessage(WebSocketEventType.DealerPickWinner)
    @AllowPlayerTypes(PlayerType.Player)
    public async dealerPickWinner(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(DealerPickWinnerDTO.Schema))
        dealerPickWinner: DealerPickWinnerDTO,
    ): P<unknown> {
        this.log.silly('GameGateway::dealerPickWinner', { dealerPickWinner });

        return this.gameService.dealerPickWinner(this.server, socket, dealerPickWinner);
    }

    @SubscribeMessage(WebSocketEventType.NextHand)
    @AllowPlayerTypes(PlayerType.Player)
    public async nextHand(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(NextHandDTO.Schema))
        nextHand: NextHandDTO,
    ): P<unknown> {
        this.log.silly('GameGateway::nextHand', { nextHand });

        return this.gameService.nextHand(this.server, socket, nextHand);
    }
}
