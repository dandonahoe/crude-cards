
import { ConfigService } from '@nestjs/config';
import { corsPolicy } from '../Cors';

describe('corsPolicy', () => {
    let getMock: jest.SpyInstance;

    beforeEach(() => {
        getMock = jest.spyOn(ConfigService.prototype, 'get');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should allow all origins if the config contains a wildcard (*)', () => {
        getMock.mockReturnValue('*');
        const requestOrigin = 'http://example.com';

        const callback = jest.fn();

        // Type assertion to ensure TypeScript knows that origin is defined
        (corsPolicy.origin as (origin: string, callback: (err: Error | null, allow?: boolean) => void) => void)(
            requestOrigin,
            callback,
        );

        expect(callback).toHaveBeenCalledWith(null, true);
    });

    it('should allow specific origins if they are in the allowed list', () => {
        getMock.mockReturnValue('http://example.com,http://another.com');
        const requestOrigin = 'http://example.com';

        const callback = jest.fn();

        (corsPolicy.origin as (origin: string, callback: (err: Error | null, allow?: boolean) => void) => void)(
            requestOrigin,
            callback,
        );

        expect(callback).toHaveBeenCalledWith(null, true);
    });

    it('should block origins not in the allowed list', () => {
        getMock.mockReturnValue('http://example.com,http://another.com');
        const requestOrigin = 'http://notallowed.com';

        const callback = jest.fn();

        (corsPolicy.origin as (origin: string, callback: (err: Error | null, allow?: boolean) => void) => void)(
            requestOrigin,
            callback,
        );

        expect(callback).toHaveBeenCalledWith(new Error(`Not allowed by CORS (${requestOrigin}}`));
    });

    it('should block all origins if no allowed origins are set', () => {
        getMock.mockReturnValue(null); // Simulate no config value

        const requestOrigin = 'http://example.com';
        const callback = jest.fn();

        (corsPolicy.origin as (origin: string, callback: (err: Error | null, allow?: boolean) => void) => void)(
            requestOrigin,
            callback,
        );

        expect(callback).toHaveBeenCalledWith(null, false);
    });
});
