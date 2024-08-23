import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { PlayerDTO } from '../../api/src/game/dtos/player.dto';
import { CardDTO } from '../../api/src/game/dtos/card.dto';


export interface GameContextType {
    dealerDealtCard : CardDTO   | null;
    playerDealtCard : CardDTO   | null;
    currentPlayer   : PlayerDTO | null;
    headerHeight    : number;
    popupTypeId     : string    | null;
    playerCards     : CardDTO[];
    dealerCards     : CardDTO[];
    gameState       : GameStateDTO;
    isDealer        : boolean;
}

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
