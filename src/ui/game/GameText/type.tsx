import { PropsWithChildren } from 'react';


export enum GameTextType {
    Subtitle = 'Subtitle',
    Banner   = 'Banner',
    Title    = 'Title',
    Small    = 'Small',
}

// props with children
export type Props = PropsWithChildren<{
    type : GameTextType;
}>;
