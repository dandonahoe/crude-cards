import { App } from '../../../AppContext';
import { useId } from '@mantine/hooks';
import { Box } from '@mantine/core';
import seedrandom from 'seedrandom';
import { RFC } from '../../../type';
import { useContext } from 'react';
import { Props } from './type';


export const GameWiggleBox : RFC<Props> = ({
    children, index,
    verticleWiggleFactor = 50,
    cardOverlapFactor    = 40,
    wiggleFactor         = 6,
    tiltFactor           = 8,
    id : wiggleBoxId,
}) => {

    const compId = useId();

    const wiggleSeed = `id(${wiggleBoxId})-ind(${index})-comp(${compId})`;

    const rand = seedrandom(wiggleSeed);

    const { isDebugging } = useContext(App);

    return (
        <Box
            style={{
                border : isDebugging ? '1px solid #f90' : undefined,
                rotate : `${rand() * tiltFactor - (tiltFactor / 2)}deg`,
                width  : '100%',
                left   : wiggleFactor * (rand() - 0.5) * 10,
                top    : -cardOverlapFactor * (index + 1) + rand() * verticleWiggleFactor,
            }}>
            {children}
        </Box>
    );
};
