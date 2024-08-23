import { ReactNode } from 'react';
import { CardColor } from '../../../api/src/constant/card-color.enum';

export interface Props {
    verticleWiggleFactor ?: number;
    cardOverlapFactor    ?: number;
    wiggleFactor         ?: number;
    tiltFactor           ?: number;

    color : CardColor;
    cards : ReactNode[];
}
