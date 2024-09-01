// WebSockSuccess

// for reference

import { WsException } from '@nestjs/websockets';


// export class WebSockException extends WsException {
//     /**
//      * Creates an instance of WebSockException.
//      * @param message - The error message.
//      * @param debugInfo - Additional debug information (optional).
//      */
//     public constructor(
//         public override readonly message: string,
//         public readonly debugInfo: Record<string, unknown> = {},
//     ) {
//         super(message);
//         console.log('WebSockException::', { message, debugInfo });
//     }

//     /**
//      * Retrieves the debug information.
//      * @returns An object containing the debug information.
//      */
//     public getDebugInfo = (): Record<string, unknown> => this.debugInfo;
// }

export class WebSockSuccess extends WsException {
    public constructor(
        public override readonly message: string,
        public readonly debugInfo: Record<string, unknown> = {},
    ) {
        super(message);
        console.log('WebSockException::', { message, debugInfo });
    }

    public getDebugInfo = (): Record<string, unknown> => this.debugInfo;
}
