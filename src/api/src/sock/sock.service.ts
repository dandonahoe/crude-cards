import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Inject, Injectable } from "@nestjs/common";
import { P } from '../../../type/framework/data/P';
import { SocketRequest } from './type';
import { AuthToken, CookieType, SocketID } from '../type';
import { Socket } from "socket.io";
import { Logger } from "winston";


@Injectable()
export class SockService {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
    ) {}

    public getRequestInfoFromSocket = async (
        socket : Socket,
    ) : P<SocketRequest> => {

        this.log.silly('SockService::getRequestInfoFromSocket');


        const authToken : AuthToken = socket.handshake.auth[CookieType.AuthToken] ?? null;
        const socketId  : SocketID = socket.id;

        // todo: get the game code form the url

        const socketRequest : SocketRequest = {
            socketId, authToken, gameCode : 'todo',
        };

        this.log.silly('SockService::getRequestInfoFromSocket:response', socketRequest);

        return socketRequest;
    }
}
