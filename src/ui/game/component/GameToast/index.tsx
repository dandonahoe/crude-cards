import { selectTimer } from '../../../../client/selector/game';
import { getTimeConfig } from './sharedLogic';
import classes from './GameToast.module.css';
import { TimerSymbol } from './TimerSymbol';
import { useSelector } from 'react-redux';
import { Box } from '@mantine/core';


export const GameToast = () => {

    const timer = useSelector(selectTimer);

    console.log('111')
    if (!timer?.timerType)
        return null;

    console.log('222')

    const { color, jiggleClass } = getTimeConfig(timer.timeLeft);

    return (
        <Box className={`${classes.toast} ${classes[jiggleClass]}`}>
            <TimerSymbol
                timeLeft={timer.timeLeft}
                color={color} />
        </Box>
    );
};
