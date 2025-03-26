import { GamePopupType } from '../../api/src/constant/game-popup-type.enum';
import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { PlayerDTO } from '../../api/src/game/dtos/player.dto';
import { CardDTO } from '../../api/src/game/dtos/card.dto'

export type OnClickCard = (id : string, card ?: CardDTO) => unknown;

export interface GameContextType {
    dealerDealtCard : CardDTO   | null;
    playerDealtCard : CardDTO   | null;
    currentPlayer   : PlayerDTO | null;
    headerHeight    : number;
    playerCards     : CardDTO[];
    dealerCards     : CardDTO[];
    popupType       : GamePopupType | null;
    gameState       : GameStateDTO;
    isDealer        : boolean;
}

export enum BrowserTheme {
    BlueSteel = 'BlueSteel', // zoolander
    JazzHands = 'JazzHands', // proper
    Default   = 'Default',   // Parody (CAH)
};

export interface PlayerStatus {
    isWinner : boolean;
    player   : PlayerDTO;
    isDone   : boolean;
    score    : number;
}

export class ToastConfig {
    public isVisible : boolean = false;
    public text      : string = '';
}

export enum GameCardType {
    Children,
    Centered,
    Unknown,
    Stack,
    Html,
    Raw,
}
