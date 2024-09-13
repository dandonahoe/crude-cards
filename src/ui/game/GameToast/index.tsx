import { selectTimer } from '@app/client/selector/game';
import { getTimeConfig } from './sharedLogic';
import classes from './GameToast.module.css';
import { TimerSymbol } from './TimerSymbol';
import { useSelector } from 'react-redux';
import { Box } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameToast: RFC = () => {

    const timer = useSelector(selectTimer);

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
