import { CardColor } from '../../../api/src/constant/card-color.enum';
import { PlayerStatus } from '../type';


export interface Props {
    playerStatusList : PlayerStatus[];
    shouldShowScore  : boolean;
    shouldShowDone   : boolean;
    textColor       ?: CardColor;
    title           ?: string;
}
