import { WebSocketEventType } from '../../api/src/constant/websocket-event.enum';
import { Socket } from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { GameStateDTO } from '../../api/src/game/dtos/game-state.dto';


// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
export function createSocketChannel(socket : Socket) {
    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel(emit => {

        socket.on(WebSocketEventType.UpdateGame,
            (gameState : GameStateDTO) =>
                emit(gameState),
        );

        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {
            socket.off(WebSocketEventType.UpdateGame);
        }

        return unsubscribe
    })
}
