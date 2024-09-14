import { GameStateDTO } from '../../../api/src/game/dtos/game-state.dto';
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { ReactNode } from 'react';


export interface Props {
    isVisible: boolean;
}

export interface DebugTableRowProps {

    fontSize ?: string;
    label     : string;
    value     : ReactNode;
}


export interface GameDebugTabsProps {

    dealerDealtCard ?: CardDTO | null;
    playerDealtCard ?: CardDTO | null;
    currentPlayer    : PlayerDTO | null;
    authToken        : string | null;
    gameState        : GameStateDTO;
    isDealer         : boolean;
    isHost           : boolean;
}
