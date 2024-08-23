import deepFreeze from 'deep-freeze-strict';


export enum PlayerType {
    Unknown = 'unknown',
    Visitor = 'visitor',
    Player  = 'player',
}


deepFreeze(PlayerType);
