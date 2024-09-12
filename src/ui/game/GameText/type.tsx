import { PropsWithChildren } from 'react';


export enum GameTextType {
    Subtitle = 'Subtitle',
    Title    = 'Title',
}

// props with children
export type Props = PropsWithChildren<{
    type : GameTextType;
}>;
