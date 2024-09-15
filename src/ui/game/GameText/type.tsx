import { CardColor } from '../../../api/src/constant/card-color.enum';
import { PropsWithChildren } from 'react';


export enum GameTextType {
    Subtitle = 'Subtitle',
    Default  = 'Default',
    Banner   = 'Banner',
    Medium   = 'Medium',
    Title    = 'Title',
    Small    = 'Small',
    Neon     = 'Neon',
    Card     = 'Card',
}

// props with children
export type Props = PropsWithChildren<{
    color ?: CardColor;
    type  ?: GameTextType;
    size  ?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    ta    ?: 'left' | 'center' | 'right';
}>;

type GameTextCustomProps = Omit<Props, 'type'>;

export type GameTextSubtitleProps = GameTextCustomProps;
export type GameTextBannerProps   = GameTextCustomProps;
export type GameTextTitleProps    = GameTextCustomProps;
export type GameTextSmallProps    = GameTextCustomProps;
export type GameTextCardProps     = GameTextCustomProps;
