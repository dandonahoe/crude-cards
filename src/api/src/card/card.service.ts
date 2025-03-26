import { GameSession } from '../game-session/game-session.entity';
import { CardColor } from '../constant/card-color.enum';
import { WSE } from '../exceptions/WebSocket.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { P } from '../../../type/framework/data/P';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Card } from './card.entity';
/**
 * This service provides methods to interact with cards in the database.
 * It includes functionalities to find cards by session and select random cards by color.
 *
 * @see GameSession
 * @see CardColor
 * @see Card
 */
@Injectable()
export class CardService {

    /**
     * @param cardRepo - The repository for the Card entity.
     */
    public constructor(
        @InjectRepository(Card)
        private readonly cardRepo: Repository<Card>,
    ) {}

    public getCardById = async (id: string) : P<Card | null>=>
        this.cardRepo.findOneBy({ id });

    public getCardByIdOrExplode = async (id: string) : P<Card> => {
        const card = await this.getCardById(id);

        if (!card)
            throw WSE.InternalServerError500(`Card with ID ${id} not found`);

        return card;
    }
    /**
     * Finds cards associated with a given game session.
     *
     * @param session - The game session containing card IDs.
     * @returns A promise that resolves to an array of cards.
     *
     * @example
     * const cards = await this.cardService.findCardsBySession(session);
     */
    public findCardsBySession = async ({
        black_cards,  white_cards,
    }: GameSession) =>
        this.cardRepo.find({
            where : {
                id : In([
                    ...black_cards, ...white_cards,
                ]),
            },
        });

    /**
     * Selects a specified number of random cards of a given color.
     *
     * @param color - The color of the cards to be selected (e.g., black or white).
     * @param maxResultCount - The maximum number of cards to be selected.
     * @returns A promise that resolves to an array of randomly selected cards.
     *
     * @example
     * const randomCards = await this.cardService.selectRandomCards(CardColor.BLACK, 5);
     */
    public selectRandomCards = async (
        color: CardColor,
        maxResultCount: number,
    ) =>
        this.cardRepo
            .createQueryBuilder('card')
            .where('card.color = :color', { color })
            .orderBy('RANDOM()')
            .limit(maxResultCount)
            .getMany();
}
