import { Body, Inject, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { DealerPickBlackCardDTO } from './dtos/dealer-pick-black-card.dto';
import { GameSessionService } from '../game-session/game-session.service';
import { WebSocketEventType } from '../constant/websocket-event.enum';
import { PlayerSelectCardDTO } from './dtos/player-select-card.dto';
import { DealerPickWinnerDTO } from './dtos/dealer-pick-winner.dto';
import { GameSession } from '../game-session/game-session.entity';
import { ScoreLogService } from '../score-log/score-log.service';
import { WebSockException } from '../framework/WebSockException';
import { ZodValidationPipe } from '../pipes/ZodValidation.pipe';
import { validate as isUuidValid } from 'uuid';
import { FeedbackService } from '../feedback/feedback.service';
import { UpdateUsernameDTO } from './dtos/update-username.dto';
import { SubmitFeedbackDTO } from './dtos/submit-feedback.dto';
import { PlayerService } from '../player/player.service';
import { ScoreLog } from '../score-log/score-log.entity';
import { GameStage } from '../constant/game-stage.enum';
import { CardColor } from '../constant/card-color.enum';
import { type P } from '../../../type/framework/data/P';
import { Feedback } from '../feedback/feedback.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateGameDTO } from './dtos/create-game.dto';
import { CookieType, DisconnectPlayer } from '../type';
import { Server as SocketIOServer } from 'socket.io';
import { GameStateDTO } from './dtos/game-state.dto';
import { StartGameDTO } from './dtos/start-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilService } from '../util/util.service';
import { SockService } from '../sock/sock.service';
import { CardService } from '../card/card.service';
import { NextHandDTO } from './dtos/next-hand.dto';
import { JoinGameDTO } from './dtos/join-game.dto';
import { ExitGameDTO } from './dtos/exit-game.dto';
import { Player } from '../player/player.entity';
import { WsException } from '@nestjs/websockets';
import { PlayerDTO } from './dtos/player.dto';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { difference } from 'lodash';
import { Socket } from 'socket.io';
import { Logger } from 'winston';


@Injectable()
export class GameService {

    public constructor(
        @InjectRepository(Game)
        private readonly gameRepo: Repository<Game>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        private readonly gameSessionService : GameSessionService,
        private readonly feedbackService    : FeedbackService,
        private readonly scoreLogService    : ScoreLogService,
        private readonly playerService      : PlayerService,
        private readonly utilService        : UtilService,
        private readonly sockService        : SockService,
        private readonly cardService        : CardService,
    ) {
        this.log.silly('GameService::constructor()');
    }

    /**
     * Return a Player given an socket conection
     *
     * @param socket - The player's socket instance
     *
     * @returns Player if they exist or null if there's no existing player tied to this socket
     */
    public findPlayerBySocket = async (socket: Socket) =>
        this.playerService.findPlayerBySocket(socket);


    private getWebSocketAuthToken = (socket: Socket) : string | null =>
        socket.handshake.auth[CookieType.AuthToken] ?? null;

    /**
     * Connects a player via socket, handles reconnection if the auth token is valid,
     * or creates a new player if no valid auth token is found.
     *
     * @param socket - The player's socket instance
     *
     * @returns The connected player entity
     */
    public connectPlayer = async (server : SocketIOServer, socket: Socket): P<void> => {

        // todo: break logic down, unit test bits

        this.log.silly('GameService::connectPlayer', { socketId : socket.id });

        let player: Player | null = null;

        // just obtain formatted info about the request
        const socketRequest = await this.sockService.getRequestInfoFromSocket(socket);

        // if there's an auth token, try to find the player. If no auth token
        // then theres no point. If a player is found, it doens't meant they're
        // in an active game, just that we matched it to a player that exists.
        if (socketRequest.authToken)
            player = await this.findPlayerByAuthToken(socket, socketRequest.authToken);

        // now either they had no token or the one they had was bogus,
        // so create a new player to work with
        if (!player) {
            this.log.debug('No player found for socket, creating new player.', socketRequest);

            player = await this.playerService.createPlayer(socketRequest.socketId);

            this.log.debug('New player created', player);
        }

        this.log.debug('Joining the player to their socket by their playerId', { playerId : player.id});

        await socket.join(player.id);

        this.log.debug('Player socket connected', player);

        // const game = this.getGameStateByGameCode
        const activeGameSession = await this.gameSessionService.findActivePlayerGameSession(player);

        // Not in any game, reset the token, set them to connected. They will be directed
        // to the home page with root url on the front end.
        if (!activeGameSession) {

            this.log.debug('Player not in active game, updating auth token', player);

            // This should keep the player tied to their existing player, but issued a new auth token
            // to continue using their player. Maybe dont need to refresh it... but it
            // ensures they're in a connected state and are set to receive a new auth token
            player = await this.playerService.updatePlayerAuthToken(player)

            this.emitPlayerAuthToken(server, player);

            return;
        }

        this.log.debug('Player found in active game session', {
            activeGameSession,
            player,
        });

        const game = await this.findGameByGameSession(activeGameSession);

        if(!game)  {
            this.log.error('There is no game found for the active game session.', activeGameSession);
            // Notably missing, auth token. If something wrong happens now,
            // invlaidate their token by just not reissuing it. They will
            // land on the homepage in a fresh state and go through the
            // auth process again.

            return;
        }

        this.log.silly("Found an existing player in active session of a game, running standard join game routine", {
            player, game, activeGameSession,
        });

        // Essentially the same as entering a game code on the homepage from here on.
        // It handles the new vs existing player logic

        return this.joinGame(
            server, new JoinGameDTO(player.auth_token!, game.game_code),
            'Joining Existing Game via Reconnect Routine');
    };
        // At this point, we have
        // Used the connecting browser's AuthToken to find a
        // player which did exist and they were part of a
        // game which is still active (like they hit refresh, back button, etc)


        // set the player as part of the game again, however they should be added to a UUID list
        // of player ids currently in "limbo" status. This is a list of players who are waiting
        // to join at the next opportunity, which is at the end of the round when the existing
        // dealer is prompted to Accept, Reject or Skip players in Limbo.

        // this.joinGame(player, activeGameSession);

        // this.log.info('Player connected', socketRequest);


        // Now we have a player, but are unsure if the are in a game or not
        // Grab the game code from the url, if present, and attempt
        // to get the active game the player is in, if any.


        // The player is in an active game already, but the game code in the url.
        // is different. We need to ask them if they meant to rejoin their existing
        // game, or join the new one. If the game code cannot be found in the database or
        // if the game is already over, then prompt the user with a message about the game
        // code being wrong, and ask them if they want to join the one they're actually active in.
        // This could happen if someone closes their browser, and uses an old link or bookmark
        // and needs to rejoin fast.

        // if the url they landed on has a game code in it


        // If the users token is valid, and their game is active, pick the existing player
        // and put them back into the game. We need to add a flag to have a player wait in the lobby until the next hand begins.
        // If they player was the dealer, they do not regain dealer status unless there are only 3 players.

        // If the dealer leaves mid game, the dealer has 30 seconds to rejoin. If they rejoin in time, the game continues
        // as normal. If they do not rejoin, tell the players they are all losers and end the game.

        // When any player first loads the game, this method is called and passed whatever AuthToken
        // value they have in their browser. It may or may not be valid, in that it may just be garbage, outdated
        // the game is over or other reasons. Valid game tokens are are tied to an existing player in an currently
        // active game.

        // When the game starts, a game code is generated and a url is updated to reflect the game code,
        // in the format https://crude.cards/game/{gameCode}. The game code is used to join the game room
        // more easily when shared. When a player loads the app from a game code url, the regular auth routine
        // followed to ensure their auth token is valid, then a a check is made with their game code. If the
        // player is in the game specified by the game code, they are joined to the
        // game and pur into "Limbo" status, where they wait until the
        // next hand starts. The current dealer will be prompted to let them into the game, along with other waiting players.

        // If if the player uses a game code url for a different game than the one they are currently in, they should
        // receive a prompt about leaving the current game to join the new one.

        // If the player uses a game code url that matches the AuthToken tied to a an existing player in that game, they
        // automatically join the "Limbo" status and wait for the next hand to start. The dealer of the game has the chance to let them in,
        // or skip them. If skipped, the lobby player receives a message they have been removed.
        // If accepted, the player joins the game as usual at the start of the next player round.

        // If the player hits the bare homepage, this connection function should lookup the AuthToken player, then
        // attempt to autojoin the existing game if it is active. If the game is not active, a new player is created for the user
        // and they remain on the home page.

        // Just before this websocket connection is made, the AuthToken cookie data is copied and sent here, but deleted
        // from the browser. The standard flow (this function) is meant to broadcast the AuthToken the regular way
        // to keep the logic simplified. Plus if something breaks down, their token is cleared and the next page refresh is more
        // likely to work. not a fix, just a bandaid that happens to be there (log error if this happens though).


        // 1. Check if the socket has an auth token
        //    YES - Try to rejoin the player to their existing room

        //    NO  - Create a new player and join them to a new room
        // we
        // const authToken = this.getWebSocketAuthToken(socket);

        // if (authToken) {
        //     this.log.info('Auth token found in socket', { authToken, socketId : socket.id });

        //     const existingPlayer = await this.findPlayerByAuthToken(socket, authToken);

        //     if (existingPlayer) {
        //         this.log.info('Player reconnected to private socket room', { playerId : existingPlayer.id });

        //         return existingPlayer;
        //     }

        // } else {
        //     this.log.info('No auth token found in socket', { socketId : socket.id });
        // }

        // const newPlayer = await this.createNewPlayer(socket);

        // this.log.info('Player joined private socket room', { playerId : newPlayer.id });

        // return newPlayer;

        // this.isTokenValid()
        // this.getPlayerByAuthToken()
        // this.getActiveGameByAuthToken()
        // this.getActiveSessionByAuthToken()
        // this.bootPlayerFromGame();
        // this.bootDealerFromGame();
        // this.bootBlayerFromGame();
        // this.acceptPlayerFromLimbo();
        // this.rejectPlayerFromLimbo();
        // this.leaveGame();
        // this.replaceDealer(game);
        // this.endGame();

        // SCAFFOLD


    /**
     * Ensures that the game is in a proper state before proceeding with any actions.
     * This method is used to validate the game state before any player actions are executed.
     */
    private ensureProperGameState = async () => {
        this.log.silly('GameGateway::ensureProperGameState');

        return true;
    }

    /**
     * Attempts to find an existing player by auth token.
     * If found, updates the socket ID and returns the player.
     *
     * @param socket - The player's socket instance
     * @param authToken - The player's authentication token
     *
     * @returns The existing player entity, or null if not found
     */
    private async findPlayerByAuthToken(
        socket: Socket,
        authToken: string | null,
    ): P<Player | null> {
        this.log.silly('GameService::findPlayerByAuthToken', { socketId : socket.id, authToken });

        if (!authToken) return null;

        if(!isUuidValid(authToken)) {
            this.log.warn('Invalid Auth Token', { socketId : socket.id, authToken });

            return null;
        }

        return this.playerService.getPlayerByAuthToken(authToken);
    }

    /**
    * Disconnects a player from the game session and handles socket clean-up.
    *
    * @param socket - The player's socket instance
    *
    * @returns The disconnected player and the associated game session details (if any)
    */
    public disconnectPlayer = async (socket: Socket): P<DisconnectPlayer> => {

        this.log.debug('Disconnecting player from game', { socketId : socket.id });

        // check what state the socket is in.
        const player = await this.findPlayerBySocket(socket);

        if (!player) {
            // tell the client to destroy its Auth Token
            // if it exists. Or do nothing and wait for the re-up to kill it
            //..... actually thats better, central place. Noop here

            this.log.warn(`Player not found for socket ID: ${socket.id}`, { socketId : socket.id });

            return { game : null, player : null };
        }

        const { game, session } = await this.getPlayerStateByAuthToken(player.auth_token!);

        await this.leavePlayerSocketRoom(socket, player);

        if (session && game)
            this.leaveGameSocketRoom(socket, game!);
        else
            this.log.error('No game or session found for player', {
                playerId : player.id,
                socketId : socket.id,
            });

        this.log.info('Player disconnected successfully', {
            playerId : player.id,
            socketId : socket.id,
            gameCode : game?.game_code,
        });

        return { game, player };
    }

    /**
     * Makes the socket leave the player's room.
     *
     * @param socket - The player's socket instance
     * @param player - The player entity
     */
    private leavePlayerSocketRoom = async (
        socket: Socket, player: Player,
    ) => {
        const roomId = player.id;

        socket.leave(roomId);

        this.log.debug(`Player left room: ${roomId}`, {
            roomId, socketId : socket.id, player,
        });
    }

    /**
     * Makes the socket leave the game's room.
     *
     * @param socket - The player's socket instance
     * @param game - The game entity
     */
    private leaveGameSocketRoom = async (
        socket: Socket, game: Game,
    ) => {
        socket.leave(game.game_code!);

        this.log.debug(`Player left game room: ${game.game_code}`, { game });
    }

    /**
     * Handles the process of exiting a game for a player, including session cleanup and returning the updated game state.
     *
     * @param exitGame - The DTO containing information needed to exit the game
     *
     * @returns The updated game state for the exiting player
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async exitGame(
        server : SocketIOServer,
        @Body(new ZodValidationPipe(ExitGameDTO.Schema))
        exitGame: ExitGameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameService::exitGame', exitGame);

        // Fetch player state based on auth token
        const playerState = await this.getPlayerStateByAuthTokenOrFail(exitGame.auth_token!);

        // Remove the player from the session
        await this.removePlayerFromSession(playerState);

        await this.emitGameUpdate(server, playerState.game.game_code);

        // Build and return the game state DTO for the player
        return this.buildGameStateDTO(playerState.game.game_code!, playerState.currentPlayer.id!);
    }


    /**
     * Removes a player from the session and handles session cleanup.
     * @param playerState - The state object containing the current player, game, and session details
     */
    private removePlayerFromSession = async (
        playerState: {
            currentPlayer: Player,
            game: Game,
            session: GameSession
        },
    ) => {
        const { currentPlayer, session } = playerState;

        await this.gameSessionService.removePlayer(currentPlayer, session);

        this.log.info('Player removed from session', {
            playerId  : currentPlayer.id,
            sessionId : session.id,
        });
    };

    /**
     * Constructs the game state DTO for the specified player.
     *
     * @param gameCode - The game code for the session
     * @param playerId - The ID of the current player
     *
     * @returns The constructed GameStateDTO for the player
     */
    private buildGameStateDTO = async (
        gameCode: string,
        playerId: string,
    ): P<GameStateDTO> => {
        this.log.silly('GameService::buildGameStateDTO', {
            gameCode, playerId,
        });

        return this.getGameStateAsPlayer(gameCode, playerId);
    }

    // public async updateUsername()
    public findGameByGameSession = async (
        gameSession: GameSession,
    ): P<Game | null> => {

        this.log.silly('GameService::findGameByGameSession', gameSession);

        return this.gameRepo.findOneBy({
            id : gameSession.game_id!,
        });
    }

    /**
     *  Gets the game state for the current player.
     * @param authToken - The authentication token of the player
     *
     * @returns - The game state for the current player
     */
    public getPlayerStateByAuthTokenOrFail = async (
        authToken: string,
    ): P<{
        currentPlayer: Player,
        scoreLog: ScoreLog | null,
        session: GameSession,
        players: Player[],
        game: Game,
    }> => {
        this.log.silly('GameService::getPlayerStateByAuthTokenOrFail', authToken);

        const { currentPlayer, game, session } = await this.getPlayerStateByAuthToken(authToken);

        const debugInfo = { authToken };

        if (!currentPlayer) throw new WebSockException('Invalid Auth Token, No Player', debugInfo);
        if (!session) throw new WebSockException(`Invalid Auth Token ${authToken}, No Session`, debugInfo);
        if (!game) throw new WebSockException('Invalid Auth Token, No Game', debugInfo);

        const [scoreLog, players] = await Promise.all([
            this.scoreLogService.findScoreLogBySession(session),
            this.playerService.findPlayersInSession(session),
        ]);

        // There is no score log when the game is in lobby mode before beginning. It's
        // created at startGame

        return {
            currentPlayer, scoreLog, session, players, game,
        };
    };


    /**
     * Gets as much data about the user, given the authToken
     *
     * @param authToken - The auth token of the user
     * @returns Objects related to the user with authToken
     */
    public async getPlayerStateByAuthToken(
        authToken: string,
    ): P<{
        currentPlayer: Player,
        scoreLog: ScoreLog | null,
        session: GameSession | null,
        players: Player[] | null,
        game: Game | null,
    }> {
        this.log.silly('GameService::getPlayerStateByAuthToken', authToken);

        const currentPlayer = await this.playerService.getPlayerByAuthToken(authToken);

        if (!currentPlayer)
            throw new WebSockException(`Invalid Auth Token (${authToken}), No Player Found`);

        const session = await this.gameSessionService.findActivePlayerGameSession(currentPlayer);

        if (!session)
            return {
                scoreLog : null, session : null, players : null, game : null,
                currentPlayer,
            };

        const [
            scoreLog, players, game,
        ] = await Promise.all([
            this.scoreLogService.findScoreLogBySession(session),
            this.playerService.findPlayersInSession(session),
            this.findGameByGameSession(session),
        ]);

        return {
            currentPlayer, scoreLog, session, players, game,
        };
    }


    /**
     * Handles the submission of feedback from a player.
     * This method retrieves the relevant player, session, and game context
     * based on the provided authentication token and then passes the feedback
     * to the feedback service for further processing.
     *
     * @param submitFeedback - DTO containing the feedback details and the player's authentication token
     *
     * @returns The submitted feedback entity
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async submitFeedback(
        @Body(new ZodValidationPipe(SubmitFeedbackDTO.Schema))
        submitFeedback: SubmitFeedbackDTO,
    ): P<Feedback> {
        // Log the beginning of the feedback submission process
        this.log.silly('GameService::submitFeedback', submitFeedback);

        this.ensureProperGameState();

        // Retrieve the current player, session, and game based on the auth token
        const {
            currentPlayer, session, game,
        } = await this.getPlayerStateByAuthToken(submitFeedback.auth_token!);

        // Submit the feedback using the feedback service and return the resulting feedback entity
        return this.feedbackService.submitFeedback(
            submitFeedback, currentPlayer, session, game);
    }


    /**
     * Handles the progression of the game to the next hand.
     * This function manages the end of a round, determines the next game stage, assigns a new dealer,
     * deals new cards, and updates the game state.
     *
     * @param nextHand - DTO containing the authentication token for the player initiating the next hand
     *
     * @returns The updated game state for the current player
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async nextHand(
        server : SocketIOServer,
        @Body(new ZodValidationPipe(NextHandDTO.Schema))
        nextHand: NextHandDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameService::nextHand', nextHand);

        this.ensureProperGameState();

        // Retrieve the player, game, session, and player list using the provided auth token
        const {
            currentPlayer, game, session, players,
        } = await this.getPlayerStateByAuthTokenOrFail(nextHand.auth_token!);

        // Determine the next stage of the game based on round count and player scores
        const newGameStagePromise = this.determineNextGameStage(session, game, players);

        // Select the next dealer for the upcoming round
        const newDealerIdPromise = this.selectNextDealerId(session);

        // Deal new cards to the dealer and players (parallelized where possible)
        const dealCardsPromise = this.dealCardsToPlayers(session);

        // Create or update the score log for the session
        const newScoreLogPromise = this.scoreLogService.relateToSession(session);

        // Await all promises concurrently
        const [
            newGameStage, newDealerId, [newDealerCards, newWhiteCards], newScoreLog,
        ] = await Promise.all([
            newGameStagePromise, newDealerIdPromise, dealCardsPromise, newScoreLogPromise,
        ]);

        this.log.silly('GameService::nextHand', {
            newGameStage, newDealerId, newDealerCards, newWhiteCards, newScoreLog,
        });

        // Progress to the next hand in the game session
        await this.gameSessionService.nextHand(
            newDealerCards, newWhiteCards,
            newGameStage,   newDealerId,
            newScoreLog,    session);

        await this.emitGameUpdate(server, game.game_code);

        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code, currentPlayer.id);
    }


    /**
     * Determines the next game stage based on the session's round count and player scores.
     * If the game has reached its maximum rounds or if a player has reached the winning score,
     * the game stage is set to GameComplete. Otherwise, it remains in the DealerPickBlackCard stage.
     *
     * @param session - The current game session
     * @param game    - The current game entity
     * @param players - The list of players in the session
     *
     * @returns The updated game stage
     */
    private determineNextGameStage = async (
        session : GameSession,
        game    : Game,
        players : Player[],
    ): P<GameStage> => {
        this.log.silly('GameService::determineNextGameStage', session);

        // Calculate the current round count for the session
        const gameRoundCountPromise = this.getCountGameRounds(session);

        // Check if any player has reached or exceeded the maximum points
        const winningPlayerPromise = this.getPlayerOverMaxPoints(
            players, game.max_point_count);

        // Await both promises concurrently
        const [gameRoundCount, winningPlayer] = await Promise.all([
            gameRoundCountPromise, winningPlayerPromise,
        ]);

        this.log.silly('GameService::determineNextGameStage', {
            gameRoundCount, winningPlayer,
        });

        // If the round count has reached or exceeded the maximum, the game is complete
        if (gameRoundCount >= game.max_round_count) {
            this.log.info('GameService::determineNextGameStage - Game Complete due to max rounds reached', gameRoundCount);

            return GameStage.GameComplete;
        }

        // If a winning player is found, mark the game as complete and award the winner
        if (winningPlayer) {
            this.log.info('GameService::determineNextGameStage - Game Complete due to winning player', winningPlayer);

            await this.gameSessionService.awardWinnerAndComplete(session, winningPlayer.id!);

            return GameStage.GameComplete;
        }

        // Default to the DealerPickBlackCard stage for the next round
        this.log.info('GameService::determineNextGameStage - Proceeding to DealerPickBlackCard stage');

        return GameStage.DealerPickBlackCard;
    }


    /**
     * Deals new cards to players and returns the updated lists of dealer cards and white cards.
     * The dealer is assigned 10 new black cards, while each player (except the dealer) is assigned a new white card.
     * The card assignment operations are fully parallelized for maximum efficiency.
     *
     * @param session - The current game session
     *
     * @returns An array with the dealer's new black cards and the players' new white cards
     */
    private dealCardsToPlayers = async (
        session: GameSession,
    ): P<[string[], string[]]> => {
        this.log.silly('GameService::dealCardsToPlayers - Start', session);

        // Determine the remaining cards that haven't been used yet
        const remainingBlackCardIds = difference(session.black_cards, session.used_black_cards);
        const remainingWhiteCardIds = difference(session.white_cards, session.used_white_cards);

        this.log.debug('Remaining Black Card IDs:', remainingBlackCardIds);
        this.log.debug('Remaining White Card IDs:', remainingWhiteCardIds);

        // Assign 10 new black cards to the dealer
        const newDealerCardIds = remainingBlackCardIds.slice(0, 10);
        this.log.debug('New Dealer Card IDs:', newDealerCardIds);

        // Prepare an array of promises for new white card assignments
        const newWhiteCardPromises = session.player_id_list.map(
            (playerId, index) => {
                // Skip the dealer when assigning white cards
                if (this.isPlayerDealer(playerId, session)) {
                    this.log.debug(`Skipping dealer player ID: ${playerId}`);

                    return null;
                }

                const newWhiteCardId = remainingWhiteCardIds[index];
                this.log.debug(`Assigning White Card ID: ${newWhiteCardId} to Player ID: ${playerId}`);

                // Return the promise for adding the white card to the player
                return this.playerService.addWhiteCardToPlayer(
                    playerId, newWhiteCardId,
                ).then(() => {
                    this.log.debug(`Successfully assigned White Card ID: ${newWhiteCardId} to Player ID: ${playerId}`);

                    return newWhiteCardId;
                }).catch(error => {
                    this.log.error(`Error assigning White Card ID: ${newWhiteCardId} to Player ID: ${playerId}`, error);
                    throw error;
                });
            });

        // Resolve all asynchronous operations in parallel and filter out null values (for dealer)
        const newWhiteCardIds = (
            await Promise.all(newWhiteCardPromises)
        ).filter(Boolean) as string[];
        this.log.debug('New White Card IDs:', newWhiteCardIds);

        this.log.silly('GameService::dealCardsToPlayers - End');

        return [newDealerCardIds, newWhiteCardIds];
    }


    /**
     * Handles the action when the dealer selects a black card to begin the round.
     * Updates the session with the selected black card and returns the updated game state.
     *
     * @param dealerPickBlackCard - DTO containing the selected black card ID and the dealer's auth token
     *
     * @returns The updated game state for the current player
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async dealerPickBlackCard(
        server : SocketIOServer,
        @Body(new ZodValidationPipe(DealerPickBlackCardDTO.Schema))
        dealerPickBlackCard: DealerPickBlackCardDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameService::dealerPickBlackCard', {
            authToken : dealerPickBlackCard.auth_token,
        });

        this.ensureProperGameState();

        // Retrieve the player, game, and session details using the provided auth token
        const playerStatePromise = this.getPlayerStateByAuthTokenOrFail(dealerPickBlackCard.auth_token!);

        // Update the session with the dealer's selected black card
        const updateSessionPromise = playerStatePromise.then(({ session }) =>
            this.updateSessionWithDealerPick(session, dealerPickBlackCard.card_id!),
        );

        // Await both promises concurrently
        const [{ currentPlayer, game }] = await Promise.all([playerStatePromise, updateSessionPromise]);

        await this.emitGameUpdate(server, game.game_code);

        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code, currentPlayer.id);
    }


    /**
     * Updates the game session with the selected black card picked by the dealer.
     *
     * @param session - The current game session
     * @param cardId - The ID of the black card selected by the dealer
     */
    private updateSessionWithDealerPick = async (
        session: GameSession, cardId: string,
    ) => {
        this.log.debug('GameService::updateSessionWithDealerPick', {
            sessionId : session.id, cardId,
        });

        await this.gameSessionService.dealerPickedBlackCard(session, cardId);
    }

    /**
     * Handles the action when the dealer picks a winning white card.
     * Updates the score, checks for a game winner, and progresses the game stage accordingly.
     *
     * @param dealerPickWinner - DTO containing the selected winning white card ID and the dealer's auth token
     *
     * @returns The updated game state for the current player
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async dealerPickWinner(
        server : SocketIOServer,
        @Body(new ZodValidationPipe(DealerPickWinnerDTO.Schema))
        dealerPickWinner: DealerPickWinnerDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameService::dealerPickWinner - Start', dealerPickWinner);

        this.ensureProperGameState();
        this.log.debug('Ensured proper game state');

        // Retrieve the player (dealer), game, session, and score log using the provided auth token
        const {
            dealer, players, game, session, scoreLog,
        } = await this.getDealerAndSessionData(dealerPickWinner.auth_token!);
        this.log.debug('Retrieved dealer and session data', { dealer, players, game, session, scoreLog });

        // Validate the score log and the dealer
        this.validateDealerAndScoreLog(dealer, session, scoreLog);
        this.log.debug('Validated dealer and score log', { dealer, session, scoreLog });

        // Determine the winning player based on the selected card ID
        const winningPlayer = await this.getWinningPlayer(players, dealerPickWinner.card_id!);
        this.log.debug('Determined winning player', { winningPlayer, cardId : dealerPickWinner.card_id });

        // Update the score log and player's score in parallel
        await this.updateScoreAndPlayer(scoreLog, session, dealer, dealerPickWinner.card_id!, winningPlayer);
        this.log.debug('Updated score and player', { scoreLog, session, dealer, cardId : dealerPickWinner.card_id, winningPlayer });

        // Check if the game is complete and progress to the next stage accordingly
        await this.progressGameOrShowHandResults(game, session, winningPlayer);
        this.log.debug('Progressed game or showed hand results', { game, session, winningPlayer });

        // Return the updated game state for the dealer
        const gameState = await this.getGameStateAsPlayer(game.game_code, dealer.id!);
        this.log.silly('GameService::dealerPickWinner - End', gameState);

        await this.emitGameUpdate(server, gameState.game_code);

        return gameState;
    }


    /**
     * Sends a new auth token to the client
     *
     * @param player - The player entity
     * @param server - The socket.io server instance
     *
     * @returns
     */
    private emitPlayerAuthToken = async (server : SocketIOServer, player : Player) =>
        server
            .to(player.id!)
            .emit(
                WebSocketEventType.UpdatePlayerValidation,
                player.auth_token,
            );


    /**
     * Broadcasts the game update to all players in the game.
     *
     * @param server - The socket.io server instance
     * @param gameCode - The game code to broadcast the update to
     * @param includeDeck - Whether to include the deck in the update
     * @returns A promise that resolves when the game update has been broadcast to all players
     */
    private emitGameUpdate = async (
        server      : SocketIOServer,
        gameCode    : string | null,
        includeDeck : boolean = false,
    ) => {
        this.log.silly('GameService::broadcastGameUpdate', { gameCode, includeDeck });

        if(!gameCode) throw new WsException(`Invalid game code ${gameCode}`);

        const gameStatusList = await this.getAllPlayersGameStatus(gameCode, includeDeck);

        return Promise.all(
            gameStatusList.map(gameStatus =>
                server
                    .to(gameStatus.current_player_id!)
                    .emit(WebSocketEventType.UpdateGame, gameStatus),
            ),
        );
    }


    /**
     * Retrieves the dealer, game, session, players, and score log based on the provided auth token.
     *
     * @param authToken - The dealer's authentication token
     *
     * @returns An object containing the dealer, players, game, session, and score log
     */
    private getDealerAndSessionData = async (authToken: string) => {
        const {
            currentPlayer: dealer, players, game, session, scoreLog,
        } = await this.getPlayerStateByAuthTokenOrFail(authToken);

        if (!scoreLog)
            throw new WebSockException(`No score log found for session ${session.id} and game ${game.id}`);

        return {
            dealer, players, game, session, scoreLog,
        };
    }

    /**
     * Validates that the current player is the dealer and that a valid score log is present.
     *
     * @param dealer - The current player acting as the dealer
     * @param session - The current game session
     * @param scoreLog - The current score log
     */
    private validateDealerAndScoreLog = async (
        dealer: Player, session: GameSession, scoreLog: ScoreLog,
    ) => {
        if (dealer.id !== session.dealer_id)
            throw new WebSockException(`Player ${dealer.id} is not the dealer $${scoreLog.id}`);
    }

    /**
     * Identifies the winning player based on the selected card ID.
     *
     * @param players - The list of players in the session
     * @param selectedCardId - The ID of the selected winning white card
     *
     * @returns The winning player
     */
    private getWinningPlayer = async (
        players: Player[], selectedCardId: string,
    ) => {
        const winningPlayerResults = players.filter(player =>
            player.card_id_list.includes(selectedCardId),
        );

        if (winningPlayerResults.length !== 1)
            throw new WebSockException('Invalid card ID or multiple players found with the same card');

        return winningPlayerResults[0];
    };


    /**
     * Updates the score log and increments the winning player's score in parallel.
     *
     * @param scoreLog       - The current score log
     * @param session        - The current game session
     * @param dealer         - The dealer making the selection
     * @param selectedCardId - The ID of the selected winning white card
     * @param winningPlayer  - The player identified as the winner
     */
    private updateScoreAndPlayer = async (
        scoreLog: ScoreLog,
        session: GameSession,
        dealer: Player,
        selectedCardId: string,
        winningPlayer: Player,
    ) =>
        await Promise.all([
            this.scoreLogService.updateScore(scoreLog, session, winningPlayer, selectedCardId, dealer),
            this.playerService.incrementPlayerScore(winningPlayer),
        ]);

    /**
     * Checks if the game is complete based on the winning player's score and either awards the winner
     * or progresses to the next game stage to show hand results.
     *
     * @param game          - The current game entity
     * @param session       - The current game session
     * @param winningPlayer - The player identified as the winner
     */
    private progressGameOrShowHandResults = async (
        game: Game,
        session: GameSession,
        winningPlayer: Player,
    ) => {
        if (winningPlayer.score >= game.max_point_count)
            this.gameSessionService.awardWinnerAndComplete(session, winningPlayer.id!);
        else
            this.gameSessionService.showHandResults(session);
    }

    /**
     * Starts the game by assigning cards to players,
     * setting up the game session, and returning the updated game state.
     *
     * @param startGame - DTO containing the player's authentication token
     * @returns The updated game state for the current player
    */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async startGame(
        server : SocketIOServer,
        @Body(new ZodValidationPipe(StartGameDTO.Schema))
        startGame: StartGameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameService::startGame');

        this.ensureProperGameState();

        const {
            currentPlayer, game, session,
        } = await this.getPlayerStateByAuthTokenOrFail(startGame.auth_token!);

        // Ensure that the current player is the host
        this.ensurePlayerIsHost(currentPlayer, game);

        // Retrieve the game state and relevant data
        const gameStateGeneric = await this.getGameStateGeneric(game.game_code!, true);

        // Calculate card counts needed for the game
        const {
            whiteCardTotalCount, blackCardTotalCount,
        } = await this.calculateCardCounts(gameStateGeneric);

        // Retrieve the deck of white and black cards for the game
        const {
            allWhiteCardIds, allBlackCardIds,
        } = await this.fetchCardDecks(whiteCardTotalCount, blackCardTotalCount);

        // Assign cards to players and prepare the session
        await this.assignCardsToPlayers(gameStateGeneric.player_list, allWhiteCardIds);

        // Set up the game session with the retrieved cards
        await this.setupGameSession(session, currentPlayer, allBlackCardIds, allWhiteCardIds);

        await this.emitGameUpdate(server, game.game_code);

        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code, currentPlayer.id);
    }

    /**
     * Ensures that the current player is the host of the game.
     * Throws an exception if the player is not the host.
     *
     * @param currentPlayer - The current player entity
     * @param game - The current game entity
     */
    private ensurePlayerIsHost = async (currentPlayer: Player, game: Game) => {
        if (currentPlayer.id !== game.host_player_id)
            throw new WebSockException(`Player ${currentPlayer.id} is not the host. Host is ${game.host_player_id}.`);
    }

    /**
     * Calculates the total number of white and black cards needed for the game.
     *
     * @param gameStateGeneric - The generic game state containing player and round information
     *
     * @returns An object containing the calculated whiteCardTotalCount and blackCardTotalCount
     */
    private calculateCardCounts = async (
        gameStateGeneric: GameStateDTO,
    ): P<{
        whiteCardTotalCount: number, blackCardTotalCount: number
    }> => {
        const maxRoundCount = gameStateGeneric.max_round_count;
        const playerCount = gameStateGeneric.player_list.length;

        const whiteCardTotalCount = (playerCount * 10) + (maxRoundCount * (playerCount - 1)); // minus dealer
        const blackCardTotalCount = maxRoundCount * 10; // Each round a dealer gets 10 fresh cards

        return { whiteCardTotalCount, blackCardTotalCount };
    }

    /**
     * Fetches the deck of white and black cards required for the game.
     *
     * @param whiteCardTotalCount - The total number of white cards needed
     * @param blackCardTotalCount - The total number of black cards needed
     *
     * @returns An object containing arrays of white and black card IDs
     */
    private fetchCardDecks = async (
        whiteCardTotalCount: number, blackCardTotalCount: number,
    ): P<{ allWhiteCardIds: string[], allBlackCardIds: string[] }> => {

        const [allWhiteCards, allBlackCards] = await Promise.all([
            this.cardService.selectRandomCards(CardColor.White, whiteCardTotalCount),
            this.cardService.selectRandomCards(CardColor.Black, blackCardTotalCount),
        ]);

        return {
            allWhiteCardIds : allWhiteCards.map(card => card.id),
            allBlackCardIds : allBlackCards.map(card => card.id),
        };
    }

    /**
     * Assigns the white cards to players in the game.
     *
     * @param playerList - The list of players in the game
     * @param allWhiteCardIds - The list of white card IDs to distribute
     * @param session - The current game session entity
     */
    private assignCardsToPlayers = async (
        playerList: PlayerDTO[], allWhiteCardIds: string[],
    ) => {
        const usedWhiteCardIds: string[] = [];

        const updatePromises = playerList.map((player, index) => {
            const playerWhiteCardIds = allWhiteCardIds.slice(
                index * 10,
                (index + 1) * 10,
            );

            usedWhiteCardIds.push(...playerWhiteCardIds);

            return this.playerService.updatePlayerWhiteCardIds(player.id!, playerWhiteCardIds);
        });

        return Promise.all(updatePromises);
    }

    /**
     * Sets up the game session by initializing the session, creating a score log, and updating card details.
     *
     * @param session - The current game session entity
     * @param currentPlayer - The player who initiated the game start
     * @param allBlackCardIds - The list of black card IDs for the game
     * @param allWhiteCardIds - The list of white card IDs for the game
     */
    private setupGameSession = async (
        session: GameSession,
        currentPlayer: Player,
        allBlackCardIds: string[],
        allWhiteCardIds: string[],
    ) => {
        const dealerCardIdList = allBlackCardIds.slice(0, 10);
        const currentScoreLog = await this.scoreLogService.createNewScoreLog(session);

        await this.gameSessionService.setupNewGameSession(
            session,
            currentPlayer,
            currentScoreLog,
            dealerCardIdList,
            allWhiteCardIds.slice(0, allWhiteCardIds.length),
            allBlackCardIds,
            allWhiteCardIds,
        );
    }

    /**
     * Handles updating a player's username. This method retrieves the player and game context
     * based on the provided authentication token, updates the username using the player service,
     * and then returns the updated game state for the current player.
     *
     * @param updateUsername - DTO containing the new username and the player's authentication token
     *
     * @returns The updated game state for the current player
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async updateUsername(
        server : SocketIOServer,
        @Body(new ZodValidationPipe(UpdateUsernameDTO.Schema))
        updateUsername: UpdateUsernameDTO,
    ): P<GameStateDTO> {
        // Log the beginning of the username update process
        this.log.silly('GameService::updateUsername', { updateUsername });

        this.ensureProperGameState();

        // Retrieve the current player and game based on the provided auth token
        const { currentPlayer, game } = await this.getPlayerStateByAuthTokenOrFail(updateUsername.auth_token!);

        // Update the player's username using the player service
        await this.playerService.updateUsername(currentPlayer, updateUsername.username);

        await this.emitGameUpdate(server, game.game_code);

        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code, currentPlayer.id);
    }


    /**
     * Handles the selection of a white card by a player.
     * This method retrieves the player's current game state, processes the selected card, and checks
     * if all players have submitted their selections. If so, it transitions the game to the dealer's selection stage.
     *
     * @param playerSelectCard - DTO containing the selected white card ID and the player's authentication token
     *
     * @returns The updated game state for the current player
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async playerSelectCard(
        server : SocketIOServer,
        @Body(new ZodValidationPipe(PlayerSelectCardDTO.Schema))
        playerSelectCard: PlayerSelectCardDTO,

    ): P<GameStateDTO> {
        // Log the beginning of the playerSelectCard process
        this.log.silly('GameService::playerSelectCard', {
            authToken : playerSelectCard.auth_token,
        });

        this.ensureProperGameState();

        // Retrieve the player's game state based on the provided auth token
        const playerState = await this.getPlayerStateByAuthTokenOrFail(
            playerSelectCard.auth_token!);

        const { game, currentPlayer } = playerState;
        let { session } = playerState;

        // Process the player's selected white card and update the session state
        session = await this.gameSessionService.playerSelectsWhiteCard(
            session, playerSelectCard.card_id!);

        // Check if all players (except the dealer) have selected their cards
        if (session.selected_card_id_list.length === session.player_id_list.length - 1)
            // Transition the game to the dealer's selection stage if all players have selected
            await this.gameSessionService.gotoDealerPickWinnerStage(session);


        await this.emitGameUpdate(server, game.game_code);

        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code, currentPlayer.id);
    }


    /**
     * Handles the creation of a new game.
     * This method initializes the game, sets up the game session, and returns the game state for the current player.
     *
     * @param createGame - DTO containing the player's authentication token
     *
     * @returns The game state for the current player after creating the game
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async createGame(
        server : SocketIOServer,
        @Body(new ZodValidationPipe(CreateGameDTO.Schema))
        createGame: CreateGameDTO,
    ): P<GameStateDTO> {


        // Log the beginning of the game creation process
        this.log.silly('GameService::createGame', { createGame });


        // Retrieve the current player based on the provided auth token
        const { currentPlayer } = await this.getPlayerStateByAuthToken(createGame.auth_token!);

        // Ensure the player leaves any open sessions before starting a new game
        await this.gameSessionService.leaveOpenSession(currentPlayer);

        // Generate a new game entity and persist it in the repository
        const game = await this.gameRepo.save({
            current_session_id : null, // No session initially, as it will be created later
            max_point_count    : 3,
            max_round_count    : 7,
            host_player_id     : currentPlayer.id,
            created_by         : currentPlayer.id,
            game_code          : await this.utilService.generateGameCode(4), // Generate a 4-character game code
        });

        // Initialize a new game session with the current player as the host
        const session = await this.gameSessionService.initSession(currentPlayer, game);

        // Update the game with the session reference after creation
        await this.gameRepo.update(game.id, { current_session_id : session.id! });

        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code, currentPlayer.id);
    }

    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async joinGame(
        server : SocketIOServer,
        @Body(new ZodValidationPipe(JoinGameDTO.Schema))
        joinGame: JoinGameDTO,
        debugContext ?: string,
    ): P<void> {

        this.log.silly('GameService::joinGame', { joinGame, debugContext });

        // The times when a game is joined is when
        // 1 - A player enters the code and joins the game
        // 2 - A player hits refresh and rejoins the game
        // 3 - A player leaves the game and rejoins the game
        // 4 - A player receives a custom url with a game code such as /game/dog

        // At this point, the player has been created and should have a valid
        // auth token
        const { session, game } = await this.getGameStateByGameCode(joinGame.game_code!);

        let { currentPlayer } = await this.getPlayerStateByAuthToken(joinGame.auth_token!);

        if (session.game_stage !== GameStage.Lobby)
            throw new WebSockException('Game already started, idiot.');

        currentPlayer = await this.playerService.ensureReadyToJoin(currentPlayer);

        await this.gameSessionService.addPlayerToSession(currentPlayer, session);

        await this.emitGameUpdate(server, game.game_code);

        // return this.getGameStateAsPlayer(game.game_code, currentPlayer.id, true);


    }

    /**
     * Retrieves the game state for a specific player in a session, including the player's perspective.
     * This method handles the main orchestration of getting the relevant game data and adjusting it
     * to reflect the player's specific view.
     *
     * @param gameCode    - The unique code identifying the game session.
     * @param playerId    - The ID of the player requesting the game state.
     * @param includeDeck - Optional flag to include deck details in the game state. Defaults to false.
     *
     * @returns The GameStateDTO representing the current state of the game for the specific player.
     * @throws WebSockException if any error occurs while retrieving the game state.
     */
    public getGameStateAsPlayer = async (
        gameCode: string | null,
        playerId: string | null,
        includeDeck: boolean = false,
    ): P<GameStateDTO> => {
        try {
            // Log the beginning of the game state retrieval process
            this.log.silly('GameService::getGameStateAsPlayer - Start', { gameCode, playerId, includeDeck });

            if(!playerId) throw new WebSockException('Invalid player ID');
            if(!gameCode) throw new WebSockException('Invalid game code');

            // Retrieve the game state using helper methods and adjust it to reflect the player's perspective
            const gameState = await this.getGameStateWithPlayerPerspective(gameCode, playerId, includeDeck);

            // Log success after successfully retrieving and adjusting the game state
            this.log.silly('GameService::getGameStateAsPlayer - Success', { gameCode, playerId, includeDeck });

            return gameState;
        } catch (error) {
            // Log any errors that occur during the process
            this.log.error('GameService::getGameStateAsPlayer - Error', { gameCode, playerId, error });

            // Throw a custom exception with a user-friendly message
            throw new WebSockException('Error retrieving game state');
        }
    };

    /**
     * Retrieves the game state with the current player's perspective.
     * @param gameCode    - The code of the game session
     * @param playerId    - The ID of the player requesting the state
     * @param includeDeck - Whether to include deck information in the game state
     *
     * @returns The constructed GameStateDTO for the player
     */
    private async getGameStateWithPlayerPerspective(
        gameCode: string,
        playerId: string,
        includeDeck: boolean,
    ): P<GameStateDTO> {
        this.log.silly('GameService::getGameStateWithPlayerPerspective', {
            gameCode, playerId, includeDeck,
        });

        const gameStateGeneric = await this.getGameStateGeneric(gameCode, includeDeck);

        // Map the generic game state to reflect the current player's perspective
        return this.buildPlayerSpecificGameState(gameStateGeneric, playerId);
    }

    /**
     * Builds a player-specific game state based on the generic game state.
     * @param gameStateGeneric - The generic game state
     * @param playerId - The ID of the player requesting the state
     *
     * @returns The GameStateDTO tailored for the specified player
     */
    private buildPlayerSpecificGameState = async (
        gameStateGeneric: GameStateDTO,
        playerId: string,
    ): P<GameStateDTO> => ({
        ...gameStateGeneric,
        current_player_id : playerId,
    });


    /**
     * Determines if any player has exceeded the maximum point count.
     * If multiple players exceed the maximum points, an error is thrown.
     *
     * @param players - The list of players in the current game session
     * @param maxPointCount - The maximum point count a player can reach before the game ends
     *
     * @returns The player who has exceeded the maximum points, or null if none have
     */
    private getPlayerOverMaxPoints = async (
        players: Player[], maxPointCount: number,
    ) => {
        // Log the beginning of the process
        this.log.silly('GameService::getPlayerOverMaxPoints', {
            maxPointCount, players,
        });

        // Filter players who have a score equal to or greater than the maximum point count
        const playersOverMaxPoints = players.filter(player =>
            player.score >= maxPointCount);

        // If no players exceed the max points, return null
        if (playersOverMaxPoints.length === 0)
            return null;

        // If more than one player exceeds the max points, throw an error
        if (playersOverMaxPoints.length > 1) {
            this.log.error('Multiple players exceed max points', { playersOverMaxPoints });

            throw new WebSockException('Multiple players over max points');
        }

        // Return the single player who exceeds the max points
        return playersOverMaxPoints[0];
    }

    /**
     * Retrieves the number of rounds played in the current game session.
     *
     * @param gameSession - The current game session entity
     *
     * @returns The total number of rounds played in the session
     */
    private getCountGameRounds = async (gameSession: GameSession) => {

        // Log the start of the round count retrieval process
        this.log.silly('GameService::getCountGameRounds', gameSession);

        // Retrieve and return the count of game rounds using the score log service
        const roundCount = await this.scoreLogService.countGameRounds(gameSession);

        // Log the retrieved round count
        this.log.silly('GameService::getCountGameRounds', {
            sessionId : gameSession.id, roundCount,
        });

        return roundCount;
    }

    /**
     * Retrieves the game status for all players in a session, including each player's
     * unique perspective of the game state.
     *
     * @param gameCode - The unique code of the game session
     * @param includeDeck - Whether or not to include the deck details in the game state
     * @returns A list of game state DTOs, one for each player, reflecting their specific game view
     */
    public getAllPlayersGameStatus = async (
        gameCode: string, includeDeck: boolean = false,
    ): P<GameStateDTO[]> => {

        this.log.silly('GameService::getAllPlayersGameStatus', {
            gameCode, includeDeck,
        });

        // Retrieve the generic game state which includes player details
        const gameStateDTO = await this.getGameStateGeneric(gameCode, includeDeck);

        // Map the generic game state to individual game states for each player
        return gameStateDTO.player_list.map(player => ({
            ...gameStateDTO,
            current_player_id : player.id, // Set each player's unique ID as the current player
        }));
    }

    /**
     *  Retrieves the game state by the game code, including the session, score log, and players.
     * @param gameCode - The unique code identifying the game session
     *
     * @returns - The game state DTO containing relevant game, session, and player data
     */
    private getGameStateByGameCode = async (gameCode: string): P<{
        scoreLog: ScoreLog | null;
        session: GameSession;
        players: Player[];
        game: Game;
    }> => {
        this.log.silly('GameService::getGameStateByGameCode', gameCode);

        try {
            // Perform game lookup with cleaned game code
            const cleanedGameCode = gameCode.toLowerCase().trim().replace(' ', '');
            const game = await this.gameRepo.findOneByOrFail({ game_code : cleanedGameCode });

            const session = await this.gameSessionService.findActiveGameSession(game);

            // Initiate parallel queries for session, score log, and players
            const [newSession, scoreLog, players] = await Promise.all([
                this.gameSessionService.findActiveGameSession(game),
                this.scoreLogService.findScoreLogBySession(session!),
                this.playerService.findPlayersInSession(session!),
            ]);

            this.log.silly('GameService::getGameStateByGameCode - Retrieved data', {
                playerCount : players.length,
                scoreLogId  : scoreLog?.id,
                sessionId   : newSession.id,
            });

            return {
                session : newSession,
                scoreLog,
                players,
                game,
            };
        } catch (error) {
            this.log.error('GameService::getGameStateByGameCode - Error retrieving data', { error });

            throw new WebSockException('Error retrieving game state by game code');
        }
    };

    /**
     * Retrieves the generic game state including the session, score log, players, and optionally the deck.
     *
     * @param gameCode    - The unique code identifying the game session
     * @param includeDeck - Whether to include the deck details in the game state
     *
     * @returns The game state DTO containing relevant game, session, and player data
    */
    private getGameStateGeneric = async (
        gameCode: string,
        includeDeck: boolean = false,
    ): P<GameStateDTO> => {
        this.log.silly('GameService::getGameStateGeneric', {
            gameCode, includeDeck,
        });

        // Retrieve the game state using the provided game code
        const {
            game, session, scoreLog, players,
        } = await this.getGameStateByGameCode(gameCode);

        // Transform the list of players into DTOs for consistency
        const playerListDTO: PlayerDTO[] = players.map(player => ({
            disconnected_at : player.disconnected_at?.toISOString() || null,
            card_id_list    : player.card_id_list,
            socket_id       : player.socket_id,
            username        : player.username,
            score           : player.score,
            id              : player.id,
        }));

        // Optionally include the game deck if requested
        let gameCardList = null;

        if (includeDeck) {
            const gameDeck = await this.cardService.findCardsBySession(session);

            gameCardList = gameDeck.map(card => ({
                id    : card.id,
                color : card.color,
                text  : card.text,
            }));
        }

        // Retrieve the number of rounds played in the session
        const countOfRoundsPlayed = await this.getCountGameRounds(session);

        // Build and return the game state DTO
        return {
            selected_card_id_list : session.selected_card_id_list,
            dealer_card_id_list   : session.dealer_card_id_list,
            new_deck_card_list    : gameCardList,
            champion_player_id    : session.champion_player_id,
            current_player_id     : null,
            winner_player_id      : scoreLog?.winner_player_id ?? null,
            max_round_count       : game.max_round_count,
            max_point_count       : game.max_point_count,
            winner_card_id        : scoreLog?.winner_card_id || null,
            dealer_card_id        : session.dealer_card_id,
            host_player_id        : game.host_player_id,
            error_message         : null,
            round_number          : countOfRoundsPlayed,
            player_list           : playerListDTO,
            hand_number           : session.hand_number,
            created_by            : game.created_by,
            created_at            : game.created_at?.toISOString() || null,
            updated_at            : game.updated_at?.toISOString() || null,
            game_stage            : session.game_stage,
            session_id            : session.id,
            game_code             : game.game_code,
            dealer_id             : session.dealer_id,
        };
    };

    /**
     * Determines and returns the next dealer's player ID based on the current session state.
     *
     * @param session - The current game session
     *
     * @returns The player ID of the next dealer
     */
    private selectNextDealerId = async (session: GameSession) => {

        this.log.silly('GameService::selectNextDealer', session);

        const { player_id_list, dealer_id } = session;

        if (!dealer_id) {
            this.log.error('No current dealer found in session', session);

            throw new WebSockException('No current dealer found in session');
        }

        const dealerIndex = player_id_list.indexOf(dealer_id);

        if (dealerIndex === -1) {
            this.log.error('Current dealer not found in player list', session);
            throw new WebSockException('Current dealer not found in player list');
        }

        // Determine the next dealer's index by wrapping around the list
        const nextDealerIndex = (dealerIndex + 1) % player_id_list.length;

        const nextDealerId = player_id_list[nextDealerIndex];

        this.log.silly('Next dealer selected', { nextDealerId, session });

        return nextDealerId;
    };

    /**
     * Checks if the specified player is the current dealer for the session.
     *
     * @param playerId - The ID of the player to check
     * @param session - The current game session
     *
     * @returns True if the player is the dealer, false otherwise
    */
    private isPlayerDealer = (
        playerId: string, session: GameSession,
    ) => {
        this.log.silly('GameService::isPlayerDealer', { playerId, sessionId : session.id });

        const isDealer = session.dealer_id === playerId;

        if (isDealer)
            this.log.debug('Player is the current dealer', { playerId, sessionId : session.id });
        else
            this.log.debug('Player is not the current dealer', { playerId, sessionId : session.id });

        return isDealer;
    };
}
