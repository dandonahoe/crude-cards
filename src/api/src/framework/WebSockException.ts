import { WsException } from '@nestjs/websockets';


/**
 * Custom WebSocket exception class that extends the base WsException.
 */
export class WebSockException extends WsException {
    /**
     * Creates an instance of WebSockException.
     * @param message - The error message.
     * @param debugInfo - Additional debug information (optional).
     */
    public constructor(
        public override readonly message: string,
        public readonly debugInfo: Record<string, unknown> = {},
    ) {
        super(message);
        console.log('WebSockException::', { message, debugInfo });
    }

    /**
     * Retrieves the debug information.
     * @returns An object containing the debug information.
     */
    public getDebugInfo = (): Record<string, unknown> => this.debugInfo;
}
