import { Inject, Injectable, UseGuards, UseInterceptors } from '@nestjs/common';
import { AllowPlayerTypes } from '../decorators/allow-player-types.decorator';
import { DealerPickBlackCardDTO } from './dtos/dealer-pick-black-card.dto';
import { WebSocketEventType } from './../constant/websocket-event.enum';
import { PlayerSelectCardDTO } from './dtos/player-select-card.dto';
import { DealerPickWinnerDTO } from './dtos/dealer-pick-winner.dto';
import { GameInterceptor } from '../interceptors/game.interceptor';
import { ZodValidationPipe } from './../pipes/ZodValidation.pipe';
import { UpdateUsernameDTO } from './dtos/update-username.dto';
import { SubmitFeedbackDTO } from './dtos/submit-feedback.dto';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { PlayerType } from '../constant/player-type.enum';
import { type P } from '../../../type/framework/data/P';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateGameDTO } from './dtos/create-game.dto';
import { GameStateDTO } from './dtos/game-state.dto';
import { StartGameDTO } from './dtos/start-game.dto';
import { JoinGameDTO } from './dtos/join-game.dto';
import { NextHandDTO } from './dtos/next-hand.dto';
import { ExitGameDTO } from './dtos/exit-game.dto';
import { AuthGuard } from '../guards/auth.guard';
import { GameService } from './game.service';
import { corsPolicy } from './Cors';
import { Logger } from 'winston';
import {
    WebSocketGateway, SubscribeMessage, MessageBody,
    OnGatewayConnection, OnGatewayDisconnect,
    WebSocketServer,
} from '@nestjs/websockets';


@WebSocketGateway({ cors : corsPolicy })
@UseInterceptors(GameInterceptor)
@UseGuards(AuthGuard)
@Injectable()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    private socketIoServer: SocketIoServer;

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        private readonly gameService: GameService,
    ) { }

    public handleConnection = async (socket: Socket): P<unknown> => {
        this.log.silly('GameGateway::handleConnection', { socketId : socket.id });

        return this.gameService.connectPlayer(socket);
    }

    public handleDisconnect = async (socket: Socket): P<unknown> => {
        debugger;

        this.log.silly('GameGateway:::handleDisconnect', { socketID : socket.id });

        return this.gameService.disconnectPlayer(socket);
    }


    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.CreateGame)
    public async createGame(
        @MessageBody(new ZodValidationPipe(CreateGameDTO.Schema))
        createGame: CreateGameDTO,
    ): P<GameStateDTO> {
        this.log.info('GameGateway::createGame', { createGame });

        return this.gameService.createGame(this.socketIoServer, createGame);
    }

    @SubscribeMessage(WebSocketEventType.StartGame)
    public async startGame(
        @MessageBody(new ZodValidationPipe(StartGameDTO.Schema))
        startGame: StartGameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::startGame', { startGame });

        return this.gameService.startGame(this.socketIoServer, startGame);
    }

    @SubscribeMessage(WebSocketEventType.JoinGame)
    @AllowPlayerTypes(PlayerType.Player)
    public async joinGame(
        @MessageBody(new ZodValidationPipe(JoinGameDTO.Schema))
        joinGame: JoinGameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::joinGame', { joinGame });

        return this.gameService.joinGame(this.socketIoServer, joinGame);
    }

    @SubscribeMessage(WebSocketEventType.ExitGame)
    @AllowPlayerTypes(PlayerType.Player)
    public async exitGame(
        @MessageBody(new ZodValidationPipe(ExitGameDTO.Schema))
        exitGame: ExitGameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::exitGame', { exitGame });

        return this.gameService.exitGame(this.socketIoServer, exitGame);
    }

    @SubscribeMessage(WebSocketEventType.PlayerSelectCard)
    @AllowPlayerTypes(PlayerType.Player)
    public async playerSelectCard(
        @MessageBody(new ZodValidationPipe(PlayerSelectCardDTO.Schema))
        playerSelectCard: PlayerSelectCardDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::playerSelectCard', { playerSelectCard });

        return this.gameService.playerSelectCard(this.socketIoServer, playerSelectCard);
    }

    @SubscribeMessage(WebSocketEventType.SubmitFeedback)
    @AllowPlayerTypes(PlayerType.Player, PlayerType.Visitor, PlayerType.Unknown)
    public async submitFeedback(
        @MessageBody(new ZodValidationPipe(SubmitFeedbackDTO.Schema))
        submitFeedback: SubmitFeedbackDTO,
    ) {
        this.log.silly('GameGateway::submitFeedback', submitFeedback);

        return this.gameService.submitFeedback(submitFeedback);
    }

    @SubscribeMessage(WebSocketEventType.UpdateUsername)
    @AllowPlayerTypes(PlayerType.Player)
    public async updateUsername(
        @MessageBody(new ZodValidationPipe(UpdateUsernameDTO.Schema))
        updateUsername: UpdateUsernameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::updateUsername', { updateUsername });

        return this.gameService.updateUsername(this.socketIoServer, updateUsername);
    }

    @SubscribeMessage(WebSocketEventType.DealerPickBlackCard)
    @AllowPlayerTypes(PlayerType.Player)
    public async dealerPickBlackCard(
        @MessageBody(new ZodValidationPipe(DealerPickBlackCardDTO.Schema))
        dealerPickBlackCard: DealerPickBlackCardDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::dealerPickBlackCard', { dealerPickBlackCard });

        return this.gameService.dealerPickBlackCard(this.socketIoServer, dealerPickBlackCard);
    }

    @SubscribeMessage(WebSocketEventType.DealerPickWinner)
    @AllowPlayerTypes(PlayerType.Player)
    public async dealerPickWinner(
        @MessageBody(new ZodValidationPipe(DealerPickWinnerDTO.Schema))
        dealerPickWinner: DealerPickWinnerDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::dealerPickWinner', { dealerPickWinner });

        return this.gameService.dealerPickWinner(this.socketIoServer, dealerPickWinner);
    }

    @SubscribeMessage(WebSocketEventType.NextHand)
    @AllowPlayerTypes(PlayerType.Player)
    public async nextHand(
        @MessageBody(new ZodValidationPipe(NextHandDTO.Schema))
        nextHand: NextHandDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::nextHand', { nextHand });

        return this.gameService.nextHand(this.socketIoServer, nextHand);
    }
}
