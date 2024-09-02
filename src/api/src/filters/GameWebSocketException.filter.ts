import { ArgumentsHost, Catch, Inject, Injectable } from '@nestjs/common';
import { WebSocketException } from '../exceptions/WebSocket.exception';
import { WebSocketEventType } from '../constant/websocket-event.enum';
import { GameException } from '../exceptions/Game.exception';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { BaseExceptionFilter } from '@nestjs/core';
import { P } from '../../../type/framework/data/P';
import { Socket } from 'socket.io';
import { Logger } from 'winston';


@Catch(WebSocketException)
@Injectable()
export class GameWebSocketExceptionFilter extends BaseExceptionFilter {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
    ) {
        super();

        this.log.silly('GameWebSocketExceptionFilter::constructor');
    }

    public override catch = async (
        exception: GameException, host: ArgumentsHost,
    ) : P => {

        const ctx = host.switchToWs();

        const socket = ctx.getClient() as Socket;
        const data   = ctx.getData(); // TODO: check, no data i think

        this.log.error('WebSocketExceptionFilter::catch', { socketId : socket.id, exception });
        this.log.silly('WebSocketExceptionFilter::catch::data', { data });

        socket.emit(WebSocketEventType.ServerError, {
            timestamp : new Date().toISOString(),
            message   : exception.message,
            path      : data.url || data.event, // TODO: CHeck data format
        });
    }
}
