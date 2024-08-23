import { Test, TestingModule } from '@nestjs/testing';
import { UtilService, gameCodes } from '../util.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { faker } from '@faker-js/faker';

describe('UtilService', () => {
    let service: UtilService;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars, no-unused-vars
    let logger: Logger;

    const mockLogger = {
        log   : jest.fn(),
        info  : jest.fn(),
        error : jest.fn(),
        warn  : jest.fn(),
        silly : jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers : [
                UtilService,
                {
                    provide  : WINSTON_MODULE_PROVIDER,
                    useValue : mockLogger,
                },
            ],
        }).compile();

        service = module.get<UtilService>(UtilService);
        logger = module.get<Logger>(WINSTON_MODULE_PROVIDER);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('generateGameCode', () => {
        it('should throw an error if maxLength is not a positive integer', async () => {
            await expect(service.generateGameCode(0)).rejects.toThrow('maxLength should be a positive interger 0');
            await expect(service.generateGameCode(-1)).rejects.toThrow('maxLength should be a positive interger -1');
        });

        it('should throw an error if maxAttempts is not a positive integer', async () => {
            await expect(service.generateGameCode(3, 0)).rejects.toThrow('maxAttempts should be a positive interger 0');
            await expect(service.generateGameCode(3, -1)).rejects.toThrow('maxAttempts should be a positive interger -1');
        });

        it('should return a valid game code within the maxLength', async () => {
            const maxLength = 4;
            const gameCode = await service.generateGameCode(maxLength);
            expect(gameCode.length).toBeLessThanOrEqual(maxLength);
            expect(gameCodes).toContain(gameCode);
        });

        it('should fall back to faker if a valid game code is not found within maxAttempts', async () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0); // Force first game code to always be too long

            const maxLength = 1;
            const maxAttempts = 1;
            const fallbackCode = faker.string.alpha(maxLength);

            jest.spyOn(faker.string, 'alpha').mockReturnValue(fallbackCode);

            const gameCode = await service.generateGameCode(maxLength, maxAttempts);

            expect(faker.string.alpha).toHaveBeenCalledWith(maxLength);
            expect(gameCode).toEqual(fallbackCode);

            jest.spyOn(global.Math, 'random').mockRestore(); // Restore the original random behavior
        });
    });
});
