import { GameNotEnoughPlayersException } from '../exceptions/GameNotEnoughPlayers.exception';
import { ArgumentsHost, Catch, ExceptionFilter, Inject, Injectable } from '@nestjs/common';
import { GameNoPlayersException } from '../exceptions/GameNoPlayers.exception';
import { GameCompleteException } from '../exceptions/GameComplete.exception';
import { GameException } from '../exceptions/Game.exception';
import { WSE } from '../exceptions/WebSocket.exception';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GameService } from '../game/game.service';
import { AuthDTO } from '../game/dtos/auth.dto';
import { Socket } from 'socket.io';
import { Logger } from 'winston';


@Catch(GameException)
@Injectable()
export class GameExceptionFilter implements ExceptionFilter {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        @Inject()
        private readonly gameService: GameService,
    ) {
        this.log.silly('GameExceptionFilter::constructor');
    }

    public catch = async (
        exc: GameException,
        argumentHost: ArgumentsHost,
    ) => {
        const executionContext = argumentHost.switchToWs();

        const baseDTO = executionContext.getData<AuthDTO>();
        const socket  = executionContext.getClient<Socket>();

        const debugBundle = { socketId : socket.id, exc, baseDTO };

        if (!baseDTO.game_code) {
            this.log.error('GameExceptionFilter::catch - No game code provided', { debugBundle });
            throw WSE.InternalServerError500('No game code provided', { debugBundle });
        }

        if (exc instanceof GameNoPlayersException)
            return this.onGameNoPlayersException(socket, exc, baseDTO.game_code, debugBundle)

        else if (exc instanceof GameNotEnoughPlayersException)
            return this.onGameNotEnoughPlayersException(socket, exc, baseDTO.game_code, debugBundle)

        else if (exc instanceof GameCompleteException)
            return this.onGameCompleteException(socket, exc, baseDTO.game_code, debugBundle);

        else if (exc instanceof GameException)
            return this.onGameException(socket, exc, baseDTO.game_code, debugBundle);

        throw WSE.InternalServerError500('Unhandled GameException', { debugBundle });
    }

    private onGameNoPlayersException = async (
        socket : Socket,
        _exception: GameNoPlayersException,
        gameCode: string,
        debugBundle: Record<string, unknown>,
    ) => {
        this.log.silly('GameExceptionFilter::onNoPlayersException', { debugBundle });

        // dont emit update, nobody is listening

        // still emit game update, but it shouldnt do anything. In the future
        // we should have observers and other kinds of players and users
        // so this should be called regardless
        return this.gameService.emitGameUpdate(
            socket, gameCode, false, [], 'Handling GameNotEnoughPlayersException context}');
    }

    private onGameNotEnoughPlayersException = async (
        socket      : Socket,
        _exception  : GameNotEnoughPlayersException,
        gameCode    : string,
        debugBundle : Record<string, unknown>,
    ) => {
        this.log.silly('GameExceptionFilter::onNotEnoughPlayersException', { debugBundle });

        return this.gameService.emitGameUpdate(
            socket, gameCode, false, [], 'Handling GameNotEnoughPlayersException context}');
    }

    private onGameException = async (
        socket      : Socket,
        _exception  : GameException,
        gameCode    : string,
        debugBundle : Record<string, unknown>,
    ) => {
        this.log.silly('GameExceptionFilter::onException', { debugBundle });

        return this.gameService.emitGameUpdate(
            socket, gameCode, false, [], 'Handling GameException context}');
    }

    private onGameCompleteException = async (
        socket : Socket,
        _exception: GameNoPlayersException,
        gameCode: string,
        debugBundle: Record<string, unknown>,
    ) => {
        this.log.silly('GameExceptionFilter::onCompleteException', { debugBundle });

        return this.gameService.emitGameUpdate(
            socket, gameCode, false, [], 'Handling GameNoPlayersException context}');
    }
}
