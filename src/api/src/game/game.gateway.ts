import { handleOnGatewayConnection, handleOnGatewayDisconnect } from './OnGateway';
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
import { broadcastGameUpdate } from './GatewayUtil';
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
    ConnectedSocket, WebSocketServer,
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
        this.log.silly('GameGateway::handleConnection');

        return handleOnGatewayConnection(socket, this.gameService, this.socketIoServer, this.log);
    }

    public handleDisconnect = async (socket: Socket): P<unknown> => {
        this.log.silly('GameGateway:handleDisconnect');

        return handleOnGatewayDisconnect(socket, this.gameService,
            this.socketIoServer, this.log);
    }

    public broadcastGameUpdateHelper = async (
        gameCode: string,
        includeDeck: boolean = false,
    ) => {
        this.log.silly('GameGateway::broadcastGameUpdateHelper', {
            gameCode, includeDeck,
        });

        return broadcastGameUpdate(gameCode, this.gameService,
            this.socketIoServer, this.log, includeDeck);
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.CreateGame)
    public async createGame(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(CreateGameDTO.Schema))
        createGame: CreateGameDTO,
    ): P<GameStateDTO> {
        this.log.info('GameGateway::createGame', { createGame });
        // ('GameGateway::createGame', { createGame });

        const gameState = await this.gameService.createGame(createGame);

        this.log.info('Joining Room:', {
            room : gameState.game_code,
        });

        socket.join(gameState.game_code!);

        await this.broadcastGameUpdateHelper(gameState.game_code!);

        return gameState;
    }

    @SubscribeMessage(WebSocketEventType.StartGame)
    public async startGame(
        @MessageBody(new ZodValidationPipe(StartGameDTO.Schema))
        startGame: StartGameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::startGame', { startGame });

        const gameState = await this.gameService.startGame(startGame);

        await this.broadcastGameUpdateHelper(gameState.game_code!, true);

        return gameState;
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.JoinGame)
    public async joinGame(
        @ConnectedSocket() socket: Socket,
        @MessageBody(new ZodValidationPipe(JoinGameDTO.Schema))
        joinGame: JoinGameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::joinGame', { joinGame });

        const gameState = await this.gameService.joinGame(joinGame);

        if (!gameState.error_message) {
            socket.join(gameState.game_code!);

            await this.broadcastGameUpdateHelper(gameState.game_code!);
        }

        return gameState;
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.ExitGame)
    public async exitGame(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(ExitGameDTO.Schema))
        exitGame: ExitGameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::exitGame', { exitGame });

        const gameState = await this.gameService.exitGame(exitGame);

        socket.leave(gameState.current_player_id!);

        await this.broadcastGameUpdateHelper(gameState.game_code!);

        return gameState;
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.PlayerSelectCard)
    public async playerSelectCard(
        @MessageBody(new ZodValidationPipe(PlayerSelectCardDTO.Schema))
        playerSelectCard: PlayerSelectCardDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::playerSelectCard', { playerSelectCard });

        const gameState = await this.gameService.playerSelectCard(playerSelectCard);

        await this.broadcastGameUpdateHelper(gameState.game_code!);

        return gameState;
    }

    @AllowPlayerTypes(PlayerType.Player, PlayerType.Visitor, PlayerType.Unknown)
    @SubscribeMessage(WebSocketEventType.SubmitFeedback)
    public async submitFeedback(
        @MessageBody(new ZodValidationPipe(SubmitFeedbackDTO.Schema))
        submitFeedback: SubmitFeedbackDTO,
    ) {
        this.log.silly('GameGateway::submitFeedback', submitFeedback);

        return this.gameService.submitFeedback(submitFeedback);
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.UpdateUsername)
    public async updateUsername(
        @MessageBody(new ZodValidationPipe(UpdateUsernameDTO.Schema))
        updateUsername: UpdateUsernameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::updateUsername', { updateUsername });

        const gameState = await this.gameService.updateUsername(updateUsername);

        await this.broadcastGameUpdateHelper(gameState.game_code!);

        return gameState;
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.DealerPickBlackCard)
    public async dealerPickBlackCard(
        @MessageBody(new ZodValidationPipe(DealerPickBlackCardDTO.Schema))
        dealerPickBlackCard: DealerPickBlackCardDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::dealerPickBlackCard', { dealerPickBlackCard });

        const gameState = await this.gameService.dealerPickBlackCard(dealerPickBlackCard);

        await this.broadcastGameUpdateHelper(gameState.game_code!);

        return gameState;
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.DealerPickWinner)
    public async dealerPickWinner(
        @MessageBody(new ZodValidationPipe(DealerPickWinnerDTO.Schema))
        dealerPickWinner: DealerPickWinnerDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::dealerPickWinner', { dealerPickWinner });

        const gameState = await this.gameService.dealerPickWinner(dealerPickWinner);

        await this.broadcastGameUpdateHelper(gameState.game_code!);

        return gameState;
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.NextHand)
    public async nextHand(
        @MessageBody(new ZodValidationPipe(NextHandDTO.Schema))
        nextHand: NextHandDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::nextHand', { nextHand });

        const gameState = await this.gameService.nextHand(nextHand);

        await this.broadcastGameUpdateHelper(gameState.game_code!);

        return gameState;
    }
}
