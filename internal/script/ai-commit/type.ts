export type Player = {
    score : number;
    name  : string;
    id    : string;
};

export type Game = {
    currentTurn : number;
    players     : Player[];
    state       : GameState;
    id          : string;
};

export type GameState = 'active' | 'finished';

export type Turn = {
    playerId : string;
    action   : string;
};
