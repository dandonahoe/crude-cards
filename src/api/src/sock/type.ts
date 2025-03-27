import { AuthToken, SocketID } from '../type';


export interface SocketRequest {
    authToken  : AuthToken;
    socketId   : SocketID;
}
