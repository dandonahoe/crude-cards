import { DealerPickBlackCardDTO } from '../../api/src/game/dtos/dealer-pick-black-card.dto';
import { DealerPickWinnerDTO } from '../../api/src/game/dtos/dealer-pick-winner.dto';
import { PlayerSelectCardDTO } from '../../api/src/game/dtos/player-select-card.dto';
import { MenuItemClickedDTO } from '../../api/src/game/dtos/menu-item-clicked.dto';
import { SubmitFeedbackDTO } from '../../api/src/game/dtos/submit-feedback.dto';
import { UpdateUsernameDTO } from '../../api/src/game/dtos/update-username.dto';
import { TimerCompleteDTO } from '../../api/src/game/dtos/timer-complete.dto';
import { UpdateTimerDTO } from '../../api/src/game/dtos/update-timer.dto';
import { CreateGameDTO } from '../../api/src/game/dtos/create-game.dto';
import { StartGameDTO } from '../../api/src/game/dtos/start-game.dto';
import { NextHandDTO } from '../../api/src/game/dtos/next-hand.dto';
import { JoinGameDTO } from '../../api/src/game/dtos/join-game.dto';
import { ExitGameDTO } from '../../api/src/game/dtos/exit-game.dto';
import { action } from '../SharedAction';


// todo: move this
export interface WebSocketMessage {
    type : string;
    data : unknown;
}

export const GameAction = {
    sendWebSocketMessage : action<WebSocketMessage            >('SendWebSocketMessage'           ),
    updateGameState      : action<string                      >('UpdateGameState'                ),
    dealerPickBlackCard  : action<DealerPickBlackCardDTO>('DealerPickBlackCard'),
    dealerPickWinner     : action<DealerPickWinnerDTO   >('DealerPickWinner'   ),
    playerSelectCard     : action<PlayerSelectCardDTO   >('PlayerSelectCard'   ),
    menuItemClicked      : action<MenuItemClickedDTO    >('MenuItemClicked'    ),
    submitFeedback       : action<SubmitFeedbackDTO     >('SubmitFeedback'     ),
    updateUsername       : action<UpdateUsernameDTO     >('UpdateUsername'     ),
    timerComplete        : action<TimerCompleteDTO      >('TimerComplete'      ),
    updateTimer          : action<UpdateTimerDTO        >('UpdateTimer'        ),
    closePopup           : action<void                  >('ClosePopup'         ),
    createGame           : action<CreateGameDTO         >('CreateGame'         ),
    updateGame           : action<void                  >('UpdateGame'         ),
    startGame            : action<StartGameDTO          >('StartGame'          ),
    nextHand             : action<NextHandDTO           >('NextHand'           ),
    joinGame             : action<JoinGameDTO           >('JoinGame'           ),
    exitGame             : action<ExitGameDTO           >('ExitGame'           ),
    noOp                 : action<void           >('NoOp'           ),
};
