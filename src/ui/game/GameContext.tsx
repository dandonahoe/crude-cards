import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { GameContextType } from './type';
import React from 'react';


export const GameContext = React.createContext<GameContextType>({
    dealerDealtCard : null,
    playerDealtCard : null,
    currentPlayer   : null,
    headerHeight    : 0,
    popupTypeId     : null,
    playerCards     : [],
    dealerCards     : [],
    gameState       : GameStateDTO.Default,
    isDealer        : false,
});
