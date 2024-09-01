import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Logger } from 'winston';


@Injectable()
export class WebSocketEmitGame extends WsException {

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly log: Logger;

    public constructor(
        public readonly message : string,
    ) {
        super(message);

        debugger;

        this.message = message;
        this.stack   = Error().stack;

        Object.setPrototypeOf(this, WebSocketEmitGame.prototype);
    }
}
