
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { PropsWithChildren } from 'react';


export type Props = PropsWithChildren<{
    isClickable ?: boolean;
    onClick     ?: () => void;
    color        : CardColor;
}>;
