import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { PlayerStatus } from '../type';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';


export interface GameStatusTableProps {
    playerStatusList : PlayerStatus[];
    shouldShowScore  : boolean;
    shouldShowDone   : boolean;
    title            : string;
}

export interface GameCardContainerProps {
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
