import { GameSession } from '../../game-session/game-session.entity';
import { CardColor } from '../../constant/card-color.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardService } from '../card.service';
import { Card } from '../card.entity';
import { Repository } from 'typeorm';

describe('CardService', () => {
    let service: CardService;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars, no-unused-vars
    let cardRepo: Repository<Card>;

    const mockCardRepository = {
        find               : jest.fn(),
        createQueryBuilder : jest.fn().mockReturnValue({
            where   : jest.fn().mockReturnThis(),
            orderBy : jest.fn().mockReturnThis(),
            limit   : jest.fn().mockReturnThis(),
            getMany : jest.fn(),
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers : [
                CardService,
                {
                    provide  : getRepositoryToken(Card),
                    useValue : mockCardRepository,
                },
            ],
        }).compile();

        service = module.get<CardService>(CardService);
        cardRepo = module.get<Repository<Card>>(getRepositoryToken(Card));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findCardsBySession', () => {
        it('should find cards by session with provided black and white card IDs', async () => {
            const mockGameSession: GameSession = {
                black_cards : ['black1', 'black2'],
                white_cards : ['white1', 'white2'],
            } as GameSession;

            const mockCards = [
                { id : 'black1', color : CardColor.Black, text : 'Black Card 1' },
                { id : 'white1', color : CardColor.White, text : 'White Card 1' },
            ] as Card[];

            mockCardRepository.find.mockResolvedValue(mockCards);

            const result = await service.findCardsBySession(mockGameSession);

            expect(mockCardRepository.find).toHaveBeenCalledWith({
                where : {
                    id : expect.objectContaining({
                        _type  : 'in',
                        _value : ['black1', 'black2', 'white1', 'white2'],
                    }),
                },
            });
            expect(result).toEqual(mockCards);
        });
    });

    describe('selectRandomCards', () => {
        it('should select random cards by color and limit the result count', async () => {
            const mockCards = [
                { id : 'card1', color : CardColor.Black, text : 'Random Black Card 1' },
                { id : 'card2', color : CardColor.Black, text : 'Random Black Card 2' },
            ] as Card[];

            mockCardRepository.createQueryBuilder().getMany.mockResolvedValue(mockCards);

            const result = await service.selectRandomCards(CardColor.Black, 2);

            expect(mockCardRepository.createQueryBuilder).toHaveBeenCalled();
            expect(mockCardRepository.createQueryBuilder().where).toHaveBeenCalledWith('card.color = :color', { color : CardColor.Black });
            expect(mockCardRepository.createQueryBuilder().orderBy).toHaveBeenCalledWith('RANDOM()');
            expect(mockCardRepository.createQueryBuilder().limit).toHaveBeenCalledWith(2);
            expect(result).toEqual(mockCards);
        });
    });
});
