import { CardColor } from '../../../api/src/constant/card-color.enum';
import { getBackgroundColor } from './styleUtils';
import { GameWiggleBox } from '../GameWiggleBox';
import { Box } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameDeckLayout: RFC<Props> = ({
    cards,
    color = CardColor.White,
    verticleWiggleFactor = 50,
    cardOverlapFactor    = 40,
    wiggleFactor         = 6,
    tiltFactor           = 8,
}) => {
    const backgroundColor = getBackgroundColor(color);

    return (
        <Box style={{ backgroundColor }}>
            {cards.map((card, index) =>
                <GameWiggleBox
                    verticleWiggleFactor={verticleWiggleFactor}
                    cardOverlapFactor={cardOverlapFactor}
                    wiggleFactor={wiggleFactor}
                    tiltFactor={tiltFactor}
                    key={`card-${index}`}
                    index={index}>
                    {card}
                </GameWiggleBox>,
            )}
        </Box>
    );
};
