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

export const GameAction = {
    sendWebSocketMessage : action<WebSocketMessage      >('SendWebSocketMessage'                       ),
    dealerPickBlackCard  : action<DealerPickBlackCardDTO>(WebSocketEventType.DealerPickBlackCard, false), // No Prefix to Match Server
    dealerPickWinner     : action<DealerPickWinnerDTO   >(WebSocketEventType.DealerPickWinner,    false), // No Prefix to Match Server
    playerSelectCard     : action<PlayerSelectCardDTO   >(WebSocketEventType.PlayerSelectCard,    false), // No Prefix to Match Server
    menuItemClicked      : action<MenuItemClickedDTO    >(WebSocketEventType.MenuItemClicked,     false), // No Prefix to Match Server
    updateGameState      : action<string                >('UpdateGameState'                            ),
    submitFeedback       : action<SubmitFeedbackDTO     >(WebSocketEventType.SubmitFeedback,      false), // No Prefix to Match Server
    updateUsername       : action<UpdateUsernameDTO     >(WebSocketEventType.UpdateUsername,      false), // No Prefix to Match Server
    resetGameState       : action<void                  >('ResetGameState'                             ),
    timerComplete        : action<TimerCompleteDTO      >('TimerComplete'                              ),
    updateTimer          : action<UpdateTimerDTO        >('UpdateTimer'                                ),
    closePopup           : action<void                  >('ClosePopup'                                 ),
    createGame           : action<CreateGameDTO         >(WebSocketEventType.CreateGame,          false), // No Prefix to Match Server
    updateGame           : action<void                  >(WebSocketEventType.UpdateGame,          false), // No Prefix to Match Server
    startGame            : action<StartGameDTO          >(WebSocketEventType.StartGame,           false), // No Prefix to Match Server
    leaveGame            : action<LeaveGameDTO          >(WebSocketEventType.LeaveGame,           false), // No Prefix to Match Server
    nextHand             : action<NextHandDTO           >(WebSocketEventType.NextHand,            false), // No Prefix to Match Server
    joinGame             : action<JoinGameDTO           >(WebSocketEventType.JoinGame,            false), // No Prefix to Match Server
    noOp                 : action<void                  >('NoOp'                                       ),
    logRelay             : action<LogRelayDTO           >(WebSocketEventType.LogRelay,            false), // No Prefix to Match Server
};
