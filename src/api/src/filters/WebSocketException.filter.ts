import { ArgumentsHost, Catch, ExceptionFilter, Inject, Injectable } from '@nestjs/common';
import { WebSocketException } from '../exceptions/WebSocket.exception';
import { WebSocketEventType } from '../constant/websocket-event.enum';
import { GameException } from '../exceptions/Game.exception';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Socket } from 'socket.io';
import { Logger } from 'winston';


@Catch(WebSocketException)
@Injectable()
export class WebSocketExceptionFilter implements ExceptionFilter {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
    ) {
        this.log.silly('WebSocketExceptionFilter::constructor');
    }

    public catch = (exception: GameException, host: ArgumentsHost) => {
        debugger;

        const ctx = host.switchToWs();

        const socket = ctx.getClient() as Socket;
        const data   = ctx.getData(); // TODO: check, no data i think

        const status = '200';

        this.log.error('WebSocketExceptionFilter::catch', { socketId : socket.id, status, exception });
        this.log.silly('WebSocketExceptionFilter::catch::data', { data });

        socket.emit(WebSocketEventType.ServerError, {
            statusCode : status,
            timestamp  : new Date().toISOString(),
            message    : exception.message,
            path       : data.url || data.event, // TODO: CHeck data format
        });
    }
}
