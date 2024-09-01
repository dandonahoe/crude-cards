import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Logger } from 'winston';


@Injectable()
export class GameException extends WsException {

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly log: Logger;

    public constructor(
        public readonly message        : string,
        public readonly runtimeContext : string,
        public readonly debugBundle    : Record<string, unknown> = {},
    ) {
        super(message);

        debugger;

        if(runtimeContext) this.runtimeContext = runtimeContext;
        if(debugBundle   ) this.debugBundle    = debugBundle;
        if(message       ) this.message        = message;

        this.stack   = Error().stack;

        Object.setPrototypeOf(this, GameException.prototype);
    }
}
