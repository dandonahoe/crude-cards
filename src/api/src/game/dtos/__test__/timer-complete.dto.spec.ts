import { TimerCompleteDTO } from '../timer-complete.dto';
import { TimerType } from '../../../type';

describe('TimerCompleteDTO', () => {

    describe('constructor', () => {
        it('should create a TimerCompleteDTO instance with provided timerType', () => {
            const timerType = TimerType.DealerPickBlackCard;

            const dto = new TimerCompleteDTO(timerType);

            expect(dto.timerType).toBe(timerType);
        });

        it('should create a TimerCompleteDTO instance with default values', () => {
            const dto = new TimerCompleteDTO();

            expect(dto.timerType).toBeNull();
        });
    });

    describe('schema', () => {
        Object.values(TimerType).forEach(validTimerType => {
            it(`should successfully validate and parse a valid timerType: ${validTimerType}`, () => {
                const dto = new TimerCompleteDTO(validTimerType as TimerType);

                expect(TimerCompleteDTO.Schema.parse(dto)).toEqual(dto);
            });
        });

        it('should throw an error for invalid timerType values', () => {
            const dto = new TimerCompleteDTO('InvalidTimerType' as unknown as TimerType);
            expect(() => TimerCompleteDTO.Schema.parse(dto)).toThrow();
        });

        it('should successfully validate and parse a valid null timerType', () => {
            const dto = new TimerCompleteDTO(null);

            expect(TimerCompleteDTO.Schema.parse(dto)).toEqual(dto);
        });

        it('should successfully validate and parse a valid undefined timerType', () => {
            const dto = new TimerCompleteDTO(undefined as unknown as TimerType);

            expect(TimerCompleteDTO.Schema.parse(dto)).toEqual(new TimerCompleteDTO(null));
        });
    });

    describe('DefaultTimerCompleteDTO', () => {
        it('should be a valid TimerCompleteDTO instance', () => {
            expect(TimerCompleteDTO.Schema.safeParse(TimerCompleteDTO.Default).success).toBe(true);
        });

        it('should have timerType as null', () => {
            expect(TimerCompleteDTO.Default.timerType).toBeNull();
        });
    });
});
