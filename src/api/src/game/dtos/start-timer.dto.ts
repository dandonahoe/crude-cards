import { TimerType } from '../../type';
import { z } from 'zod';

// Define the schema using zod
const StartTimerDTOSchema = z.object({
    timerType : z.nativeEnum(TimerType),
    timeLeft  : z.number(),
}).strict();


export class StartTimerDTO implements z.infer<typeof StartTimerDTOSchema> {

    public timerType: TimerType = TimerType.Unknown;
    public timeLeft: number = 0;

    public constructor(timerType: TimerType, timeLeft: number) {

        if (timerType !== undefined) this.timerType = timerType;
        if (timeLeft !== undefined) this.timeLeft = timeLeft;
    }

    // Expose the schema for external use
    public static Schema = StartTimerDTOSchema;
    public static Default = Object.freeze(new StartTimerDTO(TimerType.Unknown, 0));
}
