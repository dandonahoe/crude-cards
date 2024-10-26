import { GameStateDTO } from '../../../api/src/game/dtos/game-state.dto';
import { PlayerDTO } from '../../../api/src/game/dtos/player.dto';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { TimerState } from '../TimerState';


export type GameStateFrontEndDTO = Omit<GameStateDTO, 'player_list' | 'current_player'>;

export interface GameState  {

    gameId : string;

    previousHandDealerCardId : string | null;
    previousHandWinnerCardId : string | null;

    gameStateDTO : GameStateFrontEndDTO;

    playerLookup : { [key : string] : PlayerDTO };
    cardDeck     : { [key : string] : CardDTO   };

    timer : TimerState;
}
