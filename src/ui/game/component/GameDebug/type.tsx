import { GameStateFrontEndDTO } from '../../../../type/framework/core/GameState';
import { PlayerDTO } from '../../../../api/src/game/dtos/player.dto';
import { CardDTO } from '../../../../api/src/game/dtos/card.dto';
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
    gameStateDTO     : GameStateFrontEndDTO;
    isDealer         : boolean;
    isHost           : boolean;
}
