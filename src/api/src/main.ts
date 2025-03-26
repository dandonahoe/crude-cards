import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { displaySuccess } from './util';


/**
 * Bootstrap the NestJS application.
 *
 * Initializes the application with a custom logger using `winston`
 * Retrieves configuration settings for CORS and port, then starts the server.
 * Logs an ASCII art message if the environment is not set to 'test'.
 */
export const bootstrap = async (): Promise<void> => {

    // Create the NestJS application instance with a custom Winston logger
    const app = await NestFactory.create(AppModule);

    // Get configuration service instance
    const configService = app.get(ConfigService);

    // Retrieve the allowed origin for WebSocket CORS from configuration
    const webSocketOrigin = configService.get<string>('WEB_SOCKET_CORS_ALLOWED_ORIGIN');

    // Retrieve the backend port from configuration
    const webSocketPort = configService.get<number>('NEXT_PUBLIC_WEB_SOCKET_LISTENING_PORT');

    // Throw an error if the port is not set in the configuration
    if (!webSocketPort)
        throw new Error('PORT not set');

    // Throw an error if the WebSocket CORS allowed origin is not set in the configuration
    if (!webSocketOrigin)
        throw new Error('WEB_SOCKET_CORS_ALLOWED_ORIGIN not set');

    const webSocketListenUrl = `${webSocketOrigin}:${webSocketPort}`;

    // Enable CORS with specific settings
    app.enableCors({
        credentials : true,
        methods     : ['GET', 'POST'],
        origin      : webSocketListenUrl,
    });

    // Start listening on the specified port
    await app.listen(webSocketPort);

    // Log the port number to the console in green color
    console.log('\x1b[92m%s\x1b[0m\n', `Listening on (${await app.getUrl()},${webSocketPort})`);

    // If the environment is set to 'test', return early
    if (process.env.NODE_ENV === 'test') return;

    // Log ASCII art if the environment is not 'test'
    displaySuccess();
};

// Invoke the bootstrap function to start the application
bootstrap();
