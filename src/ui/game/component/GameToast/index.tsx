import { selectTimerByGameId } from '../../../../client/selector/game';
import { SpecialId } from '../../../../constant/framework/SpecialId';
import { useSelector } from '@app/client/hook';
import { getTimeConfig } from './sharedLogic';
import classes from './GameToast.module.css';
import { TimerSymbol } from './TimerSymbol';
import { Box } from '@mantine/core';


export const GameToast = () => {

    const timer = useSelector(state => selectTimerByGameId(state, SpecialId.DefaultGameCode));

    if (!timer.timerType)
        return null;

    const { color, jiggleClass } = getTimeConfig(timer.timeLeft);

    return (
        <Box className={`${classes.toast} ${classes[jiggleClass]}`}>
            <TimerSymbol
                timeLeft={timer.timeLeft}
                color={color} />
        </Box>
    );
};
