import { TimerType } from '../../type';
import { z } from 'zod';

// Define the schema using zod
const TimerCompleteDTOSchema = z.object({
    timerType : z.nativeEnum(TimerType).nullable(),
}).strict();

export class TimerCompleteDTO implements z.infer<typeof TimerCompleteDTOSchema> {

    public timerType: TimerType | null = null;

    public constructor(timerType: TimerType | null = null) {
        this.timerType = timerType;
    }

    public static Default = Object.freeze(new TimerCompleteDTO());
    public static Schema = TimerCompleteDTOSchema;
}
