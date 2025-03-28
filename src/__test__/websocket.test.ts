/* eslint-disable jest/no-done-callback */

import { io as ioc, Socket as ClientSocket } from 'socket.io-client';

describe('my awesome project', () => {

    let clientSocket: ClientSocket;

    beforeAll(done => {

        // const wsHost = Env.getValue<string>('NEXT_PUBLIC_WS_HOST');
        //     const wsPort = Env.getValue<string>('NEXT_PUBLIC_WS_PORT');

        //     const wsListenUrl = `${wsHost}:${wsPort}`;

        //     console.log('Connecting to WebSocket:', wsListenUrl);

        //     socket = io(wsListenUrl, {
        //         withCredentials : true,
        //         auth            : {
        //             AuthToken : Cookies.get(CookieType.AuthToken),
        //         },
        //     });
        // Connect to existing Socket.IO server
        console.log('Connecting to Socket.IO server at api.crude.local:12345...');
        clientSocket = ioc('http://api.crude.local:12345', {
            transports : ['websocket'],
        });

        // Once connected, signal Jest we're ready
        clientSocket.on('connect', () => {
            console.log('Connected to server!');
            done();
        });

        // Handle any connection errors
        clientSocket.on('connect_error', err => {
            console.error('Connection error:', err);
            done(err); // Fail the test setup
        });
    });

    afterAll(() => {
        // Close the socket connection
        console.log('Closing client socket...');
        clientSocket.close();
    });

    test('should connect and send something', done => {
        console.log('Emitting "someEvent" to server...');
        clientSocket.emit('someEvent', { data : 'test' });

        // Listen for the server's response
        clientSocket.on('someEventResponse', msg => {
            console.log('Received "someEventResponse":', msg);

            // Add whatever assertion you need
            expect(msg).toHaveProperty('success', true);

            // End the test
            done();
        });
    }, 10000);
});

/* eslint-enable jest/no-done-callback */
