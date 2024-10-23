import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';
import { CoreAppRoot } from '@app/type/framework/core/CoreAppRoot';

const {
    player_list : _player_list,
    ...gameState
} = GameStateDTO.Default;


export const InitialState : CoreAppRoot = {

    // todo: Have different apps init different stores, this is dumb
    game : {
        previousHandDealerCardId : null,
        previousHandWinnerCardId : null,

        popupType : null,

        playerLookup : {},
        cardDeck     : {},

        timer : {
            timerType : null,
            timeLeft  : 0,
        },

        gameState,
    },
} as const;

