import { GameCode, AuthToken, SocketID } from '../type';


export interface SocketRequest {
    authToken  : AuthToken;
    gameCode   : GameCode;
    socketId   : SocketID;
}
