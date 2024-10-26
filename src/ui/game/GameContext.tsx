import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { GameContextType } from './type';
import { createContext } from 'react';
import { GamePopupType } from '../../api/src/constant/game-popup-type.enum';


export const GameContext = createContext<GameContextType>({
    dealerDealtCard : null,
    playerDealtCard : null,
    currentPlayer   : null,
    headerHeight    : 0,
    playerCards     : [],
    dealerCards     : [],
    popupType       : GamePopupType.Closed,
    gameState       : GameStateDTO.Default,
    isDealer        : false,
});
