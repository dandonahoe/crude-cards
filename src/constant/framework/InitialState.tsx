import { GamePopupType } from '../../api/src/constant/game-popup-type.enum';
import { CoreAppRoot } from '@app/type/framework/core/CoreAppRoot';
import { DefaultGameState } from './GameState';
import { SpecialId } from './SpecialId';


export const InitialState : CoreAppRoot = {

    selectedGameId : SpecialId.DefaultGameId,
    popupType      : GamePopupType.Closed,

    game : {
        [SpecialId.DefaultGameIdBeta ] : { ...DefaultGameState, gameId : SpecialId.DefaultGameIdBeta  },
        [SpecialId.DefaultGameIdAlpha] : { ...DefaultGameState, gameId : SpecialId.DefaultGameIdAlpha },
        [SpecialId.DefaultGameId     ] : { ...DefaultGameState, gameId : SpecialId.DefaultGameId      },
    },

} as const;
