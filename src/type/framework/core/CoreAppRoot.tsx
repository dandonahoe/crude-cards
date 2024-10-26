import { GamePopupType } from '../../../api/src/constant/game-popup-type.enum';
import { GameState } from './GameState';


export interface CoreAppRoot {
    selectedGameId : string;
    popupType      : GamePopupType;

    game : {
        [key : string] : GameState,
    }
}
