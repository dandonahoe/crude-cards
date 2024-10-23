import { PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
    verticleWiggleFactor ?: number;
    cardOverlapFactor    ?: number;
    wiggleFactor         ?: number;
    tiltFactor           ?: number;
    index                 : number;
    id                   ?: string;
}>;
