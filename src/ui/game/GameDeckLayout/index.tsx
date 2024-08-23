import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameWiggleBox } from '../GameWiggleBox';
import { Box } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameDeckLayout : RFC<Props> = ({
    cards,

    color = CardColor.White,

    verticleWiggleFactor = 50,
    cardOverlapFactor    = 40,
    wiggleFactor         = 6,
    tiltFactor           = 8,
}) => {

    const col = color === CardColor.Black ? '#000' : '#fff';

    return (
        <Box

            style={{
                backgroundColor : col,
            }}>
            {cards.map((card, index) => !card
                ? null
                : (
                    <GameWiggleBox
                        verticleWiggleFactor={verticleWiggleFactor}
                        cardOverlapFactor={cardOverlapFactor}
                        wiggleFactor={wiggleFactor}
                        tiltFactor={tiltFactor}
                        index={index}
                        key={index}>
                        {card}
                    </GameWiggleBox>
                ),
            )}
        </Box>
    );
}
