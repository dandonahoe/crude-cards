import { Injectable } from "@nestjs/common";
import { GameException } from "./Game.exception";

import { Logger } from "winston";


@Injectable()
export class GameTooFewPlayersException extends GameException {
    public constructor(
        public override readonly message : string,
        public override readonly runtimeContext   : string,
        public override readonly debugBundle      : Record<string, unknown> = {},
        public readonly log: Logger,
    ) {
        super(message, runtimeContext, debugBundle, log);
    }
}

