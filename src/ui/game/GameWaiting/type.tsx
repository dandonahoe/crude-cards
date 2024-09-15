import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { PlayerStatus } from '../type';


export interface GameStatusTableProps {
    playerStatusList : PlayerStatus[];
    shouldShowScore  : boolean;
    shouldShowDone   : boolean;
    title            : string;
}

export interface GameCardProps {
    children : React.ReactNode;
    color    : string;
}

export interface DeckRendererProps {
    playerDealtCard ?: CardDTO;
    dealerDealtCard  : CardDTO;
    isDealer         : boolean;
}

export interface StatusTableRendererProps {
    playersExceptDealer : PlayerStatus[];
    gameStage           : GameStage;
}
