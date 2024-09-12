import { PropsWithChildren } from 'react';


export enum GameTextType {
    Subtitle = 'Subtitle',
    Banner   = 'Banner',
    Title    = 'Title',
    Small    = 'Small',
    Neon     = 'Neon',
    Card     = 'Card',
}

// props with children
export type Props = PropsWithChildren<{
    type : GameTextType;
}>;
