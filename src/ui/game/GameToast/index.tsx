import { selectTimer } from '@app/client/selector/game';
import { useSelector } from 'react-redux';
import classes from './style.module.css';
import { Box} from '@mantine/core';
import { RFC } from '@app/ui/type';


export const GameToast : RFC= () => {

    // get the current tick cound from selectoar
    const timer = useSelector(selectTimer);

    if(!timer.timerType)
        return null;

    let color = '#fff';
    let jiggleClass = '';

    // todo: finish making this thing wiggle a bunch
    // when it gets toward zero
    if(timer.timeLeft <= 3) {
        jiggleClass = 'jiggle-high';
        color = '#f00';
    } else if(timer.timeLeft <= 5) {
        jiggleClass = 'jiggle-medium';
        color = '#ff8c00';
    } else if(timer.timeLeft <= 10) {
        jiggleClass = 'jiggle-low';
        color = '#ffff00';
    }

    return (
        <Box className={classes.toast  + ' ' + jiggleClass} >
            <Box
                className={classes.symbol}
                c={color}
                id='pi'
                style={{
                    border : `2px solid ${color}`,
                }}>
                {`${timer.timeLeft}s Left`}
            </Box>
        </Box>
    );
}

