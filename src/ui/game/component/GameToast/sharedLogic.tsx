import { CardColor } from '../../../../api/src/constant/card-color.enum';

import { TimeThresholds } from './constant';
import { TimeConfig } from "./type";


/**
 * Get the time configuration for the given time left.
 *
 * @param timeLeft - The time left.
 *
 * @returns The time configuration.
 */
export const getTimeConfig = (
    timeLeft: number,
) : TimeConfig => {
    for (const threshold of TimeThresholds)
        if (timeLeft <= threshold.limit)
            return {
                jiggleClass : threshold.jiggleClass,
                color       : threshold.color,
                timeLeft,
            };

    return {
        jiggleClass : '',
        color       : CardColor.White,
        timeLeft,
    };
};
