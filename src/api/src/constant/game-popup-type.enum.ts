import deepFreeze from 'deep-freeze-strict';


export enum GamePopupType {
    Scoreboard = 'Scoreboard',
    Settings   = 'Settings',
    Feedback   = 'Feedback',
    Unknown    = 'Unknown',
    Leave      = 'Leave',
}

deepFreeze(GamePopupType);
