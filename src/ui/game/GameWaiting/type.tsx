import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { PlayerStatus } from '../type';


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
    playerDealtCard ?: Card;
    dealerDealtCard  : Card;
    isDealer         : boolean;
}

export interface StatusTableRendererProps {
    playersExceptDealer : PlayerStatus[];
    gameStage           : GameStage;
}

export interface Card {
    text : string;
    id   : string;
}
