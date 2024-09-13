import { TimerSymbolProps } from './type';
import classes from './style.module.css';
import { Box } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const TimerSymbol: RFC<TimerSymbolProps> = ({
    timeLeft,
}) => {

    let color = '#fff';

    if      (timeLeft <= 3 ) color = '#f00';
    else if (timeLeft <= 5 ) color = '#ff8c00';
    else if (timeLeft <= 10) color = '#ffff00';


    return (
        <Box
            style={{ border : `2px solid ${color}`, color }}
            className={classes.symbol}>
            {`${timeLeft}s Left`}
        </Box>
    );
};
