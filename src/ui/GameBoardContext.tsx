import { GameStateDTO } from '../api/src/game/dtos/game-state.dto';
import { GameBoardContextType } from './type';
import { createContext } from 'react';


export const GameBoardContext = createContext<GameBoardContextType>({
    dealerDealtCard : null,
    playerDealtCard : null,
    currentPlayer   : null,
    headerHeight    : 0,
    gameStateDTO    : GameStateDTO.Default,
    playerCards     : [],
    dealerCards     : [],
    isDealer        : false,
});
