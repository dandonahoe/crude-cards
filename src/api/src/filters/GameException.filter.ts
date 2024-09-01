import { ArgumentsHost, Catch, ExceptionFilter, Inject, Injectable } from '@nestjs/common';
import { GameException } from '../exceptions/Game.exception';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GameService } from '../game/game.service';
import { P } from '../../../type/framework/data/P';
import { Socket } from 'socket.io';
import { Logger } from 'winston';


@Catch(GameException)
@Injectable()
export class GameExceptionFilter implements ExceptionFilter {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        @Inject()
        private readonly gameService: GameService,
    ) {
        this.log.silly('GameExceptionFilter::constructor');
    }

    public catch = async (exception: GameException, host: ArgumentsHost) : P<unknown> => {
        debugger;

        const ctx = host.switchToWs();

        const socket = ctx.getClient() as Socket;
        const data   = ctx.getData(); // TODO: check, no data i think

        return this.gameService.emitGameUpdate(socket, data.game_code, false, [], 'In the GameExceptionFilter');

        // const status = '200';

        // this.log.error('GameExceptionFilter::catch', { socketId : socket.id, status, exception });
        // this.log.silly('GameExceptionFilter::catch::data', { data });

        // socket.emit(WebSocketEventType.ServerError, {
        //     statusCode : status,
        //     timestamp  : new Date().toISOString(),
        //     message    : exception.message,
        //     path       : data.url || data.event, // TODO: CHeck data format
        // });
    }
}
