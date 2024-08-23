/**
 * AuthGuard for WebSocket Connections
 *
 * Description:
 * The AuthGuard is responsible for validating WebSocket connections and ensuring
 * the user meets the necessary requirements to access the endpoint. The guard supports
 * checking for the correct context type (WebSocket) and logs relevant connection details.
 *
 * Usage:
 * - Use with WebSocket subscription endpoints to restrict access based on PlayerType.
 * - Apply with `@UseGuards(AuthGuard)` decorator.
 */


import { CanActivate, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { P } from '../../../type/framework/data/P';
import { Socket } from 'socket.io';
import { Logger } from 'winston';


/**
 * Guard to handle WebSocket authentication and connection validation.
 */
@Injectable()
export class AuthGuard implements CanActivate {

    /**
     * Constructor for AuthGuard.
     * @param log - Logger instance for detailed logging.
     */
    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
    ) {}

    /**
     * Determines if a WebSocket connection can be activated.
     * @param context - The execution context of the WebSocket connection.
     * @returns `true` if the context is valid and the connection is allowed, otherwise `false`.
     */
    public canActivate = async (context: ExecutionContext): P<boolean> => {
        this.log.silly('AuthGuard: Entering canActivate');

        if (context.getType() !== 'ws') {
            this.log.warn('AuthGuard: Incorrect context type, expected "ws"');

            return false;
        }

        try {
            const { wsPattern, wsSocket, wsData } = await this.extractWebSocketContext(context);

            this.log.info('AuthGuard: Connection Details', {
                wsPattern, wsData, socketId : wsSocket.id,
            });

            return this.validateConnection(wsSocket);
        } catch (error) {
            this.log.error('AuthGuard: Error during WebSocket authentication', { error });

            throw error;
        }
    }

    /**
     * Extracts and logs essential details from the WebSocket context.
     * @param context - The execution context of the WebSocket connection.
     * @returns Extracted WebSocket pattern, socket, and data.
     */
    private extractWebSocketContext = async (context: ExecutionContext): P<{
        wsPattern: string, wsSocket: Socket, wsData: string
    }> => {
        const wsPattern = context.switchToWs().getPattern();
        const wsSocket  = context.switchToWs().getClient();
        const wsData    = context.switchToWs().getData();

        if (!wsSocket || !wsSocket.id) {
            this.log.warn('AuthGuard: Invalid WebSocket client or missing socket ID');
            throw new Error('Invalid WebSocket client or missing socket ID');
        }

        this.log.debug('AuthGuard: WebSocket Context Extracted', {
            socketId : wsSocket.id, wsPattern, wsData,
        });

        return {
            wsPattern, wsSocket, wsData,
        };
    }

    /**
     * Validates the WebSocket connection based on specific rules.
     * @param wsSocket - The WebSocket client socket.
     * @returns `true` if the connection is valid, otherwise `false`.
     */
    private validateConnection = async (wsSocket: Socket): P<boolean>  =>{

        this.log.debug('TODO: Add AUth logic', { socketID : wsSocket.id });

        return true;
    }
}
