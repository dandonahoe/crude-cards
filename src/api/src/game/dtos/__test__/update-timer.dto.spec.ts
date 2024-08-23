import { UpdateTimerDTO } from '../update-timer.dto';
import { TimerType } from '../../../type';


describe('UpdateTimerDTO', () => {

    describe('constructor', () => {
        it('should create an UpdateTimerDTO instance with provided values', () => {
            const timerType = TimerType.PlayerSelectWhiteCard;
            const timeLeft = 120;

            const dto = new UpdateTimerDTO(timerType, timeLeft);

            expect(dto.timerType).toBe(timerType);
            expect(dto.timeLeft).toBe(timeLeft);
        });

        it('should create an UpdateTimerDTO instance with default values', () => {
            const dto = new UpdateTimerDTO();

            expect(dto.timerType).toBeNull();
            expect(dto.timeLeft).toBe(0);
        });
    });

    describe('schema', () => {
        Object.values(TimerType).forEach(validTimerType => {
            it(`should successfully validate and parse a valid timerType: ${validTimerType}`, () => {
                const dto = new UpdateTimerDTO(validTimerType, 120);

                expect(UpdateTimerDTO.Schema.parse(dto)).toEqual(dto);
            });
        });

        it('should throw an error for invalid timerType values', () => {
            const dto = new UpdateTimerDTO('InvalidTimerType' as unknown as TimerType, 120);
            expect(() => UpdateTimerDTO.Schema.parse(dto)).toThrow();
        });

        it('should throw an error for invalid timeLeft values', () => {
            const dto = new UpdateTimerDTO('cowntdown' as TimerType, 'invalid-time' as unknown as number);
            expect(() => UpdateTimerDTO.Schema.parse(dto)).toThrow();
        });

        it('should successfully validate and parse a valid null timerType', () => {
            const dto = new UpdateTimerDTO(null, 120);

            expect(UpdateTimerDTO.Schema.parse(dto)).toEqual(dto);
        });

        it('should successfully validate and parse a valid undefined timerType and timeLeft', () => {
            const dto = new UpdateTimerDTO(undefined as unknown as TimerType, undefined as unknown as number);

            expect(UpdateTimerDTO.Schema.parse(dto)).toEqual(new UpdateTimerDTO(null, 0));
        });
    });

    describe('DefaultUpdateTimerDTO', () => {
        it('should be a valid UpdateTimerDTO instance', () => {
            expect(UpdateTimerDTO.Schema.safeParse(UpdateTimerDTO.Default).success).toBe(true);
        });

        it('should have timerType as null and timeLeft as 0', () => {
            expect(UpdateTimerDTO.Default.timerType).toBeNull();
            expect(UpdateTimerDTO.Default.timeLeft).toBe(0);
        });
    });
});
