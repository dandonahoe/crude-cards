import { selectTimer } from '@app/client/selector/game';
import classes from './GameToast.module.css';
import { TimerSymbol } from './TimerSymbol';
import { useSelector } from 'react-redux';
import { Box } from '@mantine/core';
import { RFC } from '@app/ui/type';

export const GameToast: RFC = () => {

    const timer = useSelector(selectTimer);

    if (!timer.timerType) return null;

    let jiggleClass = '';

    if      (timer.timeLeft <= 3 ) jiggleClass = classes.jiggleHigh;
    else if (timer.timeLeft <= 5 ) jiggleClass = classes.jiggleMedium;
    else if (timer.timeLeft <= 10) jiggleClass = classes.jiggleLow;

    return (
        <Box className={`${classes.toast} ${jiggleClass}`}>
            <TimerSymbol timeLeft={timer.timeLeft} />
        </Box>
    );
};
