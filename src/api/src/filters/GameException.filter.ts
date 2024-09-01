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

        const socket = executionContext.getClient<Socket>();
        const baseDTO = executionContext.getData<AuthDTO>();

        const debugBundle = { socketId : socket.id, exc, baseDTO };

        if (!baseDTO.game_code) {
            this.log.error('GameExceptionFilter::catch - No game code provided', { debugBundle });
            throw WSE.InternalServerError500('No game code provided', { debugBundle });
        }

        // Run the specifi handler in the original types
        if (exc instanceof GameNoPlayersException)
            return this.onGameNoPlayersException(exc, baseDTO.game_code)

        else if (exc instanceof GameNotEnoughPlayersException)
            return this.onGameNotEnoughPlayersException(exc, baseDTO.game_code)

        else if (exc instanceof GameCompleteException)
            return this.onGameCompleteException(exc, baseDTO.game_code);

        else if (exc instanceof GameException)
            return this.onGameException(exc, baseDTO.game_code);
    }

    private onGameNoPlayersException = async (
        exception: GameNoPlayersException,
        gameCode: string,
    ) => {
        this.log.silly('GameExceptionFilter::onNoPlayersException', { gameCode, exception });
    }

    private onGameNotEnoughPlayersException = async (
        exception: GameNotEnoughPlayersException,
        gameCode: string,
    ) => {
        this.log.silly('GameExceptionFilter::onNotEnoughPlayersException', { gameCode });
    }

    private onGameException = async (
        exception: GameException,
        gameCode: string,
    ) => {
        this.log.silly('GameExceptionFilter::onException', { gameCode });
    }

    private onGameCompleteException = async (
        exception: GameNoPlayersException,
        gameCode: string,
    ) => {
        this.log.silly('GameExceptionFilter::onCompleteException', { gameCode });
    }
}
