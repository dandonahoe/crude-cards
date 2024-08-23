import { valueToString } from './../../test/TestUtil';
import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from '../feedback.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeedbackModule } from '../feedback.module';
import { MockData } from './../../test/MockData';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from '../feedback.entity';
import { Repository } from 'typeorm';

describe('FeedbackModule', () => {

    let module: TestingModule;
    let feedbackService: FeedbackService;
    let feedbackRepository: Repository<Feedback>;

    beforeAll(async () => {

        module = await Test
            .createTestingModule({
                imports : [
                    TypeOrmModule.forFeature([Feedback]),
                    FeedbackModule,
                ],
            })
            .overrideProvider(getRepositoryToken(Feedback))
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

        feedbackRepository = module.get<Repository<Feedback>>(getRepositoryToken(Feedback));
        feedbackService = module.get<FeedbackService>(FeedbackService);
    });

    afterAll(async () => {
        await module.close();
    });

    it('should be defined', () => {
        expect(feedbackService).toBeDefined();
        expect(feedbackRepository).toBeDefined();
    });

    describe('submitFeedback', () => {
        it('should save feedback with valid data', async () => {
            const mockFeedback = new Feedback();
            const submitFeedbackDTO = {
                name    : 'John Doe',
                email   : 'john.doe@example.com',
                message : 'This is a feedback message.',
            };
            const mockSaveResponse = { ...mockFeedback, ...submitFeedbackDTO };
            jest.spyOn(feedbackRepository, 'save').mockResolvedValue(mockSaveResponse);

            const result = await feedbackService.submitFeedback(
                submitFeedbackDTO,
                { id : 'player-1' } as any,
                { id : 'session-1' } as any,
                { game_code : 'game-1' } as any);

            expect(result).toEqual(mockSaveResponse);
            expect(feedbackRepository.save).toHaveBeenCalledWith(expect.objectContaining({
                name    : 'John Doe',
                email   : 'john.doe@example.com',
                message : 'This is a feedback message.',
            }));
        });

        it('should save feedback with null fields', async () => {
            const mockFeedback = new Feedback();
            const submitFeedbackDTO = {
                name    : null,
                email   : null,
                message : 'This is a feedback message.',
            };
            const mockSaveResponse = { ...mockFeedback, ...submitFeedbackDTO };
            jest.spyOn(feedbackRepository, 'save').mockResolvedValue(mockSaveResponse);

            const result = await feedbackService.submitFeedback(
                submitFeedbackDTO,
                { id : 'player-1' } as any,
                { id : 'session-1' } as any,
                { game_code : 'game-1' } as any,
            );

            expect(result).toEqual(mockSaveResponse);
            expect(feedbackRepository.save).toHaveBeenCalledWith(expect.objectContaining({
                name    : null,
                email   : null,
                message : 'This is a feedback message.',
            }));
        });

        it('should throw an error if save fails', async () => {
            const submitFeedbackDTO = {
                name    : 'John Doe',
                email   : 'john.doe@example.com',
                message : 'This is a feedback message.',
            };
            jest.spyOn(feedbackRepository, 'save').mockRejectedValue(new Error('Database error'));

            await expect(feedbackService.submitFeedback(
                submitFeedbackDTO,
                { id : 'player-1' } as any,
                { id : 'session-1' } as any,
                { game_code : 'game-1' } as any),
            ).rejects.toThrow('Database error');
        });

        it('should save feedback with empty string fields', async () => {
            const mockFeedback = new Feedback();
            const submitFeedbackDTO = {
                name    : '',
                email   : '',
                message : 'This is a feedback message.',
            };
            const mockSaveResponse = { ...mockFeedback, ...submitFeedbackDTO };
            jest.spyOn(feedbackRepository, 'save').mockResolvedValue(mockSaveResponse);

            const result = await feedbackService.submitFeedback(
                submitFeedbackDTO,
                { id : 'player-1' } as any,
                { id : 'session-1' } as any,
                { game_code : 'game-1' } as any,
            );

            expect(result).toEqual(mockSaveResponse);
            expect(feedbackRepository.save).toHaveBeenCalledWith(expect.objectContaining({
                name    : '',
                email   : '',
                message : 'This is a feedback message.',
            }));
        });

        // Loop over valid mock data for name and email
        MockData.String.Valid.List.forEach(validName => {
            MockData.String.Valid.List.forEach(validEmail => {
                it(`with valid name "${valueToString(validName)}" and email "${valueToString(validEmail)}"`, async () => {
                    const mockFeedback = new Feedback();

                    const submitFeedbackDTO = {
                        name    : validName,
                        email   : validEmail,
                        message : 'This is a feedback message.',
                    };

                    const mockSaveResponse = { ...mockFeedback, ...submitFeedbackDTO };

                    jest.spyOn(feedbackRepository, 'save').mockResolvedValue(mockSaveResponse);

                    const result = await feedbackService.submitFeedback(
                        submitFeedbackDTO,
                        { id : 'player-1' } as any,
                        { id : 'session-1' } as any,
                        { game_code : 'game-1' } as any,
                    );

                    expect(result).toEqual(mockSaveResponse);

                    expect(feedbackRepository.save).toHaveBeenCalledWith(expect.objectContaining({
                        name    : validName,
                        email   : validEmail,
                        message : 'This is a feedback message.',
                    }));
                });
            });
        });

        // Loop over invalid mock data for email
        MockData.String.Invalid.List.forEach(invalidEmail => {
            it(`should throw an error for invalid email "${valueToString(invalidEmail)}"`, async () => {
                const submitFeedbackDTO = {
                    name    : 'John Doe',
                    email   : invalidEmail as string,
                    message : 'This is a feedback message.',
                };
                jest.spyOn(feedbackRepository, 'save').mockRejectedValue(new Error('Invalid email format'));

                await expect(feedbackService.submitFeedback(
                    submitFeedbackDTO,
                    { id : 'player-1' } as any,
                    { id : 'session-1' } as any,
                    { game_code : 'game-1' } as any),
                ).rejects.toThrow('Invalid email format');
            });
        });
    });
});
