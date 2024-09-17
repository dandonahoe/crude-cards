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


export interface ChatCompletionParams {
    temperature: number;
    max_tokens: number;
    messages: { role: string; content: string }[];
    model: string;
}

export interface ChatCompletionResponse {
    choices: { message: { content: string | null } }[];
}
