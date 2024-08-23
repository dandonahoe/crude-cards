import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

// Mock the necessary imports
jest.mock('@nestjs/core');
jest.mock('@nestjs/config');

describe('bootstrap', () => {
    let mockApp: any;
    let mockConfigService: jest.Mocked<ConfigService>;

    beforeEach(() => {
        mockApp = {
            get        : jest.fn(),
            enableCors : jest.fn(),
            listen     : jest.fn().mockResolvedValue(undefined),
        };

        mockConfigService = {
            get : jest.fn(), // This is now typed as a jest mock function
        } as unknown as jest.Mocked<ConfigService>;

        (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
    });

    it('should initialize the NestJS app with the correct configurations', async () => {
        // Mock configuration values
        mockConfigService.get.mockImplementation((key: string) => {
            if (key === 'WEB_SOCKET_CORS_ALLOWED_ORIGIN') return 'http://localhost';
            if (key === 'BACKEND_PORT') return 8080;
        });

        mockApp.get.mockReturnValue(mockConfigService);

        // Import and run the bootstrap function
        const { bootstrap } = await import('../main'); // Adjust path if necessary
        await bootstrap();

        // Assertions
        expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
        expect(mockApp.get).toHaveBeenCalledWith(ConfigService);
        expect(mockConfigService.get).toHaveBeenCalledWith('WEB_SOCKET_CORS_ALLOWED_ORIGIN');
        expect(mockConfigService.get).toHaveBeenCalledWith('BACKEND_PORT');
        expect(mockApp.enableCors).toHaveBeenCalledWith({
            credentials : true,
            methods     : ['GET', 'POST'],
            origin      : 'http://localhost',
        });
        expect(mockApp.listen).toHaveBeenCalledWith(8080);
    });

    it('should throw an error if BACKEND_PORT is not set', async () => {
        mockConfigService.get.mockImplementation((key: string) => {
            if (key === 'WEB_SOCKET_CORS_ALLOWED_ORIGIN') return 'http://localhost';
            if (key === 'BACKEND_PORT') return undefined; // Port is missing
        });

        mockApp.get.mockReturnValue(mockConfigService);

        const { bootstrap } = await import('../main');

        await expect(bootstrap()).rejects.toThrow('PORT not set');
    });

    it('should throw an error if WEB_SOCKET_CORS_ALLOWED_ORIGIN is not set', async () => {
        mockConfigService.get.mockImplementation((key: string) => {
            if (key === 'WEB_SOCKET_CORS_ALLOWED_ORIGIN') return undefined; // Origin is missing
            if (key === 'BACKEND_PORT') return 8080;
        });

        mockApp.get.mockReturnValue(mockConfigService);

        const { bootstrap } = await import('../main');

        await expect(bootstrap()).rejects.toThrow('WEB_SOCKET_CORS_ALLOWED_ORIGIN not set');
    });

    it('should log the correct message after app starts', async () => {
        // Mock configuration values
        mockConfigService.get.mockImplementation((key: string) => {
            if (key === 'WEB_SOCKET_CORS_ALLOWED_ORIGIN') return 'http://localhost';
            if (key === 'BACKEND_PORT') return 8080;
        });

        mockApp.get.mockReturnValue(mockConfigService);

        // Spy on console.log to check output
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        const { bootstrap } = await import('../main');
        await bootstrap();

        expect(consoleSpy).toHaveBeenCalledWith('\x1b[92m%s\x1b[0m\n', 'Listening on: 8080');

        consoleSpy.mockRestore(); // Restore console.log after the test
    });
});
