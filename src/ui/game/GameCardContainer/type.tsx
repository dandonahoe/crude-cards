import { CardColor } from '../../../api/src/constant/card-color.enum';
import { PropsWithChildren } from 'react';

export interface GameCardContainerProps extends PropsWithChildren {
    isClickable ?: boolean;
    onClick     ?: () => void;
    color        : CardColor;
}

export interface CardStylesProps {
    color: CardColor;
    isHovered: boolean;
    isClickable: boolean;
}
