import deepFreeze from 'deep-freeze-strict';


export enum WebSocketEventType {
    UpdatePlayerValidation = 'UpdatePlayerValidation',
    DealerPickBlackCard    = 'DealerPickBlackCard',
    DealerPickWinner       = 'DealerPickWinner',
    PlayerSelectCard       = 'PlayerSelectCard',
    MenuItemClicked        = 'MenuItemClicked',
    UpdateUsername         = 'UpdateUsername',
    SubmitFeedback         = 'SubmitFeedback',
    UpdateGame             = 'UpdateGame',
    CreateGame             = 'CreateGame',
    StartGame              = 'StartGame',
    NextHand               = 'NextHand',
    JoinGame               = 'JoinGame',
    ExitGame               = 'ExitGame',
}


deepFreeze(WebSocketEventType);
