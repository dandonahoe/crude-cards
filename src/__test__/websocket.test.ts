import { GameAction } from '../client/action/game.action';
import { once } from 'events'
import WebSocket from 'ws'


test('client can connect and send start game action', async () => {

    const serverUrl = 'ws://api.crude.local:12345'
    console.log('Creating WebSocket client for:', serverUrl)

    const client = new WebSocket(serverUrl)

    debugger;

    // Wait for the client to open
    console.log('Waiting for WebSocket "open" event...')
    await once(client, 'open')
    console.log('WebSocket connection opened!')

    // Construct the action to send
    const startGameAction = GameAction.wsStartGame({ auth_token : 'asdf' })
    console.log('Constructed startGameAction:', startGameAction)

    // Send the action
    const serialized = JSON.stringify(startGameAction)
    console.log('Sending startGameAction to server:', serialized)
    client.send(serialized)

    // Wait for a single message response
    console.log('Waiting for message from server...')
    const [data] = await once(client, 'message')
    const message = data.toString()
    console.log('Received message:', message)

    // Replace this check with whatever you expect from the server
    expect(message).toContain('some-expected-response')
    console.log('Message assertion passed!')

    // Close the connection
    console.log('Closing WebSocket connection...')
    client.close()
    console.log('Connection closed.')
})
