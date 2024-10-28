import { GamePopupType } from '../../api/src/constant/game-popup-type.enum';
import { CoreAppRoot } from '@app/type/framework/core/CoreAppRoot';
import { DefaultGameState } from './GameState';
import { SpecialId } from './SpecialId';


export const InitialState : CoreAppRoot = {

    selectedGameId : SpecialId.DefaultGameCode,
    popupType      : GamePopupType.Closed,

    game : {
        [SpecialId.DefaultGameCodeBeta ] : { ...DefaultGameState, gameId : SpecialId.DefaultGameCodeBeta  },
        [SpecialId.DefaultGameCodeAlpha] : { ...DefaultGameState, gameId : SpecialId.DefaultGameCodeAlpha },
        [SpecialId.DefaultGameCode     ] : { ...DefaultGameState, gameId : SpecialId.DefaultGameCode      },
    },

} as const;
