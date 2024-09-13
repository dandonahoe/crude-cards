import { GamePopupType } from '../../../api/src/constant/game-popup-type.enum';
import { GameStateDTO } from '../../../api/src/game/dtos/game-state.dto';
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { TimerType } from '../../../api/src/type';


export interface CoreAppRoot {
    game : {
        previousHandDealerCardId : string | null;
        previousHandWinnerCardId : string | null;

        popupType : GamePopupType | null;
        gameState : Omit<GameStateDTO, 'player_list' | 'current_player'>;

        playerLookup : { [key : string] : PlayerDTO }
        cardDeck     : { [key : string] : CardDTO   };

        timer : {
            timerType : TimerType | null;
            timeLeft  : number;
        };
    }
}
