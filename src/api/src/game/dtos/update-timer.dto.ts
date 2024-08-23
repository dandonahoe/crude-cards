import { TimerType } from '../../type';
import { z } from 'zod';

const UpdateTimerDTOSchema = z.object({
    timerType : z.nativeEnum(TimerType).nullable(),
    timeLeft  : z.number(),
}).strict();


export class UpdateTimerDTO implements z.infer<typeof UpdateTimerDTOSchema> {

    public timerType: TimerType | null = null;
    public timeLeft: number = 0;

    public constructor(
        timerType: TimerType | null = null,
        timeLeft: number = 0,
    ) {
        if (timerType !== undefined) this.timerType = timerType;
        if (timeLeft !== undefined) this.timeLeft = timeLeft;
    }

    public static Schema = UpdateTimerDTOSchema;
    public static Default = Object.freeze(new UpdateTimerDTO());
}

