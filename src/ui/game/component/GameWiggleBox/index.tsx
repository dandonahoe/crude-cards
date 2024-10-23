import { App } from '../../../AppContext';
import { Box } from '@mantine/core';
import seedrandom from 'seedrandom';
import { RFC } from '../../../type';
import { useContext } from 'react';
import { Props } from './type';
// import { GameText } from '../GameText';


export const GameWiggleBox : RFC<Props> = ({
    children, index,

    verticleWiggleFactor = 50,
    cardOverlapFactor    = 40,
    wiggleFactor         = 6,
    tiltFactor           = 8,
    id : wiggleBoxId,
}) => {

    const wiggleSeed = `id(${wiggleBoxId})-ind(${index})`;

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
            {/* <GameText>
                {`WB(${wiggleBoxId})`}
            </GameText> */}
            {/* <GameDebugCard
                wiggleBoxId={wiggleBoxId}
                wiggleSeed={wiggleSeed} /> */}
            {children}
        </Box>
    );
};
