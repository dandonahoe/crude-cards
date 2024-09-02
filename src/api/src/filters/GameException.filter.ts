import { GameNotEnoughPlayersException } from '../exceptions/GameNotEnoughPlayers.exception';
import { GameNoPlayersException } from '../exceptions/GameNoPlayers.exception';
import { GameCompleteException } from '../exceptions/GameComplete.exception';
import { Catch, ArgumentsHost, Inject, Injectable } from '@nestjs/common';
import { GameException } from '../exceptions/Game.exception';
import { WSE } from '../exceptions/WebSocket.exception';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GameService } from '../game/game.service';
import { BaseExceptionFilter } from '@nestjs/core';
import { AuthDTO } from '../game/dtos/auth.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from 'winston';


/**
 * This filter handles all exceptions derived from GameException within WebSocket context.
 *
 * Usage:
 * - This filter should be used to handle game-related exceptions during WebSocket communication.
 * - The filter logs the exception and processes it based on its type, such as no players,
 *   not enough players, game completion, or generic game exceptions.
 */
@Catch(GameException)
@Injectable()
export class GameExceptionFilter extends BaseExceptionFilter {

    /**
     * @param log          - Logger instance for logging purposes.
     * @param gameService  - Service for handling game-related logic and updates.
     */
    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        @Inject()
        private readonly gameService : GameService,
    ) {
        super();
        this.log.silly('GameExceptionFilter::constructor');
    }

    /**
     * Catches and handles exceptions related to game logic during WebSocket communication.
     *
     * @param gameExc      - The exception to be handled.
     * @param argumentHost - The context of the current request.
     */
    public override async catch(
        gameExc: GameException,
        argumentHost: ArgumentsHost,
    ): Promise<void> {
        console.log('GameException::catch');

        const executionContext = argumentHost.switchToWs();

        const baseDTO = executionContext.getData<AuthDTO>();
        const socket  = executionContext.getClient<Socket>();

        debugger;
        const server = await this.gameService.getSocketServer();

        const debugBundle = { socketId : socket.id, exc : gameExc, baseDTO };

        if (!baseDTO.game_code) {
            this.log.error('GameExceptionFilter::catch - No game code provided', { debugBundle });

            throw WSE.InternalServerError500('No game code provided', { debugBundle });
        }

        if (gameExc instanceof GameNoPlayersException)
            await this.handleGameNoPlayersException(server, gameExc, baseDTO.game_code, debugBundle);

        else if (gameExc instanceof GameNotEnoughPlayersException)
            await this.handleGameNotEnoughPlayersException(server, gameExc, baseDTO.game_code, debugBundle);

        else if (gameExc instanceof GameCompleteException)
            await this.handleGameCompleteException(server, gameExc, baseDTO.game_code, debugBundle);

        else
            await this.handleGenericGameException(server, gameExc, baseDTO.game_code, debugBundle);

        throw WSE.InternalServerError500('Unhandled GameException Exception', { debugBundle });
    }

    /**
     * Handles cases where no players are present in the game.
     *
     * @param socket      - The WebSocket client.
     * @param _exception  - The specific exception thrown.
     * @param gameCode    - The code of the game affected.
     * @param debugBundle - Additional debug information.
     */
    private async handleGameNoPlayersException(
        server      : Server,
        _exception  : GameNoPlayersException,
        gameCode    : string,
        debugBundle : Record<string, unknown>,
    ): Promise<void> {

        this.log.silly('GameExceptionFilter::handleGameNoPlayersException', { debugBundle });

        // Still emit game update for future observer and player types.
        await this.gameService.emitGameUpdate(
            server, gameCode, false, [], 'Handling GameNoPlayersException context',
        );
    }

    /**
     * Handles cases where there are not enough players in the game.
     *
     * @param socket            - The WebSocket client.
     * @param _exception    - The specific exception thrown.
     * @param gameCode        - The code of the game affected.
     * @param debugBundle  - Additional debug information.
     */
    private async handleGameNotEnoughPlayersException(
        server: Server,
        _exception: GameNotEnoughPlayersException,
        gameCode: string,
        debugBundle: Record<string, unknown>,
    ): Promise<void> {
        this.log.silly('GameExceptionFilter::handleGameNotEnoughPlayersException', { debugBundle });

        await this.gameService.emitGameUpdate(
            server, gameCode, false, [], 'Handling GameNotEnoughPlayersException context',
        );
    }

    /**
     * Handles cases where the game has been completed.
     *
     * @param socket       - The WebSocket client.
     * @param _exception   - The specific exception thrown.
     * @param gameCode     - The code of the game affected.
     * @param debugBundle  - Additional debug information.
     */
    private async handleGameCompleteException(
        server: Server,
        _exception: GameCompleteException,
        gameCode: string,
        debugBundle: Record<string, unknown>,
    ): Promise<void> {
        this.log.silly('GameExceptionFilter::handleGameCompleteException', { debugBundle });

        await this.gameService.emitGameUpdate(
            server, gameCode, false, [], 'Handling GameCompleteException context',
        );
    }

    /**
     * Handles generic game exceptions not specifically handled by other methods.
     *
     * @param server       - The WebSocket client.
     * @param _exception   - The specific exception thrown.
     * @param gameCode     - The code of the game affected.
     * @param debugBundle  - Additional debug information.
     */
    private async handleGenericGameException(
        server: Server,
        _exception: GameException,
        gameCode: string,
        debugBundle: Record<string, unknown>,
    ): Promise<void> {
        this.log.silly('GameExceptionFilter::handleGenericGameException', { debugBundle });

        await this.gameService.emitGameUpdate(
            server, gameCode, false, [], 'Handling GameException context',
        );
    }
}
