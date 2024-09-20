import { TimerSymbolProps } from './type';
import { Box } from '@mantine/core';
import { RFC } from '@app/ui/type';


export const TimerSymbol: RFC<TimerSymbolProps> = ({
    timeLeft, color,
}) => (
    <Box
        style={{ border : `2px solid ${color}`, color }}
        className='symbol'>
        {`${timeLeft}s Left`}
    </Box>
);
