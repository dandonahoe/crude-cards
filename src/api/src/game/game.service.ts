import { GameNotEnoughPlayersException } from '../exceptions/GameNotEnoughPlayers.exception';
import { Body, Inject, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { GameCompleteException } from '../exceptions/GameComplete.exception';
import { DealerPickBlackCardDTO } from './dtos/dealer-pick-black-card.dto';
import { GameSessionService } from '../game-session/game-session.service';
import { WebSocketEventType } from '../constant/websocket-event.enum';
import { PlayerSelectCardDTO } from './dtos/player-select-card.dto';
import { DealerPickWinnerDTO } from './dtos/dealer-pick-winner.dto';
import { GameSession } from '../game-session/game-session.entity';
import { ScoreLogService } from '../score-log/score-log.service';
import { ZodValidationPipe } from '../pipes/ZodValidation.pipe';
import { FeedbackService } from '../feedback/feedback.service';
import { UpdateUsernameDTO } from './dtos/update-username.dto';
import { SubmitFeedbackDTO } from './dtos/submit-feedback.dto';
import { AuthToken, GameDeck, GameExitReason } from '../type';
import { PlayerType } from '../constant/player-type.enum';
import { PlayerService } from '../player/player.service';
import { ScoreLog } from '../score-log/score-log.entity';
import { GameStage } from '../constant/game-stage.enum';
import { CardColor } from '../constant/card-color.enum';
import { type P } from '../../../type/framework/data/P';
import { WSE } from '../exceptions/WebSocket.exception';
import { Feedback } from '../feedback/feedback.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateGameDTO } from './dtos/create-game.dto';
import { GameStateDTO } from './dtos/game-state.dto';
import { StartGameDTO } from './dtos/start-game.dto';
import { LeaveGameDTO } from './dtos/leave-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SockService } from '../sock/sock.service';
import { CardService } from '../card/card.service';
import { NextHandDTO } from './dtos/next-hand.dto';
import { JoinGameDTO } from './dtos/join-game.dto';
import { UtilService } from '../util/util.service';
import { Player } from '../player/player.entity';
import { PlayerDTO } from './dtos/player.dto';
import { Socket, Server } from 'socket.io';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { difference } from 'lodash';
import { Logger } from 'winston';
import { OpenAIService } from '../openai/openai.service';


@Injectable()
export class GameService {

    private myFunTestSocketIoServerRenameMe: Server;

    public constructor(
        @InjectRepository(Game)
        private readonly gameRepo: Repository<Game>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        private readonly gameSessionService: GameSessionService,
        private readonly feedbackService: FeedbackService,
        private readonly scoreLogService: ScoreLogService,
        private readonly playerService: PlayerService,
        private readonly openAIService: OpenAIService,
        private readonly sockService: SockService,
        private readonly cardService: CardService,
        private readonly utilService: UtilService,
    ) {
        this.log.silly('GameService::constructor()');
    }

    public getServerTest123 = async (): P<Server> => {
        return this.myFunTestSocketIoServerRenameMe;
    }

    /**
     * Connects a player via socket, handles reconnection if the auth token is valid,
     * or creates a new player if no valid auth token is found.
     *
     * @param socket - The player's socket instance
     *
     * @returns The connected player entity
     */
    public connectPlayer = async (
        server: Server, socket: Socket,
    ): P<unknown> => {
        this.myFunTestSocketIoServerRenameMe = server;

        const socketId = socket.id;

        this.log.silly('GameService::connectPlayer', { socketId });

        // just obtain formatted info about the request
        const socketRequest = await this.sockService.getRequestInfoFromSocket(socket);

        this.log.debug('Socket Request', { socketRequest });
        this.log.silly('Looking up player info by auth token', { authToken : socketRequest.authToken });

        const playerState = await this.getPlayerStateByAuthToken(socketRequest.authToken);

        let player: Player | null = null;

        //If no player was found (bad token, outdated, etc.), create a new player
        if (!playerState.currentPlayer) {
            this.log.debug('No player found for socket, creating new player.', { socketRequest });

            player = await this.playerService.createPlayer(socketRequest.socketId);

            this.log.debug('New player created, grabbing new state', { player });

            // grab the current state of the player now that they have been created
            const { currentPlayer } = await this.getPlayerStateByAuthToken(player.auth_token);

            if (!currentPlayer)
                throw WSE.InternalServerError500(`Player not found after creation, socket(${socketId})`);

            this.log.debug('Emitting new player auth token', { player });

            // let the server talk to the plaayer by their id. Always active,
            // but when they join a game it will create another channel in parellel to
            // communicate with this player in the context of their game as [game_id]_[player_id]
            await socket.join(currentPlayer.id);

            // and push the new token down as the first message received
            const result = await this.emitPlayerAuthToken(server, currentPlayer);

            console.log('Broadcasting new player auth token', { result });

            return;
        }

        // at this point, we have found an existing player
        // let the server talk to the plaayer by their id. Always active,
        this.log.debug('Joining the player to their socket by their playerId', {
            playerId : playerState.currentPlayer.id,
        });

        // but when they join a game it will create another channel in parellel to
        // communicate with this player in the context of their game as [game_id]_[player_id]
        await socket.join(playerState.currentPlayer.id);

        this.log.debug('Player socket connected, sending AuthToken', { player });

        // Existing player needs a new token, they're wiped on connection
        // to the server and this pushes a new one to be stored and supplied
        // in followup calls. Should probably migrate to JWT for this.
        // await this.emitPlayerAuthToken(server, playerState.currentPlayer!)
        // Testing keeping the exiting auth token

        if (!playerState.game) {
            this.log.debug('No game found for player, skipping join', { playerState });

            return;
        }

        // check auth token
        return this.joinGame(
            server, socket,
            new JoinGameDTO(
                playerState.currentPlayer.auth_token!,
                playerState.game!.game_code),
            'Joining Existing Game via Reconnect Routine');
    };


    /**
     * Return a Player given an socket conection
     *
     * @param socket - The player's socket instance
     *
     * @returns Player if they exist or null if there's no existing player tied to this socket
     */
    public findPlayerBySocket = async (socket: Socket): P<Player> =>
        this.playerService.findPlayerBySocket(socket);

    /**
    * Disconnects a player from the game session and handles socket clean-up.
    *
    * @param socket - The player's socket instance
    *
    * @returns The disconnected player and the associated game session details (if any)
    */
    public disconnectPlayer = async (
        socket: Socket,
    ): P<unknown> => {
        this.log.debug('TODO: ENABLE DISCONNECT ROUTINE.', { socketId : socket.id });

        return;
    }

    public getSocketServer = async (): P<Server> => {
        return this.myFunTestSocketIoServerRenameMe;
    }

    /**
     * Emits the player's authentication token to the player's socket. Good place to bunch edge cases
     * and to do things to reorganize the game to make it work. Sometimes, it will encounter
     * unfixable situations, like everyone leaving, and automatically shut down the game
     *
     * @param server - The socket server instance
     * @param player - The player entity
     *
     * @returns The player entity
     */
    private ensureValidSessionState = async (
        existingSession: GameSession | null | undefined,
        runtimeContext: string,
    ): P<GameSession> => {

        if (!existingSession) {
            this.log.error('GameService::ensureValidSessionState - Bogus Session', { runtimeContext });

            throw WSE.BadRequest400('Bogus Session', { runtimeContext });
        }

        const debugBundle = { existingSession, runtimeContext };

        this.log.silly('GameService::ensureValidSessionState', { debugBundle });

        let session = existingSession;

        const playerCount = existingSession.player_id_list.length;

        // If there arent enough players for the game to continue, end the game
        // TODO: Drop them into limbo until a quarum is reached and give the
        // new dealer the option to restart the game. Allows other players to
        // reconnect. Could happen if internets go out and everyone bounces
        // for instance. Does not apply in lobby mode since theres too few players
        // initially on create

        if (session.game_stage === GameStage.Lobby && playerCount === 0) {
            this.log.info('Game Ended In Lobby Mode Due to No Players', { debugBundle });

            throw new GameCompleteException(
                'No players in lobby, ending game', runtimeContext,
                debugBundle, this.log);
        }

        // If the game is in progress and the players drop to
        // zero with nobody waiting in limbo, end the game
        if (session.game_stage !== GameStage.Lobby
            && playerCount === 0
            && session.limbo_player_id_list.length === 0) {
            this.log.info('Not enough players to continue, sending remaining players to limbo',
                debugBundle,
            );
            throw new GameCompleteException(
                'No players in lobby, ending game',
                `Validating Session Context(${runtimeContext})`,
                debugBundle, this.log);
        }

        // if the game is in progress and the number of players drops
        // below the minimum required to continue, but is greater than zero
        // (previous case), send the remaining players to limbo. This will
        // let them get others to rejoin.

        if (session.game_stage !== GameStage.Lobby
            && playerCount === 0
            && session.limbo_player_id_list.length < 3) {
            this.log.info('Not enough players to continue, pausing game', debugBundle);

            // todo: routine to put people into limbo, verify thats the way to
            // do it first

            throw new GameNotEnoughPlayersException(
                'No players in the game, self destructing.',
                `Validating Session Context(${runtimeContext})`,
                debugBundle, this.log);
        }

        // if there's no host... or the host on the game session is no longer in the
        // player_id_list, they're gone, so replace them
        // either no host (weird) or the host is not in the active player list
        if (session.game_stage === GameStage.Lobby
            && (!session.lobby_host_id || !session.player_id_list.includes(session.lobby_host_id!))) {


            this.log.error('The game host is missing or is not an active player', { debugBundle, session });

            // Make a random other player the host in the lobby. They will
            // also be selected as the first dealer when the game starts
            session = await this.gameSessionService.promoteRandomPlayerToHost(
                session, `Validating Session State: Game Host Missing, context(${runtimeContext})`);
        }

        // this is mostly to treat it non null easier below
        if (!session.lobby_host_id) {
            const errorMessage = 'Game Host Missing Again, Check Logs for Edge Case';

            this.log.error(errorMessage, { session, debugBundle });

            // unfixable situation, error
            throw WSE.InternalServerError500(errorMessage, { session, debugBundle });
        }

        // If theIf there's no dealer, promote a player and tell
        // everyone they're a loser this hand

        // in other cases, the dealer could leave midgame. In that
        // case, the current hand is scrubbed and moves to the next
        // round, which promotes a new player to dealer.
        if (session.game_stage !== GameStage.Lobby
            && (session.dealer_id === null || !session.player_id_list.includes(session.dealer_id))) {

            this.log.warn('Dealer is invalid or no longer an active player, promote someone', debugBundle);

            // Promote the first player in the list to the dealer
            session = await this.gameSessionService.promoteRandomPlayerToDealer(
                session, `Validating Session State: Dealer Missing, context(${runtimeContext})`);
        }

        return session;
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
    public async leaveGame(
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(LeaveGameDTO.Schema))
        exitGame: LeaveGameDTO,
        runtimeContext = '',
    ): P<unknown> {
        this.myFunTestSocketIoServerRenameMe = server;

        this.log.silly('GameService::exitGame', {
            exitGame, runtimeContext, socketId : socket.id,
        });

        // Fetch player state based on auth token
        const playerState = await this.getPlayerStateByAuthTokenOrFail(exitGame.auth_token!);

        const { currentPlayer: player, game } = playerState;

        // Remove the player from the session
        const session = await this.gameSessionService.removePlayerFromSession(
            player,
            playerState.session,
            // added to the exited_player_id_list, removed from the player_id_list
            // and extra check to ensure not in limbo
            GameExitReason.LeftByChoice,
            'ExitGame Service Routine');

        this.log.silly('GameService::exitGame - Player removed from session', {
            game_code : game.game_code, session,
        });

        // TODO: HERE IS A CHOKE POINT
        // good place because reconfiguring the game here
        // will let the full lookup done by emitGameUpdate
        // to pull the changes. Can do dicy things here, and this
        // should be called in similar situations and frequently.
        // but should only do things whent he state has gone bogus

        if (!session) {

            this.log.warning('GameService::exitGame - Session is Bogus, Cannot Leave Session it Cant Find', {
                game_code : game.game_code, player, runtimeContext,
            });

            return;
        }


        // to check if the state is valid and reconfigure
        // First check, if the host is leaving, promote someone.
        // If the host is leaving and nobody is around, end the game.
        this.ensureValidSessionState(session, `Leaving Game, Context (${runtimeContext})`);

        // not run routine to patch up games which may be valid or not
        // THen broadcast whatever the final state is
        return this.emitGameUpdate(
            server,
            game.game_code, // to any players remaining
            false, // dont include the deck
            [player.id], // only send reset state actions to players leaving now,
            // and not include everyone in the exited_player_id_list since they could
            // have joined another game, but still have the same id.
            // TODO: Possibly think about combining game_id_player_id to be the channel
            // to directly communicate with a user. One connection per game, and only
            // one game is allowed per person, so one still.
            runtimeContext); // send disconnect success message to client
    }

    /**
     * Handles the process of updating a player's username.
     *
     * @param updateUsername - The DTO containing the new username and the player's auth token
     *
     * @returns The updated player entity
     */
    public findGameByGameSession = async (
        gameSession: GameSession,
    ): P<Game | null> => {

        this.log.silly('GameService::findGameByGameSession', { gameSession });

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
        authToken: AuthToken,
    ): P<{
        currentPlayer: Player,
        scoreLog: ScoreLog | null,
        session: GameSession,
        players: Player[],
        game: Game,
    }> => {
        this.log.silly('GameService::getPlayerStateByAuthTokenOrFail', { authToken });

        const { currentPlayer, game, session } = await this.getPlayerStateByAuthToken(authToken);

        const debugInfo = { authToken };

        if (!currentPlayer) throw WSE.InternalServerError500('Invalid Auth Token, No Player', debugInfo);
        if (!session) throw WSE.InternalServerError500(`Invalid Auth Token ${authToken}, No Session`, debugInfo);
        if (!game) throw WSE.InternalServerError500('Invalid Auth Token, No Game', debugInfo);

        const [scoreLog, players] = await Promise.all([
            this.scoreLogService.findScoreLogBySession(session),
            this.playerService.findActivePlayersInSession(session),
        ]);

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
        authToken: AuthToken,
    ): P<{
        currentPlayer: Player | null,
        scoreLog: ScoreLog | null,
        session: GameSession | null,
        players: Player[] | null,
        game: Game | null,
    }> {
        this.log.silly('GameService::getPlayerStateByAuthToken', { authToken });

        if (!authToken)
            return {
                currentPlayer : null, scoreLog : null, session : null, players : null, game : null,
            };

        const currentPlayer = await this.playerService.getPlayerByAuthToken(authToken);

        if (!currentPlayer)
            return {
                currentPlayer : null, scoreLog : null, session : null, players : null, game : null,
            };

        let session = await this.gameSessionService.findActivePlayerGameSession(currentPlayer);

        if (!session)
            return {
                scoreLog : null, session : null, players : null, game : null,
                currentPlayer,
            };

        session = await this.ensureValidSessionState(session, 'Getting Player Auth State');

        const [
            scoreLog, players, game,
        ] = await Promise.all([
            this.scoreLogService.findScoreLogBySession(session),
            this.playerService.findActivePlayersInSession(session),
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
        this.log.silly('GameService::submitFeedback', { submitFeedback });

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
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(NextHandDTO.Schema))
        nextHand: NextHandDTO,
    ): P<GameStateDTO> {

        this.myFunTestSocketIoServerRenameMe = server;

        this.log.silly('GameService::nextHand', { nextHand, socketId : socket.id });

        // Retrieve the player, game, session, and player list using the provided auth token
        const {
            currentPlayer, game, session, players,
        } = await this.getPlayerStateByAuthTokenOrFail(nextHand.auth_token!);

        await this.ensureValidSessionState(session, 'Determining Next Hand');

        // Determine the next stage of the game based on round count and player scores
        const newGameStage = await this.determineNextGameStage(session, game, players);

        // Select the next dealer for the upcoming round
        const newDealerId = await this.selectNextDealerId(session);

        // Deal new cards to the dealer and players (parallelized where possible)
        const [newDealerCards, newWhiteCards] = await this.dealCardsToPlayers(session);

        // something here is stuffinf the session.used_white_cards with all the white card

        // Create or update the score log for the session
        const newScoreLog = await this.scoreLogService.relateToSession(session);


        this.log.silly('GameService::nextHand', {
            newGameStage, newDealerId, newDealerCards, newWhiteCards, newScoreLog,
        });

        // Progress to the next hand in the game session
        await this.gameSessionService.nextHand(
            newDealerCards, newWhiteCards,
            newGameStage, newDealerId,
            newScoreLog, session);

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
        session: GameSession,
        game: Game,
        players: Player[],
    ): P<GameStage> => {
        this.log.silly('GameService::determineNextGameStage', { session, game });

        // Calculate the current round count for the session
        const gameRoundCountPromise = this.getCountGameRounds(session);

        // Check if any player has reached or exceeded the maximum points
        const winningPlayerMaxPointsPromise = this.getPlayerOverMaxPoints(
            players, game.max_point_count);

        // Await both promises concurrently
        const [gameRoundCount, winningPlayerMaxPoints] = await Promise.all([
            gameRoundCountPromise, winningPlayerMaxPointsPromise,
        ]);

        this.log.silly('determineNextGameStage', { gameRoundCount, winningPlayerMaxPoints });

        // If a winning player is found, mark the game as complete and award the winner
        if (winningPlayerMaxPoints) {
            this.log.info('Game Complete due to winning player', { winningPlayerMaxPoints });

            await this.gameSessionService.awardWinnerAndComplete(
                session, winningPlayerMaxPoints.id!,
                `Determining Next Game Stage session(${session.id})game(${game.id}) winner(${winningPlayerMaxPoints.id})`);

            return GameStage.GameComplete;
        }

        // If the round count has reached or exceeded the maximum, the game is complete. Pick a random winner
        // if there's a tie
        // TODO: Support multiple winners or ties
        if (gameRoundCount >= game.max_round_count) {
            this.log.info('determineNextGameStage - Game Complete due to max rounds reached', { gameRoundCount });

            const playersWithHighestScore = await this.playerService.getPlayersInFirstPlace(session);

            this.log.info('Players with highest score', { playersWithHighestScore });

            if (playersWithHighestScore.length === 0)
                throw WSE.InternalServerError500('Everyone is a loser. No winners found. Impossible.');

            const winningPlayer = playersWithHighestScore[0];

            // winningPlayer =
            await this.gameSessionService.awardWinnerAndComplete(
                session, winningPlayer.id!,
                `Determining Next Game Stage session(${session.id}) game(${game.id}) winner(${winningPlayer.id})`);

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
        this.log.silly('GameService::dealCardsToPlayers - Start', { session });

        // Determine the remaining cards that haven't been used yet
        const remainingBlackCardIds = difference(session.black_cards, session.used_black_cards);
        const remainingWhiteCardIds = difference(session.white_cards, session.used_white_cards);

        this.log.debug('Remaining Black Card IDs:', { remainingBlackCardIds });
        this.log.debug('Remaining White Card IDs:', { remainingWhiteCardIds });

        // Assign 10 new black cards to the dealer
        const newDealerCardIds = remainingBlackCardIds.slice(0, 10);
        this.log.debug('New Dealer Card IDs:', { newDealerCardIds });

        const newWhiteCardIds: string[] = [];

        for (let index = 0; index < session.player_id_list.length; index++) {
            const playerId = session.player_id_list[index];

            // Skip the dealer when assigning white cards
            if (this.isPlayerDealer(playerId, session)) {
                this.log.debug(`Skipping dealer player`, { playerId });
                continue;
            }

            const newWhiteCardId = remainingWhiteCardIds[index];
            this.log.debug(`Assigning White Card ID: ${newWhiteCardId} to player`, { playerId });

            try {
                await this.playerService.addWhiteCardToPlayer(playerId, newWhiteCardId);

                const playerBefore = await this.playerService.getPlayerById(playerId);
                console.log('Player Before', playerBefore.card_id_list);

                // Take out the cards just played
                await this.playerService.removeAnyMatchinWhiteCards(playerId, session.selected_card_id_list);

                const playerAfter = await this.playerService.getPlayerById(playerId);
                console.log('Player After', playerAfter.card_id_list);

                this.log.debug(`Successfully assigned White Card ID: ${newWhiteCardId} to Player ID: ${playerId}`);
                newWhiteCardIds.push(newWhiteCardId);
            } catch (error) {
                this.log.error(`Error assigning White Card ID: ${newWhiteCardId} to Player ID: ${playerId}`, error);
                throw error;
            }
        }

        this.log.debug('New White Card IDs:', { newWhiteCardIds });
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
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(DealerPickBlackCardDTO.Schema))
        dealerPickBlackCard: DealerPickBlackCardDTO,
    ): P<unknown> {

        this.myFunTestSocketIoServerRenameMe = server;

        this.log.silly('GameService::dealerPickBlackCard', {
            authToken : dealerPickBlackCard.auth_token,
            socketId  : socket.id,
        });

        // Retrieve the player, game, and session details using the provided auth token
        const playerState = await this.getPlayerStateByAuthTokenOrFail(dealerPickBlackCard.auth_token!);

        this.log.silly('GameService::dealerPickBlackCard - Player State', {
            playerState,
            dealerPickBlackCard,
        });

        await this.updateSessionWithDealerPick(
            playerState.session,
            dealerPickBlackCard.card_id!);

        const game = await this.gameRepo.findOneByOrFail({
            id : playerState.session.game_id!,
        });

        return this.emitGameUpdate(server, game.game_code);
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
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(DealerPickWinnerDTO.Schema))
        dealerPickWinner: DealerPickWinnerDTO,
    ): P<unknown> {

        const debugBundle: Record<string, unknown> = {
            dealerPickWinner, socketId : socket.id,
        };

        this.myFunTestSocketIoServerRenameMe = server;

        this.log.silly('GameService::dealerPickWinner - Start', { debugBundle });

        this.log.debug('Ensured proper game state');

        if (!dealerPickWinner.card_id)
            throw WSE.BadRequest400('Invalid Card ID', debugBundle);

        // Retrieve the player (dealer), game, session, and score log using the provided auth token
        const {
            dealer, players, game, session, scoreLog,
        } = await this.getDealerAndSessionData(dealerPickWinner.auth_token!);

        debugBundle.scoreLogId = scoreLog.id;
        debugBundle.sessionId = session.id;
        debugBundle.dealerId = dealer.id;
        debugBundle.gameId = game.id;

        // Does this explode??
        this.log.debug('Retrieved dealer and session data', { debugBundle });

        debugger;

        // Determine the winning player based on the selected card ID
        const winningPlayer = await this.getWinningPlayer(players, dealerPickWinner.card_id!);

        const winningPlayerId = winningPlayer.id;

        this.log.debug('Determined winning player', { winningPlayerId, debugBundle });

        // Update the score log and player's score in parallel
        this.log.debug('Updated score and player', {
            debugBundle, cardId : dealerPickWinner.card_id, winningPlayerId,
        });

        await this.updateScoreAndPlayer(
            scoreLog, session, dealer,
            dealerPickWinner.card_id,
            winningPlayer);

        // Check if the game is complete and progress to the next stage accordingly
        await this.progressGameOrShowHandResults(game, session, winningPlayer);

        this.log.debug('Progressed game or showed hand results', { debugBundle, winningPlayerId });

        // Return the updated game state for the dealer
        const gameState = await this.getGameStateAsPlayer(game.game_code, dealer.id!);

        this.log.silly('GameService::dealerPickWinner - End', {
            gameState, debugBundle, winningPlayerId,
        });

        return this.emitGameUpdate(server, gameState.game_code);
    }

    /**
     * Sends a new auth token to the client
     *
     * @param player - The player entity
     * @param server - The socket.io server instance
     *
     * @returns
     */
    private emitPlayerAuthToken = async (server: Server, player: Player) =>
        server
            .to(player.id!)
            .emit(
                WebSocketEventType.UpdatePlayerValidation,
                player.auth_token,
            );

    /**
     * Emits a game update to all players in the game session.
     *
     * @param socket - The player's socket instance
     * @param gameCode - The game code for the session
     * @param includeDeck - Whether to include the deck in the game state
     * @param disconnectPlayerIds - The IDs of players who have disconnected
     * @param runtimeContext - The context for the game update
     *
     * @returns An array of promises for emitting the game update to each player
     */
    public emitGameUpdate = async (
        server: Server,
        gameCode: string | null,
        includeDeck: boolean = false,
        disconnectPlayerIds: string[] = [],
        runtimeContext: string = '',
    ) => {
        this.myFunTestSocketIoServerRenameMe = server;

        const debugBundle = { gameCode, includeDeck, disconnectPlayerIds, runtimeContext };

        this.log.silly('GameService::emitGameUpdate', debugBundle);

        if (!gameCode)
            throw WSE.InternalServerError500(`Invalid game code ${gameCode} runtimeContext(${runtimeContext})`);

        // todo: update this to handle people in the disconnected and limbo states
        const gameStatusList = await this.getAllPlayersGameStatus(gameCode, includeDeck,
            `Emitting Game Update to gameCode(${gameCode}) \n\nruntimeContext(${runtimeContext})`);

        this.log.silly('GameService::emitGameUpdate - Disconnecting Players', { gameStatusList });

        const game = await this.gameRepo.findOneByOrFail({ game_code : gameCode });

        // Players who have left just now, tell them to reset their state to default
        // which will land them on the homepage.
        await Promise.all(disconnectPlayerIds.map(playerId =>
            server
                .to(`${game.id}_${playerId}`)
                .emit(
                    WebSocketEventType.UpdateGame,
                    GameStateDTO.Default)));

        // todo: probably check return values here instead of just spray and pray
        // todo: consider passing context to client to maintain continuity between logs
        // Also this is each player has two channels, one to their exact player.id and and
        // another to the game their in via [game.id]_[player.id]. Testing to see if we can
        // narrow it to one channel per player or if thats even needed
        return Promise.all(
            gameStatusList.map(gameStatus =>
                server
                    .to(`${game.id}_${gameStatus.current_player_id}`) // old way: gameStatus.current_player_id!)
                    .emit(
                        WebSocketEventType.UpdateGame,
                        gameStatus))); /// pew pew pew
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
            throw WSE.InternalServerError500(`No score log found for session ${session.id} and game ${game.id}`);

        return {
            dealer, players, game, session, scoreLog,
        };
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
        debugger;

        if (winningPlayerResults.length !== 1)
            throw WSE.InternalServerError500('Invalid card ID or multiple players found with the same card', {
                players, selectedCardId,
            });

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
    ) => {
        await this.scoreLogService.updateScore(
            scoreLog, session, winningPlayer, selectedCardId, dealer);

        return this.playerService.incrementPlayerScore(winningPlayer)
    };

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
            return this.gameSessionService.awardWinnerAndComplete(
                session, winningPlayer.id!, 'Progressing Hand or Showing Results');
        else
            return this.gameSessionService.showHandResults(session);
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
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(StartGameDTO.Schema))
        startGame: StartGameDTO,
    ): P<unknown> {
        this.myFunTestSocketIoServerRenameMe = server;

        this.log.silly('GameService::startGame');

        console.log('startGame', { startGame, socketId : socket.id });

        const {
            currentPlayer, game, session,
        } = await this.getPlayerStateByAuthTokenOrFail(startGame.auth_token!);

        // Ensure that the current player is the host
        await this.ensurePlayerIsHost(currentPlayer, game);

        // Retrieve the game state and relevant data
        const gameStateGeneric = await this.getGameStateGeneric(game.game_code!, true);

        // Calculate card counts needed for the game. The max number of cards that
        // could be used in a game with the game rules setß
        const {
            whiteCardTotalCount, blackCardTotalCount,
        } = await this.calculateCardCounts(gameStateGeneric);

        // Retrieve the deck of white and black cards for the game
        const gameDeck = await this.fetchCardDeck(whiteCardTotalCount, blackCardTotalCount);

        // Assign cards to players and prepare the session
        await this.assignCardsToPlayers(gameStateGeneric.player_list, gameDeck);

        // Set up the game session with the retrieved cards
        await this.setupGameSession(session, currentPlayer, gameDeck);

        return this.emitGameUpdate(server, game.game_code, true, [], 'Starting Game - Dealing Cards');
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
            throw WSE.InternalServerError500(`Player ${currentPlayer.id} is not the host. Host is ${game.host_player_id}.`);
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

        const whiteCardTotalCount = (playerCount * 7) + (maxRoundCount * (playerCount - 1)); // minus dealer
        const blackCardTotalCount = maxRoundCount * 7; // Each round a dealer gets 10 fresh cards

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
    private fetchCardDeck = async (
        whiteCardTotalCount: number,
        blackCardTotalCount: number,
    ): P<GameDeck> => {

        const [whiteCards, blackCards] = await Promise.all([
            this.cardService.selectRandomCards(CardColor.White, whiteCardTotalCount),
            this.cardService.selectRandomCards(CardColor.Black, blackCardTotalCount),
        ]);

        return {
            whiteCards, blackCards,
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
        playerList: PlayerDTO[], gameDeck: GameDeck,
    ) => {
        const usedWhiteCardIds: string[] = [];

        const updatePromises = playerList.map((player, index) => {

            const playerWhiteCardIds = gameDeck.whiteCards.slice(
                index * 7,
                (index + 1) * 7,
            ).map(card => card.id);

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
        gameDeck: GameDeck,
    ) => {

        const allWhiteCardIds = gameDeck.whiteCards.map(card => card.id);
        const allBlackCardIds = gameDeck.blackCards.map(card => card.id);

        const dealerCardIdList = allBlackCardIds.slice(0, 10);
        const currentScoreLog = await this.scoreLogService.createNewScoreLog(session);

        //  session          : GameSession,
        // currentPlayer    : Player,
        // currentScoreLog  : ScoreLog,
        // dealerCardIdList : string[],

        // usedWhiteCardIds : string[],
        // allBlackCardIds  : string[],
        // allWhiteCardIds  : string[],
        await this.gameSessionService.setupNewGameSession(
            session,
            currentPlayer,
            currentScoreLog,
            dealerCardIdList,
            [],
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
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(UpdateUsernameDTO.Schema))
        updateUsername: UpdateUsernameDTO,
    ): P<GameStateDTO> {

        this.myFunTestSocketIoServerRenameMe = server;

        // Log the beginning of the username update process
        this.log.silly('GameService::updateUsername', {
            updateUsername, socketId : socket.id,
        });

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
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(PlayerSelectCardDTO.Schema))
        playerSelectCard: PlayerSelectCardDTO,

    ): P<GameStateDTO> {

        this.myFunTestSocketIoServerRenameMe = server;

        this.log.silly('GameService::playerSelectCard', {
            authToken : playerSelectCard.auth_token, socketId : socket.id,
        });

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
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(CreateGameDTO.Schema))
        createGame: CreateGameDTO,
    ): P<void> {

        this.myFunTestSocketIoServerRenameMe = server;

        debugger;

        const whiteCard = (await this.cardService.selectRandomCards(CardColor.White, 1))[0];
        const blackCard = (await this.cardService.selectRandomCards(CardColor.Black, 1))[0];

        const completionPrompt = `These are the winning white and black cards in this hand of Cards Against Humanity.
Write an amusing sentence using the result.
Black Card: ${blackCard.text}
White Card: ${whiteCard.text}`;

        debugger;

        const completionResult = await this.openAIService.completeText(completionPrompt);

        console.log('completionResult', completionResult);

        // const completion = await this.openAIService.
        return;
        // debugger;

        // console.log('completion', completion);

        // debugger;

        // // Log the beginning of the game creation process
        // this.log.silly('GameService::createGame', { createGame });

        // // Retrieve the current player based on the provided auth token
        // const { currentPlayer } = await this.getPlayerStateByAuthToken(createGame.auth_token!);

        // if(!currentPlayer)
        //     throw WSE.InternalServerError500(`CreateGame::Invalid Player (${createGame.auth_token})`);

        // this.log.debug('GameService::createGame - Current Player', { currentPlayer });
        // this.log.silly('Leaving any existing games', { currentPlayer })
        // // Ensure the player leaves any open sessions before starting a new game
        // await this.gameSessionService.exitActiveGameSession(
        //     currentPlayer,
        //     GameExitReason.CreatedNewGame,
        //     'Creating a new game and logging out of existing sessions');

        // // Generate a new game entity and persist it in the repository
        // const game = await this.gameRepo.save({
        //     current_session_id : null, // No session initially, as it will be created later
        //     max_point_count    : 3,
        //     max_round_count    : 7,
        //     host_player_id     : currentPlayer.id,
        //     created_by         : currentPlayer.id,
        //     game_code          : await this.utilService.generateGameCode(4), // Generate a 4-character game code
        // });

        // this.log.info('Joining Game Specific Channel During Game Creation')
        // socket.join(`${game.id}_${currentPlayer.id}`);

        // // Initialize a new game session with the current player as the host
        // const session = await this.gameSessionService.initSession(currentPlayer, game);

        // this.log.silly('GameService::createGame - Game Session Created', { session });

        // // TODO: Consider using the setGameSession
        // // Update the game with the session reference after creation
        // await this.gameRepo.update(game.id, { current_session_id : session.id! });

        // this.log.silly('GameService::createGame - Game Updated With SessionId', { game });
        // this.log.silly('Emitting Game Update', { gameCode : game.game_code });

        // this.emitGameUpdate(server, game.game_code);
    }

    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async joinGame(
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(JoinGameDTO.Schema))
        joinGame: JoinGameDTO,
        runtimeContext: string = '',
    ): P<void> {

        this.myFunTestSocketIoServerRenameMe = server;

        const debugBundle = { joinGame, runtimeContext, socketId : socket.id };

        this.log.silly('GameService::joinGame', debugBundle);

        // we're not in the game yet, so look it up by the game
        // code first to get the game and session
        const { session, game } = await this.getGameStateByGameCode(joinGame.game_code!);

        // not using the session and game from here since we're no in the game yet
        let { currentPlayer: player } = await this.getPlayerStateByAuthToken(joinGame.auth_token!);

        if (!player)
            throw WSE.InternalServerError500(`JoinGame::Invalid Player (${joinGame.auth_token})`);

        if (session.exited_player_id_list.includes(player.id)) {
            const errorMessage = `Player ${player.username} has already exited the game, no take backsies.`;

            this.log.error(errorMessage, debugBundle);

            throw WSE.InternalServerError500(errorMessage);
        }

        this.log.silly('GameService::joinGame - Session and Game', { session, game });

        // Update the player to a real player, rather than the unknown
        // player type everyone gets when first connecting. Further joins
        // still run this, but it won't update anything
        player = await this.playerService.updatePlayerType(player, PlayerType.Player);

        // that ensures they can join this one (logs them out of existing sessions, validates, etc).
        await this.gameSessionService.setPlayerGameSession(player, session);

        // Add a specific channel for this game and player
        const playerGameChannel = `${game.id}_${player.id}`;

        this.log.info('Joining Player Specific Game Channel', { playerGameChannel });

        socket.join(playerGameChannel);

        await this.emitGameUpdate(
            server,
            game.game_code,
            false,  // no deck
            [], // no disconnects
            runtimeContext);
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
     * @throws WSE. if any error occurs while retrieving the game state.
     */
    public getGameStateAsPlayer = async (
        gameCode: string | null,
        playerId: string | null,
        includeDeck: boolean = false,
    ): P<GameStateDTO> => {

        // Log the beginning of the game state retrieval process
        this.log.silly('GameService::getGameStateAsPlayer - Start', {
            gameCode, playerId, includeDeck,
        });

        if (!playerId) throw WSE.InternalServerError500('Invalid player ID');
        if (!gameCode) throw WSE.InternalServerError500('Invalid game code');

        // Retrieve the game state using helper methods and adjust it to reflect the player's perspective
        const gameState = await this.getGameStateWithPlayerPerspective(
            gameCode, playerId, includeDeck);

        // Log success after successfully retrieving and adjusting the game state
        this.log.silly('GameService::getGameStateAsPlayer - Success', {
            gameCode, playerId, includeDeck,
        });

        return gameState;
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

            throw WSE.InternalServerError500('Multiple players over max points');
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
        gameCode: string,
        includeDeck: boolean = false,
        runtimeContext: string = '',
    ): P<GameStateDTO[]> => {

        this.log.silly('GameService::getAllPlayersGameStatus', {
            gameCode, includeDeck, runtimeContext,
        });

        // Retrieve the generic game state which includes player details
        const gameStateDTO = await this.getGameStateGeneric(gameCode, includeDeck, runtimeContext);

        // Map the generic game state to individual game states for each player
        return gameStateDTO.player_list.map(player => ({
            ...gameStateDTO,
            current_player_id : player.id, // Set each player's unique ID as the current player
        }));
    }

    /**
     * Retrieves the game state by the game code, including the session, score log, and players.
     *
     * @param gameCode - The unique code identifying the game session
     *
     * @returns - The game state DTO containing relevant game, session, and player data
     */
    private getGameStateByGameCode = async (
        gameCode: string,
        runtimeContext: string = '',
    ): P<{
        scoreLog: ScoreLog | null;
        session: GameSession;
        players: Player[];
        game: Game;
    }> => {
        this.log.silly('GameService::getGameStateByGameCode', {
            runtimeContext, gameCode : gameCode ?? '[null]',
        });

        // Perform game lookup with cleaned game code
        const cleanedGameCode = gameCode.toLowerCase().trim().replace(' ', '');

        const game = await this.gameRepo.findOneByOrFail({ game_code : cleanedGameCode });
        const session = await this.gameSessionService.findActiveGameSession(game);

        // Initiate parallel queries for session, score log, and players
        const [
            newSession, scoreLog, players,
        ] = await Promise.all([
            this.gameSessionService.findActiveGameSession(game),
            this.scoreLogService.findScoreLogBySession(session!),
            this.playerService.findActivePlayersInSession(session!),
        ]);

        this.log.silly('GameService::getGameStateByGameCode - Retrieved data', {
            newSession, scoreLog, players,
        });

        return {
            scoreLog, players, game, session : newSession,
        };
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
        runtimeContext: string = '',
    ): P<GameStateDTO> => {
        this.log.silly('GameService::getGameStateGeneric', {
            gameCode, includeDeck, runtimeContext,
        });

        // todo: update this to take disconnected and limbo players into account

        // Retrieve the game state using the provided game code
        const {
            game, session, scoreLog, players,
        } = await this.getGameStateByGameCode(gameCode, runtimeContext);

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
        // todo: send back runtimeContext as configutable in debug mode
        // foofindme

        return {
            selected_card_id_list : session.selected_card_id_list,
            dealer_card_id_list   : session.dealer_card_id_list,
            new_deck_card_list    : gameCardList,
            champion_player_id    : session.champion_player_id,
            current_player_id     : null,
            winner_player_id      : scoreLog?.winner_player_id ?? null,
            game_end_message      : session.game_end_message,
            max_round_count       : game.max_round_count,
            max_point_count       : game.max_point_count,
            winner_card_id        : scoreLog?.winner_card_id || null,
            dealer_card_id        : session.dealer_card_id,
            host_player_id        : game.host_player_id,
            new_auth_token        : null,
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

        this.log.silly('GameService::selectNextDealer', { session });

        const { player_id_list, dealer_id } = session;

        if (!dealer_id) {
            this.log.error('No current dealer found in session', { session });

            throw WSE.InternalServerError500(`No current dealer found in session (${session.id})`);
        }

        const dealerIndex = player_id_list.indexOf(dealer_id);

        if (dealerIndex === -1) {
            this.log.error('Current dealer not found in player list', { session });
            throw WSE.InternalServerError500(`Current dealer not found in player list (${session.id})`);
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
