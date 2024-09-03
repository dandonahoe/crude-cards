import { WsException } from '@nestjs/websockets';
import { Logger } from 'winston';


export class GameException extends WsException {

    public constructor(
        public override readonly message : string,
        public readonly runtimeContext   : string,
        public readonly debugBundle      : Record<string, unknown> = {},
        public readonly log              : Logger,
    ) {
        super(message);

        if(runtimeContext) this.runtimeContext = runtimeContext;
        if(debugBundle   ) this.debugBundle    = debugBundle;
        if(message       ) this.message        = message;

        this.stack = new Error().stack;

        Object.setPrototypeOf(this, GameException.prototype);
    }
}
