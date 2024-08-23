import { Body, Inject, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { DealerPickBlackCardDTO } from './dtos/dealer-pick-black-card.dto';
import { GameSessionService } from '../game-session/game-session.service';
import { PlayerSelectCardDTO } from './dtos/player-select-card.dto';
import { DealerPickWinnerDTO } from './dtos/dealer-pick-winner.dto';
import { GameSession } from '../game-session/game-session.entity';
import { ScoreLogService } from '../score-log/score-log.service';
import { WebSockException } from '../framework/WebSockException';
import { ZodValidationPipe } from '../pipes/ZodValidation.pipe';
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
import { GameStateDTO } from './dtos/game-state.dto';
import { StartGameDTO } from './dtos/start-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilService } from '../util/util.service';
import { CardService } from '../card/card.service';
import { NextHandDTO } from './dtos/next-hand.dto';
import { JoinGameDTO } from './dtos/join-game.dto';
import { ExitGameDTO } from './dtos/exit-game.dto';
import { Player } from '../player/player.entity';
import { PlayerDTO } from './dtos/player.dto';
import { DisconnectPlayer } from '../type';
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

        private readonly gameSessionService: GameSessionService,
        private readonly feedbackService: FeedbackService,
        private readonly scoreLogService: ScoreLogService,
        private readonly playerService: PlayerService,
        private readonly utilService: UtilService,
        private readonly cardService: CardService,
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

    /**
     * Connects a player via socket, handles reconnection if the auth token is valid,
     * or creates a new player if no valid auth token is found.
     *
     * @param socket - The player's socket instance
     *
     * @returns The connected player entity
     */
    public connectPlayer = async (socket: Socket) => {
        this.log.silly('GameService::connectPlayer', { socketId : socket.id });

        const authToken = socket.handshake.auth.authToken as string;

        if (authToken) {
            this.log.info('Auth token found in socket', { authToken, socketId : socket.id });

            const existingPlayer = await this.tryRejoinExistingPlayer(socket, authToken);

            if (existingPlayer) {
                this.log.info('Player reconnected to private socket room', { playerId : existingPlayer.id });

                return existingPlayer;
            }

        } else {
            this.log.info('No auth token found in socket', { socketId : socket.id });
        }

        const newPlayer = await this.createNewPlayer(socket);

        this.log.info('Player joined private socket room', { playerId : newPlayer.id });

        return newPlayer;
    };

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
    private tryRejoinExistingPlayer = async (
        socket: Socket, authToken: string,
    ): P<Player | null> => {
        this.log.silly('GameService::tryRejoinExistingPlayer', {
            socketId : socket.id,
            authToken,
        });

        const existingPlayer = await this.playerService.getPlayerByAuthToken(authToken);

        if (existingPlayer) {
            this.log.info('Existing player found', existingPlayer);

            const updatedPlayer = await this.playerService.updatePlayerSocketId(existingPlayer, socket);
            socket.join(existingPlayer.id!);

            return updatedPlayer;
        }

        this.log.info('No player found with auth token', authToken);

        socket.emit('destroyAuthToken');

        return null;
    };

    /**
     * Creates a new player, associates the socket, and joins the player to a private room.
     *
     * @param socket - The player's socket instance
     *
     * @returns The newly created player entity
     */
    private createNewPlayer = async (socket: Socket) => {

        const newPlayer = await this.playerService.createPlayer(socket);

        this.log.info('New player created', newPlayer);

        socket.join(newPlayer.id!);

        return newPlayer;
    };

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
    @UsePipes(new ValidationPipe({ transform : true }))
    public async exitGame(
        @Body(new ZodValidationPipe(ExitGameDTO.Schema))
        exitGame: ExitGameDTO,
    ): P<GameStateDTO> {
        this.log.silly('GameService::exitGame', exitGame);

        // Fetch player state based on auth token
        const playerState = await this.getPlayerStateByAuthTokenOrFail(exitGame.auth_token!);

        // Remove the player from the session
        await this.removePlayerFromSession(playerState);

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
    ): P<Game> => {

        this.log.silly('GameService::findGameByGameSession', gameSession);

        return this.gameRepo.findOneByOrFail({
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
            currentPlayer,
            scoreLog,
            session,
            players,
            game,
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
                currentPlayer,
                scoreLog : null,
                session  : null,
                players  : null,
                game     : null,
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
    @UsePipes(new ValidationPipe({ transform : true }))
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
            submitFeedback,
            currentPlayer,
            session,
            game,
        );
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
    @UsePipes(new ValidationPipe({ transform : true }))
    public async nextHand(
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
            newDealerCards, newWhiteCards, newGameStage,
            newDealerId, newScoreLog, session,
        );

        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code!, currentPlayer.id!);
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
        session: GameSession,
        game: Game,
        players: Player[],
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
    @UsePipes(new ValidationPipe({ transform : true }))
    public async dealerPickBlackCard(
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

        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code!, currentPlayer.id!);
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
@UsePipes(new ValidationPipe({ transform : true }))
public async dealerPickWinner(
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
    const gameState = await this.getGameStateAsPlayer(game.game_code!, dealer.id!);
    this.log.silly('GameService::dealerPickWinner - End', gameState);

    return gameState;
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
    @UsePipes(new ValidationPipe({ transform : true }))

    public async startGame(
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

        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code!, currentPlayer.id!);
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
    @UsePipes(new ValidationPipe({ transform : true }))
    public async updateUsername(

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

        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code!, currentPlayer.id!);
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
    @UsePipes(new ValidationPipe({ transform : true }))
    public async playerSelectCard(
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


        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code!, currentPlayer.id!);
    }


    /**
     * Handles the creation of a new game.
     * This method initializes the game, sets up the game session, and returns the game state for the current player.
     *
     * @param createGame - DTO containing the player's authentication token
     *
     * @returns The game state for the current player after creating the game
     */
    @UsePipes(new ValidationPipe({ transform : true }))
    public async createGame(
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
        return this.getGameStateAsPlayer(game.game_code!, currentPlayer.id!);
    }

    @UsePipes(new ValidationPipe({ transform : true }))
    public async joinGame(
        @Body(new ZodValidationPipe(JoinGameDTO.Schema))
        joinGame: JoinGameDTO,
    ): P<GameStateDTO> {
        try {
            this.log.silly('GameService::joinGame', { joinGame });

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

            return this.getGameStateAsPlayer(
                game.game_code!, currentPlayer.id, true);

        } catch (exc) {
            if (exc instanceof WebSockException)
                return {
                    ...GameStateDTO.Default,
                    error_message : exc.message,
                }
            else if (exc instanceof Error)
                return {
                    ...GameStateDTO.Default,
                    error_message : exc.message,
                }
            else
                return {
                    ...GameStateDTO.Default,
                    error_message : 'An unknown error occurred: ' + JSON.stringify(exc),
                }
        }
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
        gameCode: string,
        playerId: string,
        includeDeck: boolean = false,
    ): P<GameStateDTO> => {
        try {
            // Log the beginning of the game state retrieval process
            this.log.silly('GameService::getGameStateAsPlayer - Start', { gameCode, playerId, includeDeck });

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
