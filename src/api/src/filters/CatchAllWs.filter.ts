import { Catch, ArgumentsHost, Injectable, Inject } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { P } from '../../../type/framework/data/P';
import { Socket } from 'socket.io';
import { Logger } from 'winston';


/**
 * Catches and logs all exceptions that occur during WebSocket communication.
 */
@Catch(WsException)
@Injectable()
export class CatchAllWsFilter extends BaseWsExceptionFilter {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
    ) {
        super();

        this.log.silly('CatchAllFilter::constructor');
    }

    /**
     * Catches and logs all exceptions that occur during WebSocket communication.
     *
     * @param exception - The exception to be handled.
     * @param host - The context of the current request.
     */
    public override catch = async (
        exception: unknown, host: ArgumentsHost,
    ) : P => {

        const context = host.switchToWs()

        const socket = context.getClient<Socket>();

        const stack = (exception as Error).stack;

        this.log.error(
            `WebSocket Filtered Exception: ${JSON.stringify(exception)}`, {
            socketId : socket.id,
            exception,
            stack,
        });
    }
}
