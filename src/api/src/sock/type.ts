export type AuthToken = string | null;
export type SocketID  = string | null;
export type GameCode  = string | null;


export interface SocketRequest {
    requestUrl : string;
    authToken  : AuthToken;
    gameCode   : GameCode;
    socketId   : SocketID;
}
