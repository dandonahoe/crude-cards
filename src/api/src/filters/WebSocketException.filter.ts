import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from '@nestjs/common';
import { WebSocketException } from '../exceptions/WebSocket.exception';
import { WebSocketEventType } from '../constant/websocket-event.enum';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Socket } from 'socket.io';
import { Logger } from 'winston';

@Catch(WebSocketException)
export class WebSocketExceptionFilter implements ExceptionFilter {

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly log: Logger;

    public catch(exception: HttpException, host: ArgumentsHost) {

        debugger;

        const ctx = host.switchToWs();

        const socket = ctx.getClient() as Socket;
        const data   = ctx.getData(); // TODO: check, no data i think

        const status = exception.getStatus();

        this.log.error('WebSocketExceptionFilter::catch', { socketId : socket.id, status, exception });
        this.log.silly('WebSocketExceptionFilter::catch::data', { data });

        socket.emit(WebSocketEventType.ServerError, {
            statusCode : status,
            timestamp  : new Date().toISOString(),
            message    : exception.message,

            // TODO: CHeck data format
            path : data.url || data.event,

        });
    }
}
