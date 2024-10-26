import { GamePopupType } from '../../api/src/constant/game-popup-type.enum';
import { CoreAppRoot } from '@app/type/framework/core/CoreAppRoot';
import { DefaultGameState } from './GameState';
import { SpecialId } from './SpecialId';


export const InitialState : CoreAppRoot = {

    selectedGameId : SpecialId.DefaultGameId,
    popupType      : GamePopupType.Closed,

    game : {
        [SpecialId.DefaultGameId] : DefaultGameState,
    },

} as const;
