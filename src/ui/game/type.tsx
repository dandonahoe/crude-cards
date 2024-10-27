import { GameStateFrontEndDTO } from '../../type/framework/core/GameState';
import { PlayerDTO } from '../../api/src/game/dtos/player.dto';
import { CardDTO } from '../../api/src/game/dtos/card.dto'

export type OnClickCard = (id : string, card ?: CardDTO) => unknown;

export interface GameBoardContextType {
    dealerDealtCard : CardDTO   | null;
    playerDealtCard : CardDTO   | null;
    currentPlayer   : PlayerDTO | null;
    headerHeight    : number;
    gameStateDTO    : GameStateFrontEndDTO;
    playerCards     : CardDTO[];
    dealerCards     : CardDTO[];
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
