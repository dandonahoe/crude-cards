import { GameWiggleBox } from '../GameWiggleBox';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameDeckLayout: RFC<Props> = ({
    verticleWiggleFactor = 50,
    cardOverlapFactor    = 40,
    wiggleFactor         = 6,
    tiltFactor           = 8,
    cards,
}) => cards.map((card, index) =>
    <GameWiggleBox
        verticleWiggleFactor={verticleWiggleFactor}
        cardOverlapFactor={cardOverlapFactor}
        wiggleFactor={wiggleFactor}
        tiltFactor={tiltFactor}
        key={`card-${index}`}
        index={index}>
        {card}
    </GameWiggleBox>)
