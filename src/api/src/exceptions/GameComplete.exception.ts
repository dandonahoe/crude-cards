import { GameException } from "./Game.exception";


export class GameCompleteException extends GameException {

        public constructor(
            public readonly message        : string,
            public readonly runtimeContext : string,
            public readonly debugBundle    : Record<string, unknown> = {},
        ) {
            super(message, runtimeContext, debugBundle);

            Object.setPrototypeOf(this, GameCompleteException.prototype);
        }
    }

