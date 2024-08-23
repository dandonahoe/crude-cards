import { GameSession } from './../../game-session/game-session.entity';
import { CardColor } from '../../constant/card-color.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from './../card.module';
import { CardService } from '../card.service';
import { Repository, In } from 'typeorm';
import { Card } from '../card.entity';

describe('CardModule', () => {

    let module: TestingModule;
    let cardService: CardService;
    let cardRepository: Repository<Card>;

    beforeAll(async () => {

        module = await Test
            .createTestingModule({
                imports : [
                    TypeOrmModule.forFeature([Card]),
                    CardModule,
                ],
            })
            .overrideProvider(getRepositoryToken(Card))
            .useValue({
                find               : jest.fn(),
                save               : jest.fn(),
                createQueryBuilder : jest.fn().mockReturnThis(),
                where              : jest.fn().mockReturnThis(),
                orderBy            : jest.fn().mockReturnThis(),
                limit              : jest.fn().mockReturnThis(),
                getMany            : jest.fn(),
            })
            .compile();

        cardRepository = module.get<Repository<Card>>(getRepositoryToken(Card));
        cardService = module.get<CardService>(CardService);
    });

    afterAll(async () => {
        await module.close();
    });

    it('should be defined', () => {
        expect(cardService).toBeDefined();
        expect(cardRepository).toBeDefined();
    });

    it('should find cards by session', async () => {
        const mockCards = [
            { id : '1', color : CardColor.Black, text : 'Black card' },
            { id : '2', color : CardColor.White, text : 'White card' },
        ] as Card[];

        jest.spyOn(cardRepository, 'find').mockResolvedValue(mockCards);

        const result = await cardService.findCardsBySession({
            id          : '1',
            black_cards : ['1'],
            white_cards : ['2'],
        } as GameSession);

        expect(result).toEqual(mockCards);
        expect(cardRepository.find).toHaveBeenCalledWith(expect.objectContaining({
            where : {
                id : In(['1', '2']),
            },
        }));
    });

    it('should return an empty array if no cards match the session', async () => {
        jest.spyOn(cardRepository, 'find').mockResolvedValue([]);

        const result = await cardService.findCardsBySession({
            id          : '1',
            black_cards : ['999'],
            white_cards : ['998'],
        } as GameSession);

        expect(result).toEqual([]);
        expect(cardRepository.find).toHaveBeenCalledWith(expect.objectContaining({
            where : {
                id : In(['999', '998']),
            },
        }));
    });

    it('should handle sessions with no cards', async () => {
        jest.spyOn(cardRepository, 'find').mockResolvedValue([]);

        const result = await cardService.findCardsBySession({
            id          : '1',
            black_cards : [],
            white_cards : [],
        } as unknown as GameSession);

        expect(result).toEqual([]);
        expect(cardRepository.find).toHaveBeenCalledWith(expect.objectContaining({
            where : {
                id : In([]),
            },
        }));
    });

    it('should select random cards', async () => {
        const mockCards = [
            { id : '1', color : CardColor.Black, text : 'Black card' },
            { id : '2', color : CardColor.Black, text : 'Another black card' },
        ] as Card[];

        jest.spyOn(cardRepository, 'createQueryBuilder').mockReturnValue({
            where   : jest.fn().mockReturnThis(),
            orderBy : jest.fn().mockReturnThis(),
            limit   : jest.fn().mockReturnThis(),
            getMany : jest.fn().mockResolvedValue(mockCards),
        } as any);

        const result = await cardService.selectRandomCards(CardColor.Black, 2);

        expect(result).toEqual(mockCards);
        expect(cardRepository.createQueryBuilder).toHaveBeenCalledWith('card');
        expect(cardRepository.createQueryBuilder().where).toHaveBeenCalledWith('card.color = :color', { color : CardColor.Black });
        expect(cardRepository.createQueryBuilder().getMany).toHaveBeenCalled();
    });

    it('should return an empty array if no cards match the color', async () => {
        jest.spyOn(cardRepository, 'createQueryBuilder').mockReturnValue({
            where   : jest.fn().mockReturnThis(),
            orderBy : jest.fn().mockReturnThis(),
            limit   : jest.fn().mockReturnThis(),
            getMany : jest.fn().mockResolvedValue([]),
        } as any);

        const result = await cardService.selectRandomCards(CardColor.Black, 2);

        expect(result).toEqual([]);
        expect(cardRepository.createQueryBuilder).toHaveBeenCalledWith('card');
        expect(cardRepository.createQueryBuilder().where).toHaveBeenCalledWith('card.color = :color', { color : CardColor.Black });
        expect(cardRepository.createQueryBuilder().getMany).toHaveBeenCalled();
    });

    it('should handle selection of cards with different colors', async () => {
        const mockCards = [
            { id : '1', color : CardColor.White, text : 'White card' },
            { id : '2', color : CardColor.White, text : 'Another white card' },
        ] as Card[];

        jest.spyOn(cardRepository, 'createQueryBuilder').mockReturnValue({
            where   : jest.fn().mockReturnThis(),
            orderBy : jest.fn().mockReturnThis(),
            limit   : jest.fn().mockReturnThis(),
            getMany : jest.fn().mockResolvedValue(mockCards),
        } as any);

        const result = await cardService.selectRandomCards(CardColor.White, 2);

        expect(result).toEqual(mockCards);
        expect(cardRepository.createQueryBuilder).toHaveBeenCalledWith('card');
        expect(cardRepository.createQueryBuilder().where).toHaveBeenCalledWith(
            'card.color = :color', {
            color : CardColor.White,
        });
        expect(cardRepository.createQueryBuilder().getMany).toHaveBeenCalled();
    });

    it('should limit the number of selected cards', async () => {
        const mockCards = [
            { id : '1', color : CardColor.Black, text : 'Black card' },
            { id : '2', color : CardColor.Black, text : 'Another black card' },
            { id : '3', color : CardColor.Black, text : 'Yet another black card' },
        ] as Card[];

        jest.spyOn(cardRepository, 'createQueryBuilder').mockReturnValue({
            where   : jest.fn().mockReturnThis(),
            orderBy : jest.fn().mockReturnThis(),
            limit   : jest.fn().mockReturnThis(),
            getMany : jest.fn().mockResolvedValue(mockCards.slice(0, 2)),
        } as any);

        const result = await cardService.selectRandomCards(CardColor.Black, 2);

        expect(result).toHaveLength(2);
        expect(cardRepository.createQueryBuilder).toHaveBeenCalledWith('card');
        expect(cardRepository.createQueryBuilder().limit).toHaveBeenCalledWith(2);
        expect(cardRepository.createQueryBuilder().getMany).toHaveBeenCalled();
    });
});
