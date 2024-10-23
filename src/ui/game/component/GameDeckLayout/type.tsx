import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { CardDTO } from '../../../../api/src/game/dtos/card.dto';
import { ReactNode } from 'react';

export interface Props {

    verticleWiggleFactor ?: number;
    cardOverlapFactor    ?: number;
    wiggleFactor         ?: number;
    tiltFactor           ?: number;
    color                ?: CardColor;
    cards                 : ReactNode[];
    id                    : string;
}

export interface GameDeckCardProps {

    verticleWiggleFactor : number;
    cardOverlapFactor    : number;
    wiggleFactor         : number;
    tiltFactor           : number;
    index                : number;
    card                 : CardDTO;
}
