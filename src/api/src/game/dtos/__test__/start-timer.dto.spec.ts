import { StartTimerDTO } from '../start-timer.dto';
import { TimerType } from '../../../type';


describe('StartTimerDTO', () => {

    describe('constructor', () => {
        it('should create a StartTimerDTO instance with provided values', () => {
            const timerType = TimerType.DealerPickWinner;
            const timeLeft = 60;

            const dto = new StartTimerDTO(timerType, timeLeft);

            expect(dto.timerType).toBe(timerType);
            expect(dto.timeLeft).toBe(timeLeft);
        });

        it('should create a StartTimerDTO instance with default values', () => {
            const dto = new StartTimerDTO(TimerType.Unknown, 0);

            expect(dto.timerType).toBe(TimerType.Unknown);
            expect(dto.timeLeft).toBe(0);
        });
    });

    describe('schema', () => {
        Object.values(TimerType).forEach(validTimerType => {
            it(`should successfully validate and parse a valid timerType: ${validTimerType}`, () => {
                const dto = new StartTimerDTO(validTimerType as TimerType, 60);

                expect(StartTimerDTO.Schema.parse(dto)).toEqual(dto);
            });
        });

        it('should throw an error for invalid timerType values', () => {
            const dto = new StartTimerDTO('InvalidTimerType' as unknown as TimerType, 60);
            expect(() => StartTimerDTO.Schema.parse(dto)).toThrow();
        });

        it('should throw an error for invalid timeLeft values', () => {
            const dto = new StartTimerDTO(TimerType.PlayerSelectWhiteCard, 'invalid-time' as unknown as number);
            expect(() => StartTimerDTO.Schema.parse(dto)).toThrow();
        });

        it('should successfully validate and parse a valid undefined timerType and timeLeft', () => {
            const dto = new StartTimerDTO(undefined as unknown as TimerType, undefined as unknown as number);

            expect(StartTimerDTO.Schema.parse(dto)).toEqual(new StartTimerDTO(TimerType.Unknown, 0));
        });
    });

    describe('DefaultStartTimerDTO', () => {
        it('should be a valid StartTimerDTO instance', () => {
            expect(StartTimerDTO.Schema.safeParse(StartTimerDTO.Default).success).toBe(true);
        });

        it('should have timerType as Unknown and timeLeft as 0', () => {
            expect(StartTimerDTO.Default.timerType).toBe(TimerType.Unknown);
            expect(StartTimerDTO.Default.timeLeft).toBe(0);
        });
    });
});
