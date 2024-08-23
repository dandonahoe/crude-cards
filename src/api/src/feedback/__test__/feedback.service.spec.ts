import { SubmitFeedbackDTO } from '../../game/dtos/submit-feedback.dto';
import { GameSession } from '../../game-session/game-session.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from '../feedback.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../../player/player.entity';
import { MockData } from '../../test/MockData';
import { Feedback } from '../feedback.entity';
import { Game } from '../../game/game.entity';
import { Repository } from 'typeorm';

describe('FeedbackService', () => {
    let service: FeedbackService;
    let feedbackRepo: Repository<Feedback>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers : [
                FeedbackService,
                {
                    provide  : getRepositoryToken(Feedback),
                    useClass : Repository,
                },
            ],
        }).compile();

        feedbackRepo = module.get<Repository<Feedback>>(getRepositoryToken(Feedback));
        service = module.get<FeedbackService>(FeedbackService);
    });

    describe('submitFeedback', () => {
        it('should save feedback with valid data', async () => {
            const mockFeedback = new Feedback();
            const submitFeedbackDTO: SubmitFeedbackDTO = {
                name    : 'John Doe',
                email   : 'john.doe@example.com',
                message : 'This is a feedback message.',
            };
            const mockPlayer: Player = {
                id   : 'player-1',
                name : 'Player 1',
            } as unknown as Player;
            const mockSession: GameSession = {
                id          : 'session-1',
                black_cards : [],
                white_cards : [],
            } as unknown as GameSession;
            const mockGame: Game = {
                game_code : 'game-1',
            } as Game;

            jest.spyOn(feedbackRepo, 'save').mockResolvedValue(mockFeedback);

            const result = await service.submitFeedback(submitFeedbackDTO, mockPlayer, mockSession, mockGame);

            expect(feedbackRepo.save).toHaveBeenCalledWith({
                created_by : 'player-1',
                game_code  : 'game-1',
                session_id : 'session-1',
                message    : 'This is a feedback message.',
                player_id  : 'player-1',
                email      : 'john.doe@example.com',
                name       : 'John Doe',
            });

            expect(result).toEqual(mockFeedback);
        });

        it('should save feedback with nulls when optional fields are not provided', async () => {
            const mockFeedback = new Feedback();
            const submitFeedbackDTO: SubmitFeedbackDTO = {
                name    : null,
                email   : null,
                message : 'This is a feedback message.',
            };
            const mockPlayer: Player = {
                id   : 'player-1',
                name : 'Player 1',
            } as unknown as Player;
            const mockSession: GameSession = {
                id          : 'session-1',
                black_cards : [],
                white_cards : [],
            } as unknown as GameSession;
            const mockGame: Game = {
                game_code : 'game-1',
            } as Game;

            jest.spyOn(feedbackRepo, 'save').mockResolvedValue(mockFeedback);

            const result = await service.submitFeedback(submitFeedbackDTO, mockPlayer, mockSession, mockGame);

            expect(feedbackRepo.save).toHaveBeenCalledWith({
                created_by : 'player-1',
                game_code  : 'game-1',
                session_id : 'session-1',
                message    : 'This is a feedback message.',
                player_id  : 'player-1',
                email      : null,
                name       : null,
            });

            expect(result).toEqual(mockFeedback);
        });

        it('should save feedback with empty strings for optional fields', async () => {
            const mockFeedback = new Feedback();
            const submitFeedbackDTO: SubmitFeedbackDTO = {
                name    : '',
                email   : '',
                message : 'This is a feedback message.',
            };
            const mockPlayer: Player = {
                id   : 'player-1',
                name : 'Player 1',
            } as unknown as Player;
            const mockSession: GameSession = {
                id          : 'session-1',
                black_cards : [],
                white_cards : [],
            } as unknown as GameSession;
            const mockGame: Game = {
                game_code : 'game-1',
            } as Game;

            jest.spyOn(feedbackRepo, 'save').mockResolvedValue(mockFeedback);

            const result = await service.submitFeedback(submitFeedbackDTO, mockPlayer, mockSession, mockGame);

            expect(feedbackRepo.save).toHaveBeenCalledWith({
                created_by : 'player-1',
                game_code  : 'game-1',
                session_id : 'session-1',
                message    : 'This is a feedback message.',
                player_id  : 'player-1',
                email      : '',
                name       : '',
            });

            expect(result).toEqual(mockFeedback);
        });

        it('should throw an error if the repository fails', async () => {
            const submitFeedbackDTO: SubmitFeedbackDTO = {
                name    : 'John Doe',
                email   : 'john.doe@example.com',
                message : 'This is a feedback message.',
            };
            const mockPlayer: Player = {
                id   : 'player-1',
                name : 'Player 1',
            } as unknown as Player;
            const mockSession: GameSession = {
                id          : 'session-1',
                black_cards : [],
                white_cards : [],
            } as unknown as GameSession;
            const mockGame: Game = {
                game_code : 'game-1',
            } as Game;

            jest.spyOn(feedbackRepo, 'save').mockRejectedValue(new Error('Database error'));

            await expect(service.submitFeedback(submitFeedbackDTO, mockPlayer, mockSession, mockGame)).rejects.toThrow('Database error');
        });
        for (const validName of MockData.String.Valid.List)
            for (const validEmail of MockData.String.Valid.List)
                it('should handle submitting feedback with mock data', async () => {
                    const mockFeedback = new Feedback();
                    jest.spyOn(feedbackRepo, 'save').mockResolvedValue(mockFeedback);

                    const submitFeedbackDTO: SubmitFeedbackDTO = {
                        name    : validName,
                        email   : validEmail,
                        message : 'This is a feedback message.',
                    };
                    const mockPlayer: Player = {
                        id   : 'player-1',
                        name : 'Player 1',
                    } as unknown as Player;

                    const mockSession: GameSession = {
                        id          : 'session-1',
                        black_cards : [],
                        white_cards : [],
                    } as unknown as GameSession;
                    const mockGame: Game = {
                        game_code : 'game-1',
                    } as Game;

                    const result = await service.submitFeedback(submitFeedbackDTO, mockPlayer, mockSession, mockGame);

                    expect(feedbackRepo.save).toHaveBeenCalledWith({
                        created_by : 'player-1',
                        game_code  : 'game-1',
                        session_id : 'session-1',
                        message    : 'This is a feedback message.',
                        player_id  : 'player-1',
                        email      : validEmail,
                        name       : validName,
                    });

                    expect(result).toEqual(mockFeedback);
                });


    });
});
