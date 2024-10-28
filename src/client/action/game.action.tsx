import { DealerPickBlackCardDTO } from '../../api/src/game/dtos/dealer-pick-black-card.dto';
import { DealerPickWinnerDTO } from '../../api/src/game/dtos/dealer-pick-winner.dto';
import { PlayerSelectCardDTO } from '../../api/src/game/dtos/player-select-card.dto';
import { MenuItemClickedDTO } from '../../api/src/game/dtos/menu-item-clicked.dto';
import { WebSocketEventType } from '../../api/src/constant/websocket-event.enum';
import { SubmitFeedbackDTO } from '../../api/src/game/dtos/submit-feedback.dto';
import { UpdateUsernameDTO } from '../../api/src/game/dtos/update-username.dto';
import { TimerCompleteDTO } from '../../api/src/game/dtos/timer-complete.dto';
import { UpdateTimerDTO } from '../../api/src/game/dtos/update-timer.dto';
import { CreateGameDTO } from '../../api/src/game/dtos/create-game.dto';
import { StartGameDTO } from '../../api/src/game/dtos/start-game.dto';
import { LeaveGameDTO } from '../../api/src/game/dtos/leave-game.dto';
import { NextHandDTO } from '../../api/src/game/dtos/next-hand.dto';
import { JoinGameDTO } from '../../api/src/game/dtos/join-game.dto';
import { LogRelayDTO } from '../../api/src/game/dtos/log-relay.dto';
import { action } from '../SharedAction';


// todo: move this
export interface WebSocketMessage {
    type : string;
    data : unknown;
}

export interface UpdateGameStateDTO {
    gameStateString : string;
    gameId          : string;
}

export const GameAction = {

    // Socket Actions
    webDealerPickBlackCard : action<DealerPickBlackCardDTO>(WebSocketEventType.DealerPickBlackCard, false),
    webDealerPickWinner    : action<DealerPickWinnerDTO   >(WebSocketEventType.DealerPickWinner,    false),
    webPlayerSelectCard    : action<PlayerSelectCardDTO   >(WebSocketEventType.PlayerSelectCard,    false),

    webSubmitFeedback : action<SubmitFeedbackDTO     >(WebSocketEventType.SubmitFeedback,      false),
    webUpdateUsername : action<UpdateUsernameDTO     >(WebSocketEventType.UpdateUsername,      false),
    webCreateGame     : action<CreateGameDTO         >(WebSocketEventType.CreateGame,          false),
    webUpdateGame     : action<void                  >(WebSocketEventType.UpdateGame,          false),
    webStartGame      : action<StartGameDTO          >(WebSocketEventType.StartGame,           false),
    webLeaveGame      : action<LeaveGameDTO          >(WebSocketEventType.LeaveGame,           false),
    webNextHand       : action<NextHandDTO           >(WebSocketEventType.NextHand,            false),
    webJoinGame       : action<JoinGameDTO           >(WebSocketEventType.JoinGame,            false),
    webLogRelay       : action<LogRelayDTO           >(WebSocketEventType.LogRelay,            false),

    // ehh???
    menuItemClicked : action<MenuItemClickedDTO>(WebSocketEventType.MenuItemClicked,     false),

    // Regular Actions
    sendWebSocketMessage : action<WebSocketMessage  >('SendWebSocketMessage'),
    updateGameState      : action<UpdateGameStateDTO>('UpdateGameState'     ),
    resetGameState       : action<string            >('ResetGameState'      ),
    timerComplete        : action<TimerCompleteDTO  >('TimerComplete'       ),
    updateTimer          : action<UpdateTimerDTO    >('UpdateTimer'         ),
    closePopup           : action<void              >('ClosePopup'          ),
    noOp                 : action<void              >('NoOp'                ),
};

