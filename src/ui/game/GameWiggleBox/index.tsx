import { Box } from '@mantine/core';
import seedrandom from 'seedrandom';
import { RFC } from '../../type';
import { Props } from './type';


export const GameWiggleBox : RFC<Props> = ({
    children, index,

    verticleWiggleFactor = 50,
    cardOverlapFactor    = 40,
    wiggleFactor         = 6,
    tiltFactor           = 8,
}) => {

    // stops random wobbling on rerender
    const rand = seedrandom(`${index}`);

    return (
        <Box
            style={{
                width  : '100%',
                rotate : `${rand() * tiltFactor - (tiltFactor / 2)}deg`,
                left   : wiggleFactor * (rand() - 0.5) * 10,
                top    : -cardOverlapFactor * (index + 1) + rand() * verticleWiggleFactor,
            }}>
            {children}
        </Box>
    );
};