// @ai-lint-begin @ruleset/custom-name @ruleset/require-name @rule/import-line-length-descending

// Normally for repeated sections you would just create a ruleset of these rules to reduce
// boilerplate, but for the sake of this example we show how rule overrides work. Rules and
// rulesets are overridden from left to right, so the rightmost rule will take precedence.
// In this case, I have a ruleset custom-name which is overridden and augmented by require-name,
// the lastly an individual rule @rule/import-line-length-descending overrides everything.
// Any time a @ai-lint-begin exists, it MUST be accompanied by a @ai-lint-end, similar to the

import { GameSession } from '../game-session/game-session.entity';
import { PlayerType } from '../constant/player-type.enum';
import { WSE } from '../exceptions/WebSocket.exception';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { P } from '../../../type/framework/data/P';
import { SocketID, AuthToken } from '../type';
import { In, Repository } from 'typeorm';
import { Player } from './player.entity';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';
import { Logger } from 'winston';

// @ai-lint-begin @ruleset/custom-name @ruleset/require-name @rule/import-line-length-descending


@Injectable()
export class PlayerService {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        @InjectRepository(Player)
        private readonly playerRepo: Repository<Player>,
    ) { }

    /**
     * Finds a player by their socket ID.
     *
     * @param socket - The socket instance.
     * @returns A promise that resolves to the player entity.
     */
    public findPlayerBySocket = async (socket: Socket): P<Player> =>
        this.playerRepo.findOneByOrFail({
            socket_id : socket.id,
        });

    /**
     *
     * @param player -
     * @returns
     */
    public updatePlayerAuthToken = async (
        player: Player,
    ): P<Player> =>
        this.playerRepo.save({
            ...player,
            disconnected_at : null,
            auth_token      : uuid(),
        });

    /**
     * Finds the leader or players tied for the lead in a session
     * @param session - The game session
     *
     * @returns A promise that resolves to an array of player entities
     */
    public getPlayersInFirstPlace = async (
        session: GameSession,
    ) => {
        debugger;

        const playersRanked = await this.playerRepo.find({
            where : {
                id : In(session.player_id_list),
            }, order : {
                score : 'DESC',
            },
        });

        // loop through all the top players until a second player
        // player is found, and return all the first place players
        return playersRanked.filter((player, index) =>
            index === 0 || player.score === playersRanked[0].score,
        );
    };

    public updatePlayerType = async (
        player: Player, playerType: PlayerType,
    ): P<Player> =>
        this.playerRepo.save({
            ...player,
            user_type : playerType,
        });
    /**
     * Updates the player's username.
     *
     * @param player - The player entity.
     * @param newUsername - The new username.
     * @returns A promise that resolves to the updated player entity.
     */
    public updateUsername = async (
        player: Player, newUsername: string,
    ): P<Player> =>
        this.playerRepo.save({
            ...player,
            username : newUsername,
        });

    /**
     * Updates the white card IDs for a player.
     *
     * @param playerId - The ID of the player.
     * @param whiteCardIds - The list of white card IDs.
     * @returns A promise that resolves when the update is complete.
     */
    public updatePlayerWhiteCardIds = async (
        playerId: string, whiteCardIds: string[],
    ) =>
        this.playerRepo.update(playerId, {
            card_id_list : whiteCardIds,
        });

    /**
     * Increments the player's score by 1.
     *
     * @param player - The player entity.
     * @returns A promise that resolves to the updated player entity.
     */
    public incrementPlayerScore = async (player: Player): P<Player> =>
        this.playerRepo.save({
            ...player,
            score : player.score + 1,
        });

    /**
     * Adds a white card to the player's list of cards.
     *
     * @param playerId - The ID of the player.
     * @param cardId - The ID of the card to add.
     * @returns A promise that resolves when the update is complete.
     */
    public addWhiteCardToPlayer = async (
        playerId: string, cardId: string,
    ) =>
        this.playerRepo
            .createQueryBuilder()
            .update(Player)
            .set({
                card_id_list : () => `array_append(card_id_list, '${cardId}')`,
            })
            .where("id = :id", { id : playerId })
            .execute();

    /**
     * Finds all players in a given game session.
     *
     * @param session - The game session.
     * @returns A promise that resolves to an array of player entities.
     */
    public findActivePlayersInSession = async ({
        limbo_player_id_list, player_id_list,
    }: GameSession): P<Player[]> =>
        this.playerRepo.find({
            where : [{
                id : In([
                    // not including exited players,
                    // just including players
                    // who are known to be looking at the screen (limbo and active)
                    ...limbo_player_id_list,
                    ...player_id_list,
                ]),
            }],
        });

    /**
     * Updates the socket ID for a player.
     *
     * @param existingPlayer - The existing player entity.
     * @param socket - The socket instance.
     * @returns A promise that resolves when the update is complete.
     */
    public updatePlayerSocketId = async (
        existingPlayer: Player, socket: Socket,
    ): P<Player> =>
        this.playerRepo.save({
            ...existingPlayer,
            socket_id       : socket.id,
            disconnected_at : null,
        });

    /**
     * Creates a new player with a unique auth token and random username.
     *
     * @param socket - The socket instance.
     * @returns A promise that resolves to the newly created player entity.
     */
    public createPlayer = async (socketId: SocketID): P<Player> =>
        this.playerRepo.save({
            card_id_list : [],
            auth_token   : uuid(),
            username     : `${faker.science.chemicalElement().name} ${faker.person.lastName()}`,
            user_type    : PlayerType.Unknown,
            socket_id    : socketId,
        });

    /**
     * Disconnects a player by updating their disconnected_at timestamp.
     *
     * @param socket - The socket instance.
     * @returns A promise that resolves to the updated player entity.
     */
    public disconnectPlayer = async (player: Player): P<Player> => {

        this.log.silly('Disconnecting player', { player });

        return this.playerRepo.save({
            ...player,
            auth_token      : uuidv4(),
            disconnected_at : new Date(),
        });
    };

    /**
     * Retrieves a player by their auth token.
     *
     * @param authToken - The authentication token.
     * @returns A promise that resolves to the player entity.
     */
    public getPlayerByAuthTokenOrFail = async (
        authToken: AuthToken,
    ): P<Player> => {
        const authTokenPlayer = await this.getPlayerByAuthToken(authToken);

        if (authTokenPlayer) return authTokenPlayer;

        const errorMessage = `getPlayerByAuthTokenOrFail::Player not found ${authToken}`;

        this.log.error(errorMessage);
        throw new Error(errorMessage);
    }

    /**
     * Retrieves a player by their auth token.
     *
     * @param authToken - The authentication token.
     * @returns A promise that resolves to the player entity.
     */
    public async getPlayerByAuthToken(
        authToken: AuthToken,
    ): P<Player | null> {
        return this.playerRepo.findOneBy({
            auth_token : authToken as string,
        });
    }
}
