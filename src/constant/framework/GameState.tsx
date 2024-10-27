import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { GameState } from '../../type/framework/core/GameState';
import { TimerType } from '../../api/src/type';
import { SpecialId } from './SpecialId';


export const DefaultGameState : GameState = {
    previousHandDealerCardId : null,
    previousHandWinnerCardId : null,
    playerLookup             : {},
    gameStateDTO             : GameStateDTO.Default,
    cardDeck                 : {},
    gameId                   : SpecialId.DefaultGameId,

    timer : {
        timerType : TimerType.Inactive,
        timeLeft  : 0,
        gameId    : SpecialId.DefaultGameId,
    },
} as const;

