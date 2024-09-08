import { RequestLogMiddleware } from './middleware/RequestLog.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GameInterceptor } from './interceptors/game.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createDataSourceOptions } from './data-source';
import { GameGateway } from './game/game.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from './game/game.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogModule } from './log/Log.module';
import { Logger } from 'winston';
import * as path from 'path';
import { DevtoolsModule } from '@nestjs/devtools-integration';


@Module({
    imports : [
        DevtoolsModule.register({
            http : process.env.NODE_ENV !== 'production',
        }),
        LogModule,
        ConfigModule.forRoot({
            envFilePath : path.resolve(__dirname, '../../../.env'),
            isGlobal    : true,
        }),
        TypeOrmModule.forRootAsync({
            imports    : [ConfigModule],
            inject     : [ConfigService],
            useFactory : async (configService: ConfigService) =>
                createDataSourceOptions(configService),
        }),
        GameModule,
    ],
    providers : [
        Logger,
        {
            provide  : APP_INTERCEPTOR,
            useClass : GameInterceptor,
        },
    ],
    exports : [],
})
export class AppModule implements NestModule {

    public configure = (consumer: MiddlewareConsumer) => {
        consumer
            .apply(RequestLogMiddleware)
            .forRoutes(GameGateway);
    }
}
