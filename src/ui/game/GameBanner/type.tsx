import { CardColor } from '../../../api/src/constant/card-color.enum';

export interface Props {
    subtitle ?: string;
    color     : CardColor;
    text      : string;
}
