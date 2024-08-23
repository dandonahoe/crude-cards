import { GameSession } from '../game-session/game-session.entity';
import { PlayerType } from '../constant/player-type.enum';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { P } from '../../../type/framework/data/P';
import { In, IsNull, Repository } from 'typeorm';
import { Player } from './player.entity';
import { faker } from '@faker-js/faker';
import { Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';
import { Logger } from 'winston';

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
    public findPlayerBySocket = async (socket: Socket): P<Player | null> =>
        this.playerRepo.findOneBy({
            socket_id       : socket.id,
            disconnected_at : IsNull(),
        });

    /**
     * Ensures the player is ready to join by setting their user type.
     * @param player - The player entity.
     * @returns A promise that resolves to the updated player entity.
     */
    public ensureReadyToJoin = async (player: Player): P<Player> =>
        this.playerRepo.save({
            ...player,
            user_type : PlayerType.Player,
        });

    /**
     * Updates the player's username.
     * @param player - The player entity.
     * @param newUsername - The new username.
     * @returns A promise that resolves to the updated player entity.
     */
    public updateUsername = async (player: Player, newUsername: string): P<Player> =>
        this.playerRepo.save({
            ...player,
            username : newUsername,
        });

    /**
     * Updates the white card IDs for a player.
     * @param playerId - The ID of the player.
     * @param whiteCardIds - The list of white card IDs.
     * @returns A promise that resolves when the update is complete.
     */
    public updatePlayerWhiteCardIds = async (playerId: string, whiteCardIds: string[]) =>
        this.playerRepo.update(playerId, {
            card_id_list : whiteCardIds,
        });

    /**
     * Increments the player's score by 1.
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
     * @param playerId - The ID of the player.
     * @param cardId - The ID of the card to add.
     * @returns A promise that resolves when the update is complete.
     */
    public addWhiteCardToPlayer = async (playerId: string, cardId: string) =>
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
     * @param session - The game session.
     * @returns A promise that resolves to an array of player entities.
     */
    public findPlayersInSession = async (session: GameSession) =>
        this.playerRepo.find({
            where : {
                id : In(session.player_id_list),
            },
        });

    /**
     * Updates the socket ID for a player.
     * @param existingPlayer - The existing player entity.
     * @param socket - The socket instance.
     * @returns A promise that resolves when the update is complete.
     */
    public updatePlayerSocketId = async (existingPlayer: Player, socket: Socket) =>
        this.playerRepo.save({
            ...existingPlayer,
            socket_id       : socket.id,
            disconnected_at : null,
        });

    /**
     * Creates a new player with a unique auth token and random username.
     * @param socket - The socket instance.
     * @returns A promise that resolves to the newly created player entity.
     */
    public createPlayer = async (socket: Socket): P<Player> =>
        this.playerRepo.save({
            card_id_list : [],
            auth_token   : uuid(),
            username     : `${faker.science.chemicalElement().name} ${faker.person.lastName()}`,
            user_type    : PlayerType.Unknown,
            socket_id    : socket.id,
        });

    /**
     * Disconnects a player by updating their disconnected_at timestamp.
     * @param socket - The socket instance.
     * @returns A promise that resolves to the updated player entity.
     */
    public disconnectPlayer = async (socket: Socket): P<Player> => {

        this.log.silly('Disconnecting player', { socketId : socket.id });

        const player = await this.playerRepo.findOneByOrFail({
            socket_id       : socket.id,
            disconnected_at : IsNull(),
        });

        this.log.debug('Disconnecting player', player);

        return this.playerRepo.save({
            ...player,
            disconnected_at : new Date(),
        });
    };

    /**
     * Retrieves a player by their auth token.
     * @param authToken - The authentication token.
     * @returns A promise that resolves to the player entity.
     */
    public getPlayerByAuthToken = async (authToken: string): Promise<Player> =>
        this.playerRepo.findOneByOrFail({
            auth_token      : authToken,
            disconnected_at : IsNull(),
        });
}
