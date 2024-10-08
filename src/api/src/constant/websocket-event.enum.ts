import deepFreeze from 'deep-freeze-strict';


export enum WebSocketEventType {
    UpdatePlayerValidation = 'UpdatePlayerValidation',
    DealerPickBlackCard    = 'DealerPickBlackCard',
    DealerPickWinner       = 'DealerPickWinner',
    PlayerSelectCard       = 'PlayerSelectCard',
    MenuItemClicked        = 'MenuItemClicked',
    UpdateUsername         = 'UpdateUsername',
    SubmitFeedback         = 'SubmitFeedback',
    Disconnected           = 'Disconnected',
    ServerError            = 'ServerError',
    UpdateGame             = 'UpdateGame',
    CreateGame             = 'CreateGame',
    StartGame              = 'StartGame',
    LeaveGame              = 'LeaveGame',
    NextHand               = 'NextHand',
    JoinGame               = 'JoinGame',
    LogRelay               = 'LogRelay',
}


deepFreeze(WebSocketEventType);
