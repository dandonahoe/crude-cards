import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { GameContextType } from './type';
import { createContext } from 'react';


export const GameContext = createContext<GameContextType>({
    dealerDealtCard : null,
    playerDealtCard : null,
    currentPlayer   : null,
    headerHeight    : 0,
    playerCards     : [],
    dealerCards     : [],
    popupType       : null,
    gameState       : GameStateDTO.Default,
    isDealer        : false,
});
