import { GameWiggleBox } from '../GameWiggleBox';
import { RFC } from '@app/ui/type';
import { Props } from './type';

const scale = 1.5;

export const GameDeckLayout: RFC<Props> = ({
    verticleWiggleFactor = 50 * scale,
    cardOverlapFactor    = 40 * scale,
    wiggleFactor         = 6  * scale,
    tiltFactor           = 8  * scale,
    cards,
    id,
}) => cards.map((card, index) =>
    <GameWiggleBox
        verticleWiggleFactor={verticleWiggleFactor}
        cardOverlapFactor={cardOverlapFactor}
        wiggleFactor={wiggleFactor}
        tiltFactor={tiltFactor}
        id={`${id}-${index}`}
        key={`card-${id}-${index}`}
        index={index}>
        {card}
    </GameWiggleBox>)
