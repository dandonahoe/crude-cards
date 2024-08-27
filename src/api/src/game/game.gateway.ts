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
    SubscribeMessage, WebSocketGateway,
    ConnectedSocket, MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';


@WebSocketGateway({ cors : corsPolicy })
@UseInterceptors(GameInterceptor)
@UseGuards(AuthGuard)
@Injectable()
export class GameGateway {


    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
        private readonly gameService: GameService,
    ) { }


    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.CreateGame)
    public async createGame(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(CreateGameDTO.Schema))
        createGame: CreateGameDTO,
    ): P<GameStateDTO> {
        this.log.info('GameGateway::createGame', { createGame });

        const gameState = await this.gameService.createGame(createGame, socket);

        this.log.debug('Joining Room:', gameState);

        return gameState;
    }

    @SubscribeMessage(WebSocketEventType.StartGame)
    public async startGame(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(StartGameDTO.Schema))
        startGame: StartGameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::startGame', { startGame });

        const gameState = await this.gameService.startGame(startGame, socket);

        await this.broadcastGameUpdateHelper(gameState.game_code!, true);

        return gameState;
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.JoinGame)
    public async joinGame(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(JoinGameDTO.Schema))
        joinGame: JoinGameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::joinGame', { joinGame });

        return this.gameService.joinGame(joinGame, socket);

        // if (!gameState.error_message) {
        //     socket.join(gameState.game_code!);

        //     await this.broadcastGameUpdateHelper(gameState.game_code!);
        // }

        // return gameState;
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

        return this.gameService.exitGame(exitGame, socket);

        // socket.leave(gameState.current_player_id!);

        // await this.broadcastGameUpdateHelper(gameState.game_code!);

        // return gameState;
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.PlayerSelectCard)
    public async playerSelectCard(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(PlayerSelectCardDTO.Schema))
        playerSelectCard: PlayerSelectCardDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::playerSelectCard', { playerSelectCard });

        return this.gameService.playerSelectCard(playerSelectCard, socket);
    }

    @AllowPlayerTypes(PlayerType.Player, PlayerType.Visitor, PlayerType.Unknown)
    @SubscribeMessage(WebSocketEventType.SubmitFeedback)
    public async submitFeedback(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(SubmitFeedbackDTO.Schema))
        submitFeedback: SubmitFeedbackDTO,
    ) {
        this.log.silly('GameGateway::submitFeedback', submitFeedback);

        return this.gameService.submitFeedback(submitFeedback, socket);
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.UpdateUsername)
    public async updateUsername(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(UpdateUsernameDTO.Schema))
        updateUsername: UpdateUsernameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::updateUsername', { updateUsername });

        return this.gameService.updateUsername(updateUsername, socket);
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.DealerPickBlackCard)
    public async dealerPickBlackCard(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(DealerPickBlackCardDTO.Schema))
        dealerPickBlackCard: DealerPickBlackCardDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::dealerPickBlackCard', { dealerPickBlackCard });

        return this.gameService.dealerPickBlackCard(dealerPickBlackCard, socket);
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.DealerPickWinner)
    public async dealerPickWinner(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(DealerPickWinnerDTO.Schema))
        dealerPickWinner: DealerPickWinnerDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::dealerPickWinner', { dealerPickWinner });

        return this.gameService.dealerPickWinner(dealerPickWinner, socket);
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.NextHand)
    public async nextHand(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(NextHandDTO.Schema))
        nextHand: NextHandDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameGateway::nextHand', { nextHand });

        return this.gameService.nextHand(nextHand, socket);
    }
}
