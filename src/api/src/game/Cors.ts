import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';


export const corsPolicy: CorsOptions = {
    credentials : true,
    methods     : ['GET', 'POST'],

    origin : (requestOrigin, callback) => {

        const configService = new ConfigService();

        const allowedOrigins = configService.get<string>('WEB_SOCKET_CORS_ALLOWED_ORIGIN', {
            infer : true,
        });

        if (!allowedOrigins)
            return callback(null, false);

        const allowedOriginsList = allowedOrigins.split(',');

        if (allowedOriginsList.includes('*'))
            return callback(null, true);

        if (allowedOriginsList.includes(requestOrigin))
            return callback(null, true);

        return callback(new Error(`Not allowed by CORS (${requestOrigin}}`));
    },
}
