## Backend Codebase

This document contains all the backend codebase for the Crude Cards game.

### File Structure

- src/
  - app.module.ts
  - card/
    - card.entity.ts
    - card.module.ts
    - card.service.ts
  - constant/
    - card-color.enum.ts
    - game-popup-type.enum.ts
    - game-stage.enum.ts
    - player-type.enum.ts
    - websocket-event.enum.ts
  - data-source.ts
  - decorators/
    - EnumValidator.ts
    - allow-player-types.decorator.ts
  - entity/
    - dto/
      - create-entity.dto.ts
      - update-entity.dto.ts
    - entities/
      - entity.entity.ts
    - entity.controller.ts
    - entity.module.ts
    - entity.service.ts
  - exceptions/
    - Game.exception.ts
    - GameComplete.exception.ts
    - GameNoPlayers.exception.ts
    - GameNotEnoughPlayers.exception.ts
    - WebSocket.exception.ts
  - feedback/
    - feedback.entity.ts
    - feedback.module.ts
    - feedback.service.ts
  - filters/
    - CatchAllWs.filter.ts
    - GameException.filter.ts
    - GameWebSocketException.filter.ts
  - framework/
    - BaseEntity.ts
  - game/
    - Cors.ts
    - dtos/
      - UUID.dto.ts
      - auth.dto.ts
      - card.dto.ts
      - create-game.dto.ts
      - dealer-pick-black-card.dto.ts
      - dealer-pick-winner.dto.ts
      - game-state.dto.ts
      - join-game.dto.ts
      - leave-game.dto.ts
      - log-relay.dto.ts
      - menu-item-clicked.dto.ts
      - next-hand.dto.ts
      - player-select-card.dto.ts
      - player.dto.ts
      - start-game.dto.ts
      - start-timer.dto.ts
      - submit-feedback.dto.ts
      - timer-complete.dto.ts
      - update-timer.dto.ts
      - update-username.dto.ts
    - game.entity.ts
    - game.gateway.ts
    - game.module.ts
    - game.service.ts
  - game-session/
    - game-session.entity.ts
    - game-session.module.ts
    - game-session.service.ts
  - guards/
    - GameAuth.guard.ts
    - type.ts
  - interceptors/
    - game.interceptor.ts
  - log/
    - Log.module.ts
  - main.ts
  - middleware/
    - RequestLog.middleware.ts
  - openai/
    - openai.module.ts
    - openai.service.ts
  - pipes/
    - ZodValidation.pipe.ts
  - player/
    - player.entity.ts
    - player.module.ts
    - player.service.ts
  - score-log/
    - score-log.entity.ts
    - score-log.module.ts
    - score-log.service.ts
  - sock/
    - sock.module.ts
    - sock.service.ts
    - type.ts
  - test/
    - MockData.ts
    - TestUtil.ts
    - constant/
      - Boolean.ts
      - Date.ts
      - Email.ts
      - Invalid.ts
      - JSON.ts
      - Number.ts
      - String.ts
      - UUID.ts
      - Unserializable.ts
    - type.ts
  - type.ts
  - util/
    - util.module.ts
    - util.service.ts
  - util.ts


### Combined Files

## /Users/bort/code/crude-cards/src/api/src/app.module.ts

```typescript
import { RequestLogMiddleware } from './middleware/RequestLog.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GameInterceptor } from './interceptors/game.interceptor';
// import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createDataSourceOptions } from './data-source';
import { GameGateway } from './game/game.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from './game/game.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogModule } from './log/Log.module';
import { Logger } from 'winston';
import { EntityModule } from './entity/entity.module';
import * as path from 'path';


@Module({
    imports : [
        GameModule,
        LogModule,
        TypeOrmModule.forRootAsync({
            imports    : [ConfigModule],
            inject     : [ConfigService],
            useFactory : async (configService: ConfigService) =>
                createDataSourceOptions(configService),
        }),
        ConfigModule.forRoot({
            envFilePath : path.resolve(__dirname, '../../../.env'),
            isGlobal    : true,
        }),
        EntityModule,
        // DevtoolsModule.register({
        //     http : process.env.NODE_ENV !== 'production',
        // }),
    ],
    providers : [
        Logger, {
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

```

## /Users/bort/code/crude-cards/src/api/src/card/card.entity.ts

```typescript
import { EnumValidator } from '../decorators/EnumValidator';
import { CardColor } from '../constant/card-color.enum';
import { BaseEntity } from '../framework/BaseEntity';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Entity, Column } from 'typeorm';

/**
 * Represents a card entity.
 */
@Entity()
export class Card extends BaseEntity {

    /**
     * The color of the card.
     */
    @IsEnum(CardColor, { message : 'Invalid card color' })
    @EnumValidator(CardColor, CardColor.Unknown)
    @Column({
        type    : 'enum',
        enum    : CardColor,
        default : CardColor.Unknown,
    })
    public color: CardColor = CardColor.Unknown;

    /**
     * The text content of the card.
     */
    @IsNotEmpty()
    @Column({
        type     : 'text',
        nullable : true,
        default  : null,
    })
    public text: string | null = '';

    /**
     * Constructs a new instance of the Card class.
     *
     * @param color - The color of the card.
     * @param  text - The text content of the card.
     */
    public constructor(
        color: CardColor = CardColor.Unknown,
        text: string | null = '',
    ) {
        super();
        this.color = color;
        this.text = text;
    }
}

```

## /Users/bort/code/crude-cards/src/api/src/card/card.module.ts

```typescript
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardService } from './card.service';
import { Module } from '@nestjs/common';
import { Card } from './card.entity';
import { Logger } from 'winston';
import { LogModule } from '../log/Log.module';

@Module({
    // Declare the services that will be instantiated by the NestJS IoC container
    providers : [Logger, CardService],

    // Export the services to make them available to other modules
    exports : [CardService],

    // Import the TypeOrmModule and register the Card entity
    imports : [
        LogModule,
        TypeOrmModule.forFeature([Card]),
    ],
})
export class CardModule {}

```

## /Users/bort/code/crude-cards/src/api/src/card/card.service.ts

```typescript
import { GameSession } from '../game-session/game-session.entity';
import { CardColor } from '../constant/card-color.enum';
import { WSE } from '../exceptions/WebSocket.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { P } from '../../../type/framework/data/P';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Card } from './card.entity';
/**
 * This service provides methods to interact with cards in the database.
 * It includes functionalities to find cards by session and select random cards by color.
 *
 * @see GameSession
 * @see CardColor
 * @see Card
 */
@Injectable()
export class CardService {

    /**
     * @param cardRepo - The repository for the Card entity.
     */
    public constructor(
        @InjectRepository(Card)
        private readonly cardRepo: Repository<Card>,
    ) {}

    public getCardById = async (id: string) : P<Card | null>=>
        this.cardRepo.findOneBy({ id });

    public getCardByIdOrExplode = async (id: string) : P<Card> => {
        const card = await this.getCardById(id);

        if (!card)
            throw WSE.InternalServerError500(`Card with ID ${id} not found`);

        return card;
    }
    /**
     * Finds cards associated with a given game session.
     *
     * @param session - The game session containing card IDs.
     * @returns A promise that resolves to an array of cards.
     *
     * @example
     * const cards = await this.cardService.findCardsBySession(session);
     */
    public findCardsBySession = async ({
        black_cards,  white_cards,
    }: GameSession) =>
        this.cardRepo.find({
            where : {
                id : In([
                    ...black_cards, ...white_cards,
                ]),
            },
        });

    /**
     * Selects a specified number of random cards of a given color.
     *
     * @param color - The color of the cards to be selected (e.g., black or white).
     * @param maxResultCount - The maximum number of cards to be selected.
     * @returns A promise that resolves to an array of randomly selected cards.
     *
     * @example
     * const randomCards = await this.cardService.selectRandomCards(CardColor.BLACK, 5);
     */
    public selectRandomCards = async (
        color: CardColor,
        maxResultCount: number,
    ) =>
        this.cardRepo
            .createQueryBuilder('card')
            .where('card.color = :color', { color })
            .orderBy('RANDOM()')
            .limit(maxResultCount)
            .getMany();
}

```

## /Users/bort/code/crude-cards/src/api/src/constant/card-color.enum.ts

```typescript
import deepFreeze from 'deep-freeze-strict';


export enum CardColor {
    Unknown = 'unknown',
    Black   = 'black',
    White   = 'white',
}

deepFreeze(CardColor);

```

## /Users/bort/code/crude-cards/src/api/src/constant/game-popup-type.enum.ts

```typescript
import deepFreeze from 'deep-freeze-strict';


export enum GamePopupType {
    Scoreboard = 'Scoreboard',
    Settings   = 'Settings',
    Feedback   = 'Feedback',
    Unknown    = 'Unknown',
    Leave      = 'Leave',
}

deepFreeze(GamePopupType);

```

## /Users/bort/code/crude-cards/src/api/src/constant/game-stage.enum.ts

```typescript
import deepFreeze from 'deep-freeze-strict';


export enum GameStage {
    PlayerPickWhiteCard = 'player_pick_white_card',
    DealerPickBlackCard = 'dealer_pick_black_card',
    DealerPickWinner    = 'dealer_pick_winner',
    GameComplete        = 'game_complete',
    GameResults         = 'game_results',
    Unknown             = 'unknown',
    Lobby               = 'lobby',
    Home                = 'home',
}


deepFreeze(GameStage);

```

## /Users/bort/code/crude-cards/src/api/src/constant/player-type.enum.ts

```typescript
import deepFreeze from 'deep-freeze-strict';


export enum PlayerType {
    Unknown = 'unknown',
    Visitor = 'visitor',
    Player  = 'player',
}


deepFreeze(PlayerType);

```

## /Users/bort/code/crude-cards/src/api/src/constant/websocket-event.enum.ts

```typescript
import deepFreeze from 'deep-freeze-strict';


export enum WebSocketEventType {
    UpdatePlayerValidation = 'UpdatePlayerValidation',
    DealerPickBlackCard    = 'DealerPickBlackCard',
    DealerPickWinner       = 'DealerPickWinner',
    PlayerSelectCard       = 'PlayerSelectCard',
    MenuItemClicked        = 'MenuItemClicked',
    UpdateUsername         = 'UpdateUsername',
    SubmitFeedback         = 'SubmitFeedback',
    Disconnected           = 'Disconnected',
    ServerError            = 'ServerError',
    UpdateGame             = 'UpdateGame',
    CreateGame             = 'CreateGame',
    StartGame              = 'StartGame',
    LeaveGame              = 'LeaveGame',
    NextHand               = 'NextHand',
    JoinGame               = 'JoinGame',
    LogRelay               = 'LogRelay',
}


deepFreeze(WebSocketEventType);

```

## /Users/bort/code/crude-cards/src/api/src/data-source.ts

```typescript
import { GameSession } from './game-session/game-session.entity';
import { ScoreLog } from './score-log/score-log.entity';
import { Feedback } from './feedback/feedback.entity';
import { Player } from './player/player.entity';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { Game } from './game/game.entity';
import { Card } from './card/card.entity';


export const createDataSourceOptions = (
    configService: ConfigService,
): DataSourceOptions => ({
    type        : 'postgres',
    host        : configService.get<string>('BACKEND_DATABASE_HOST'),
    port        : configService.get<number>('BACKEND_DATABASE_PORT'),
    username    : configService.get<string>('BACKEND_DATABASE_USER'),
    password    : configService.get<string>('BACKEND_DATABASE_PASS'),
    database    : configService.get<string>('BACKEND_DATABASE_NAME'),
    synchronize : true,
    logging     : false,
    entities    : [
        GameSession,
        Feedback,
        ScoreLog,
        Player,
        Game,
        Card,
    ],
    migrations  : ['migrations/*.ts'],
    subscribers : [],
});

```

## /Users/bort/code/crude-cards/src/api/src/decorators/EnumValidator.ts

```typescript
import deepFreeze from 'deep-freeze-strict';

export function EnumValidator<T extends Record<string, unknown>>(
    enumType: T, defaultValue: T[keyof T]) {
    return function (target: any, propertyKey: string) {
        const privatePropertyKey = `_${propertyKey}`;

        // Initialize the private property with the default value
        Object.defineProperty(target, privatePropertyKey, {
            value        : defaultValue,
            writable     : true,
            enumerable   : false,
            configurable : false,
        });

        Object.defineProperty(target, propertyKey, {
            get () {
                return this[privatePropertyKey];
            },
            set (newValue: T[keyof T] | undefined) {
                if (newValue !== undefined && !Object.values(enumType).includes(newValue))
                    throw new Error(`Invalid value for ${propertyKey}: ${newValue}`);

                Object.defineProperty(this, privatePropertyKey, {
                    value        : newValue,
                    writable     : true, // Keep writable for the setter to function
                    enumerable   : false,
                    configurable : false,
                });
            },
            enumerable   : true,
            configurable : false,
        });

        deepFreeze(target[privatePropertyKey]);

    };
}

```

## /Users/bort/code/crude-cards/src/api/src/decorators/allow-player-types.decorator.ts

```typescript
import { SetMetadata } from '@nestjs/common';
import { PlayerType } from '../constant/player-type.enum';


export const AllowPlayerTypes = (...types: PlayerType[]) =>
        SetMetadata('allowedPlayerTypes', types);

```

## /Users/bort/code/crude-cards/src/api/src/entity/dto/create-entity.dto.ts

```typescript
export class CreateEntityDto {}

```

## /Users/bort/code/crude-cards/src/api/src/entity/dto/update-entity.dto.ts

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateEntityDto } from './create-entity.dto';

export class UpdateEntityDto extends PartialType(CreateEntityDto) {}

```

## /Users/bort/code/crude-cards/src/api/src/entity/entities/entity.entity.ts

```typescript
export class Entity {}

```

## /Users/bort/code/crude-cards/src/api/src/entity/entity.controller.ts

```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {
  public constructor(private readonly entityService: EntityService) {}

  @Post()
  public create(@Body() createEntityDto: CreateEntityDto) {
    return this.entityService.create(createEntityDto);
  }

  @Get()
  public findAll() {
    return this.entityService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.entityService.findOne(+id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto) {
    return this.entityService.update(+id, updateEntityDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.entityService.remove(+id);
  }
}

```

## /Users/bort/code/crude-cards/src/api/src/entity/entity.module.ts

```typescript
import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';

@Module({
  controllers : [EntityController],
  providers   : [EntityService],
})
export class EntityModule {}

```

## /Users/bort/code/crude-cards/src/api/src/entity/entity.service.ts

```typescript
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Injectable } from '@nestjs/common';


@Injectable()
export class EntityService {
  public create(createEntityDto: CreateEntityDto) {

    console.log(createEntityDto);

    return 'This action adds a new entity';
  }

  // running localhost:8080/entity to test
  public findAll() {
    return null;
  }

  public findOne(id: number) {
    return `This action returns a #${id} entity`;
  }

  public update(id: number, updateEntityDto: UpdateEntityDto) {

    console.log(updateEntityDto);

    return `This action updates a #${id} entity`;
  }

  public remove(id: number) {
    return `This action removes a #${id} entity`;
  }
}

```

## /Users/bort/code/crude-cards/src/api/src/exceptions/Game.exception.ts

```typescript
import { WsException } from '@nestjs/websockets';
import { Logger } from 'winston';


export class GameException extends WsException {

    public constructor(
        public override readonly message : string,
        public readonly runtimeContext   : string,
        public readonly debugBundle      : Record<string, unknown> = {},
        public readonly log              : Logger,
    ) {
        super(message);

        if(runtimeContext) this.runtimeContext = runtimeContext;
        if(debugBundle   ) this.debugBundle    = debugBundle;
        if(message       ) this.message        = message;

        this.stack = new Error().stack;

        Object.setPrototypeOf(this, GameException.prototype);
    }
}

```

## /Users/bort/code/crude-cards/src/api/src/exceptions/GameComplete.exception.ts

```typescript
import { Injectable } from "@nestjs/common";
import { GameException } from "./Game.exception";

import { Logger } from "winston";


@Injectable()
export class GameCompleteException extends GameException {

    public constructor(
        public override readonly message        : string,
        public override readonly runtimeContext : string,
        public override readonly debugBundle    : Record<string, unknown> = {},
        public override readonly log            : Logger,
    ) {
        super(message, runtimeContext, debugBundle, log);
    }
}


```

## /Users/bort/code/crude-cards/src/api/src/exceptions/GameNoPlayers.exception.ts

```typescript
import { GameException } from "./Game.exception";
import { Injectable } from "@nestjs/common";
import { Logger } from "winston";


@Injectable()
export class GameNoPlayersException extends GameException {

    public constructor(
        public override readonly message        : string,
        public override readonly runtimeContext : string,
        public override readonly debugBundle    : Record<string, unknown> = {},
        public override readonly log            : Logger,
    ) {
        super(message, runtimeContext, debugBundle, log);
    }
}

```

## /Users/bort/code/crude-cards/src/api/src/exceptions/GameNotEnoughPlayers.exception.ts

```typescript
import { GameException } from "./Game.exception";
import { Injectable } from "@nestjs/common";
import { Logger } from "winston";


@Injectable()
export class GameNotEnoughPlayersException extends GameException {

    public constructor(
        public override readonly message        : string,
        public override readonly runtimeContext : string,
        public override readonly debugBundle    : Record<string, unknown> = {},
        public override readonly log            : Logger,
    ) {
        super(message, runtimeContext, debugBundle, log);
    }
}


```

## /Users/bort/code/crude-cards/src/api/src/exceptions/WebSocket.exception.ts

```typescript
import { WsException } from '@nestjs/websockets';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';


@Injectable()
export class WebSocketException extends WsException {

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly log: Logger;

    /**
     * @param httpStatus  -
     * @param message     -
     * @param debugBundle -
     *
     * @returns void
     */
    public constructor(
        public readonly httpStatus       : HttpStatus,
        public override readonly message : string,
        public readonly debugBundle      : Record<string, unknown> = {},
    ) {
        super(message);

        this.debugBundle = debugBundle;
        this.httpStatus  = httpStatus;
        this.message     = message;
        this.stack       = Error().stack;

        Object.setPrototypeOf(this, WebSocketException.prototype);
    }

    public static Unauthorized401(
        message : string = 'Unauthorized401',
        debugBundle : Record<string, unknown> = {},
    ) {

        return new WebSocketException(HttpStatus.UNAUTHORIZED, message, debugBundle);
    }

    public static BadRequest400(
        message : string = 'BadRequest400',
        debugBundle : Record<string, unknown> = {},
    ) {
        return new WebSocketException(HttpStatus.BAD_REQUEST, message, debugBundle);
    }

    public static Forbidden403(
        message : string = 'Forbidden403',
        debugBundle : Record<string, unknown> = {},
    ) {
        return new WebSocketException(HttpStatus.FORBIDDEN, message, debugBundle);
    }

    public static NotFound404(
        message : string = 'NotFound404',
        debugBundle : Record<string, unknown> = {},
    ) {
        return new WebSocketException(HttpStatus.NOT_FOUND, message, debugBundle);
    }

    public static InternalServerError500(
        message : string = 'InternalServerError500',
        debugBundle : Record<string, unknown> = {},
    ) {
        return new WebSocketException(HttpStatus.INTERNAL_SERVER_ERROR, message, debugBundle);
    }

    public static NotImplemented501(
        message : string = 'NotImplemented501',
        debugBundle : Record<string, unknown> = {},
    ) {
        return new WebSocketException(HttpStatus.NOT_IMPLEMENTED, message, debugBundle);
    }

    public static BadGateway502(
        message : string = 'BadGateway502',
        debugBundle : Record<string, unknown> = {},
    ) {
        return new WebSocketException(HttpStatus.BAD_GATEWAY, message, debugBundle);
    }

    public static ServiceUnavailable503(
        message : string = 'ServiceUnavailable503',
        debugBundle : Record<string, unknown> = {},
    ) {
        return new WebSocketException(HttpStatus.SERVICE_UNAVAILABLE, message, debugBundle);
    }

    public static GatewayTimeout504(
        message : string = 'GatewayTimeout504',
        debugBundle : Record<string, unknown> = {},
    ) {
        return new WebSocketException(HttpStatus.GATEWAY_TIMEOUT, message, debugBundle);
    }

    public static MethodNotAllowed405(
        message : string = 'MethodNotAllowed405',
        debugBundle : Record<string, unknown> = {},
    ) {
        return new WebSocketException(HttpStatus.METHOD_NOT_ALLOWED, message, debugBundle);
    }
}

export {
    WebSocketException as WSE,
}

```

## /Users/bort/code/crude-cards/src/api/src/feedback/feedback.entity.ts

```typescript
import { BaseEntity } from '../framework/BaseEntity';
import { Entity, Column } from 'typeorm';


@Entity()
export class Feedback extends BaseEntity {

    public constructor(
        name       : string | null = null,
        email      : string | null = null,
        message    : string | null = null,
        game_code  : string | null = null,
        player_id  : string | null = null,
        session_id : string | null = null,
    ) {
        super();

        this.session_id = session_id;
        this.game_code  = game_code;
        this.player_id  = player_id;
        this.message    = message;
        this.email      = email;
        this.name       = name;
    }

    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public name: string | null = null;

    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public email: string | null = null;

    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public message: string | null = null;

    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public game_code: string | null = null;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public player_id: string | null = null;

    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public session_id: string | null = null;
}

```

## /Users/bort/code/crude-cards/src/api/src/feedback/feedback.module.ts

```typescript
import { FeedbackService } from './feedback.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { Module } from '@nestjs/common';
import { Logger } from 'winston';
import { LogModule } from '../log/Log.module';

@Module({
    exports   : [FeedbackService],
    providers : [
        Logger,
        FeedbackService,
    ],
    imports : [
        LogModule,
        TypeOrmModule.forFeature([Feedback]),
    ],
})
export class FeedbackModule { }

```

## /Users/bort/code/crude-cards/src/api/src/feedback/feedback.service.ts

```typescript
import { SubmitFeedbackDTO } from '../game/dtos/submit-feedback.dto';
import { GameSession } from '../game-session/game-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { P } from '../../../type/framework/data/P';
import { Player } from '../player/player.entity';
import { Feedback } from './feedback.entity';
import { Injectable } from '@nestjs/common';
import { Game } from '../game/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {

    public constructor(
        @InjectRepository(Feedback)
        private readonly feedbackRepo: Repository<Feedback>,
    ) { }

    public submitFeedback = async (
        submitFeedback: SubmitFeedbackDTO,
        currentPlayer: Player | null,
        session: GameSession | null,
        game: Game | null,
    ): P<Feedback> => this.feedbackRepo.save({
        created_by : currentPlayer ? currentPlayer.id : null,
        session_id : session ? session.id : null,
        game_code  : game ? game.game_code : null,
        player_id  : currentPlayer ? currentPlayer.id : null,
        message    : submitFeedback.message!,
        email      : submitFeedback.email!,
        name       : submitFeedback.name!,
    });
}

```

## /Users/bort/code/crude-cards/src/api/src/filters/CatchAllWs.filter.ts

```typescript
import { Catch, ArgumentsHost, Injectable, Inject } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { P } from '../../../type/framework/data/P';
import { Socket } from 'socket.io';
import { Logger } from 'winston';
import { GameService } from '../game/game.service';


/**
 * Catches and logs all exceptions that occur during WebSocket communication.
 */
@Catch(WsException)
@Injectable()
export class CatchAllWsFilter extends BaseWsExceptionFilter {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        @Inject()
        private readonly gameService : GameService,
    ) {
        super();

        this.log.silly('CatchAllFilter::constructor');
    }

    /**
     * Catches and logs all exceptions that occur during WebSocket communication.
     *
     * @param exception - The exception to be handled.
     * @param host - The context of the current request.
     */
    public override catch = async (
        exception: unknown, host: ArgumentsHost,
    ) : P => {

        console.log('CatchAllWsFilter::catch');

        const context = host.switchToWs()

        const socket = context.getClient<Socket>();

        const stack = (exception as Error).stack;

        this.log.error(
            `WebSocket Filtered Exception: ${JSON.stringify(exception)}`, {
            socketId : socket.id,
            exception,
            stack,
        });
    }
}

```

## /Users/bort/code/crude-cards/src/api/src/filters/GameException.filter.ts

```typescript
import { GameNotEnoughPlayersException } from '../exceptions/GameNotEnoughPlayers.exception';
import { GameNoPlayersException } from '../exceptions/GameNoPlayers.exception';
import { GameCompleteException } from '../exceptions/GameComplete.exception';
import { Catch, ArgumentsHost, Inject, Injectable } from '@nestjs/common';
import { GameException } from '../exceptions/Game.exception';
import { WSE } from '../exceptions/WebSocket.exception';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GameService } from '../game/game.service';
import { BaseExceptionFilter } from '@nestjs/core';
import { AuthDTO } from '../game/dtos/auth.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from 'winston';


/**
 * This filter handles all exceptions derived from GameException within WebSocket context.
 *
 * Usage:
 * - This filter should be used to handle game-related exceptions during WebSocket communication.
 * - The filter logs the exception and processes it based on its type, such as no players,
 *   not enough players, game completion, or generic game exceptions.
 */
@Catch(GameException)
@Injectable()
export class GameExceptionFilter extends BaseExceptionFilter {

    /**
     * @param log          - Logger instance for logging purposes.
     * @param gameService  - Service for handling game-related logic and updates.
     */
    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        @Inject()
        private readonly gameService : GameService,
    ) {
        super();
        this.log.silly('GameExceptionFilter::constructor');
    }

    /**
     * Catches and handles exceptions related to game logic during WebSocket communication.
     *
     * @param gameExc      - The exception to be handled.
     * @param argumentHost - The context of the current request.
     */
    public override async catch(
        gameExc: GameException,
        argumentHost: ArgumentsHost,
    ): Promise<void> {
        console.log('GameException::catch');

        const executionContext = argumentHost.switchToWs();

        const baseDTO = executionContext.getData<AuthDTO>();
        const socket  = executionContext.getClient<Socket>();

        const server = await this.gameService.getSocketServer();

        const debugBundle = { socketId : socket.id, exc : gameExc, baseDTO };

        if (!baseDTO.game_code) {
            this.log.error('GameExceptionFilter::catch - No game code provided', { debugBundle });

            throw WSE.InternalServerError500('No game code provided', { debugBundle });
        }

        if (gameExc instanceof GameNoPlayersException)
            await this.handleGameNoPlayersException(server, gameExc, baseDTO.game_code, debugBundle);

        else if (gameExc instanceof GameNotEnoughPlayersException)
            await this.handleGameNotEnoughPlayersException(server, gameExc, baseDTO.game_code, debugBundle);

        else if (gameExc instanceof GameCompleteException)
            await this.handleGameCompleteException(server, gameExc, baseDTO.game_code, debugBundle);

        else
            await this.handleGenericGameException(server, gameExc, baseDTO.game_code, debugBundle);

        throw WSE.InternalServerError500('Unhandled GameException Exception', { debugBundle });
    }

    /**
     * Handles cases where no players are present in the game.
     *
     * @param socket      - The WebSocket client.
     * @param _exception  - The specific exception thrown.
     * @param gameCode    - The code of the game affected.
     * @param debugBundle - Additional debug information.
     */
    private async handleGameNoPlayersException(
        server      : Server,
        _exception  : GameNoPlayersException,
        gameCode    : string,
        debugBundle : Record<string, unknown>,
    ): Promise<void> {

        this.log.silly('GameExceptionFilter::handleGameNoPlayersException', { debugBundle });

        // Still emit game update for future observer and player types.
        await this.gameService.emitGameUpdate(
            server, gameCode, false, [], 'Handling GameNoPlayersException context',
        );
    }

    /**
     * Handles cases where there are not enough players in the game.
     *
     * @param socket            - The WebSocket client.
     * @param _exception    - The specific exception thrown.
     * @param gameCode        - The code of the game affected.
     * @param debugBundle  - Additional debug information.
     */
    private async handleGameNotEnoughPlayersException(
        server: Server,
        _exception: GameNotEnoughPlayersException,
        gameCode: string,
        debugBundle: Record<string, unknown>,
    ): Promise<void> {
        this.log.silly('GameExceptionFilter::handleGameNotEnoughPlayersException', { debugBundle });

        await this.gameService.emitGameUpdate(
            server, gameCode, false, [], 'Handling GameNotEnoughPlayersException context',
        );
    }

    /**
     * Handles cases where the game has been completed.
     *
     * @param socket       - The WebSocket client.
     * @param _exception   - The specific exception thrown.
     * @param gameCode     - The code of the game affected.
     * @param debugBundle  - Additional debug information.
     */
    private async handleGameCompleteException(
        server: Server,
        _exception: GameCompleteException,
        gameCode: string,
        debugBundle: Record<string, unknown>,
    ): Promise<void> {
        this.log.silly('GameExceptionFilter::handleGameCompleteException', { debugBundle });

        await this.gameService.emitGameUpdate(
            server, gameCode, false, [], 'Handling GameCompleteException context',
        );
    }

    /**
     * Handles generic game exceptions not specifically handled by other methods.
     *
     * @param server       - The WebSocket client.
     * @param _exception   - The specific exception thrown.
     * @param gameCode     - The code of the game affected.
     * @param debugBundle  - Additional debug information.
     */
    private async handleGenericGameException(
        server: Server,
        _exception: GameException,
        gameCode: string,
        debugBundle: Record<string, unknown>,
    ): Promise<void> {
        this.log.silly('GameExceptionFilter::handleGenericGameException', { debugBundle });

        await this.gameService.emitGameUpdate(
            server, gameCode, false, [], 'Handling GameException context',
        );
    }
}

```

## /Users/bort/code/crude-cards/src/api/src/filters/GameWebSocketException.filter.ts

```typescript
import { ArgumentsHost, Catch, Inject, Injectable } from '@nestjs/common';
import { WebSocketException } from '../exceptions/WebSocket.exception';
import { GameException } from '../exceptions/Game.exception';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { BaseExceptionFilter } from '@nestjs/core';
import { P } from '../../../type/framework/data/P';
import { GameService } from '../game/game.service';
import { Socket } from 'socket.io';
import { Logger } from 'winston';


@Catch(WebSocketException)
@Injectable()
export class GameWebSocketExceptionFilter extends BaseExceptionFilter {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        @Inject()
        private readonly gameService : GameService,
    ) {
        super();

        this.log.silly('GameWebSocketExceptionFilter::constructor');
    }

    public override catch = async (
        exception: GameException, host: ArgumentsHost,
    ) : P => {
        console.log('GameWebSocketException::catch');

        const ctx = host.switchToWs();

        const socket = ctx.getClient() as Socket;
        const data   = ctx.getData(); // TODO: check, no data i think

        this.log.error('WebSocketExceptionFilter::catch', { socketId : socket.id, exception });
        this.log.silly('WebSocketExceptionFilter::catch::data', { data });

        // socket.emit(WebSocketEventType.ServerError, {
        //     timestamp : new Date().toISOString(),
        //     message   : exception.message,
        //     path      : data.url || data.event, // TODO: CHeck data format
        // });
    }
}

```

## /Users/bort/code/crude-cards/src/api/src/framework/BaseEntity.ts

```typescript
import { PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';


export class BaseEntity {
    // use class-validator to allow either undefined or a uuid

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null,
    })
    public created_by: string | null = null;

    @CreateDateColumn()
    public created_at: Date | null = null;

    @CreateDateColumn()
    public updated_at: Date | null = null;

    @Column({
        type     : 'text',
        nullable : true,
        default  : null})
    public title: string | null = null;
}

```

## /Users/bort/code/crude-cards/src/api/src/game/Cors.ts

```typescript
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

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/UUID.dto.ts

```typescript
import { IsUUID } from 'class-validator';


export class AuthTokenDto {
  @IsUUID()
  public authToken : string;
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/auth.dto.ts

```typescript
import { validate as validateUUID } from 'uuid';
import deepFreeze from 'deep-freeze-strict';
import { z } from 'zod';


// Define the schema using zod
export const AuthDTOSchema = z.object({
    game_code  : z.string().optional().nullable(),
    auth_token : z.string().optional().refine(
        value => value === undefined || validateUUID(value), {
        message : 'auth_token must be a valid UUIDv4 or undefined',
    }),

}).strict();

export class AuthDTO implements z.infer<typeof AuthDTOSchema> {

    public auth_token ?: string;
    public game_code  ?: string | null;

    public constructor(auth_token?: string, game_code?: string | null) {

        if (auth_token !== undefined) this.auth_token = auth_token;
        if (game_code  !== undefined) this.game_code  = game_code
    }

    public static Default = deepFreeze(new AuthDTO());
    public static Schema  = AuthDTOSchema;
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/card.dto.ts

```typescript
import { CardColor } from '../../constant/card-color.enum';
import { z } from 'zod';

// Define the schema using zod
const CardDTOSchema = z.object({
    id    : z.string().nullable().optional(),
    color : z.nativeEnum(CardColor).nullable(),
    text  : z.string().nullable(),
}).strict();


export class CardDTO {

    public color: CardColor | null = null;
    public text: string | null = null;
    public id: string | null;

    public constructor(
        id: string | null = null,
        color: CardColor | null = null,
        text: string | null = null,
    ) {
        if (color !== undefined) this.color = color;
        if (text !== undefined) this.text = text;
        if (id !== undefined) this.id = id;
    }

    // Expose the schema for external use
    public static Schema = CardDTOSchema;
    public static Default = Object.freeze(new CardDTO());
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/create-game.dto.ts

```typescript
import { AuthDTO } from './auth.dto';
import { z } from 'zod';


export const CreateGameDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
}).strict();

export class CreateGameDTO extends AuthDTO implements z.infer<typeof CreateGameDTOSchema> {

    public constructor(
        auth_token?: string,
    ) {
        super(auth_token);
    }

    // Expose the schema for external use
    public static override Schema = CreateGameDTOSchema;
    public static override Default = Object.freeze(new CreateGameDTO());
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/dealer-pick-black-card.dto.ts

```typescript
import { z } from 'zod';
import { AuthDTO } from './auth.dto';


const DealerPickBlackCardDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
    card_id : z.string().nullable(),
}).strict();

export class DealerPickBlackCardDTO extends AuthDTO implements z.infer<typeof DealerPickBlackCardDTOSchema> {

    public card_id: string | null = null;

    public constructor(
        auth_token ?: string,
        card_id    ?: string | null,
        game_code  ?: string | null,
    ) {
        super(auth_token, game_code);

        if (card_id !== undefined) this.card_id = card_id;
    }

    // Expose the schema for external use
    public static override Schema = DealerPickBlackCardDTOSchema;
    public static override Default = Object.freeze(new DealerPickBlackCardDTO());
}



```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/dealer-pick-winner.dto.ts

```typescript
import { AuthDTO } from './auth.dto';
import { z } from 'zod';


const DealerPickWinnerDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
    card_id : z.string().nullable(),
}).strict();

export class DealerPickWinnerDTO extends AuthDTO implements z.infer<typeof DealerPickWinnerDTOSchema> {

    public card_id: string | null = null;

    public constructor(auth_token?: string, card_id?: string | null) {
        super(auth_token);

        if (card_id !== undefined)
            this.card_id = card_id;
    }

    // Expose the schema for external use
    public static override Schema = DealerPickWinnerDTOSchema;
    public static override Default = Object.freeze(new DealerPickWinnerDTO());
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/game-state.dto.ts

```typescript
import { GameStage } from '../../constant/game-stage.enum';
import { zodIsoDateTimeString } from '../../test/TestUtil';
import { PlayerDTO } from './player.dto';
import { CardDTO } from './card.dto';
import { z } from 'zod';


// Define the schema using Zod
const GameStateDTOSchema = z.object({
    selected_card_id_list : z.array(z.string()).default([]),
    dealer_card_id_list   : z.array(z.string()).default([]),
    new_deck_card_list    : z.array(z.instanceof(CardDTO)).nullable().default([]),
    champion_player_id    : z.string().nullable().default(null),
    current_player_id     : z.string().nullable().default(null),
    winner_player_id      : z.string().nullable().default(null),
    game_end_message      : z.string().nullable().default(''),
    max_round_count       : z.number().default(0),
    max_point_count       : z.number().default(0),
    winner_card_id        : z.string().nullable().default(null),
    host_player_id        : z.string().nullable().default(null),
    dealer_card_id        : z.string().nullable().default(null),
    new_auth_token        : z.string().nullable().default(null),
    error_message         : z.string().nullable().default(null),
    round_number          : z.number().default(0),
    hand_number           : z.number().default(0),
    player_list           : z.array(z.instanceof(PlayerDTO)).default([]),
    created_by            : z.string().nullable().default(null),
    game_stage            : z.nativeEnum(GameStage).default(GameStage.Home),
    created_at            : zodIsoDateTimeString(),
    updated_at            : zodIsoDateTimeString(),
    session_id            : z.string().nullable().default(null),
    dealer_id             : z.string().nullable().default(null),
    game_code             : z.string().nullable().default(null),
}).strict();

export class GameStateDTO implements z.infer<typeof GameStateDTOSchema> {

    public selected_card_id_list : string[] = [];
    public dealer_card_id_list   : string[] = [];
    public new_deck_card_list    : CardDTO[] | null = [];
    public champion_player_id    : string | null = null;
    public current_player_id     : string | null = null;
    public winner_player_id      : string | null = null;
    public game_end_message      : string | null = null;
    public max_round_count       : number = 0;
    public max_point_count       : number = 0;
    public new_auth_token        : string | null = null;
    public winner_card_id        : string | null = null;
    public host_player_id        : string | null = null;
    public dealer_card_id        : string | null = null;
    public error_message         : string | null = null;
    public round_number          : number = 0;
    public hand_number           : number = 0;
    public player_list           : PlayerDTO[] = [];
    public created_by            : string | null = null;
    public game_stage            : GameStage = GameStage.Home;
    public created_at            : string | null = null;
    public updated_at            : string | null = null;
    public session_id            : string | null = null;
    public dealer_id             : string | null = null;
    public game_code             : string | null = null;

    public constructor(
        selected_card_id_list : string[] = [],
        dealer_card_id_list   : string[] = [],
        new_deck_card_list    : CardDTO[] | null = [],
        champion_player_id    : string | null = null,
        current_player_id     : string | null = null,
        winner_player_id      : string | null = null,
        game_end_message      : string | null = null,
        max_round_count       : number = 0,
        max_point_count       : number = 0,
        winner_card_id        : string | null = null,
        host_player_id        : string | null = null,
        dealer_card_id        : string | null = null,
        new_auth_token        : string | null = null,
        error_message         : string | null = null,
        round_number          : number = 0,
        hand_number           : number = 0,
        player_list           : PlayerDTO[] = [],
        created_by            : string | null = null,
        game_stage            : GameStage = GameStage.Home,
        created_at            : string | null = null,
        updated_at            : string | null = null,
        session_id            : string | null = null,
        dealer_id             : string | null = null,
        game_code             : string | null = null,
    ) {
        this.selected_card_id_list = selected_card_id_list;
        this.dealer_card_id_list   = dealer_card_id_list;
        this.new_deck_card_list    = new_deck_card_list;
        this.champion_player_id    = champion_player_id;
        this.current_player_id     = current_player_id;
        this.winner_player_id      = winner_player_id;
        this.game_end_message      = game_end_message;
        this.max_round_count       = max_round_count;
        this.max_point_count       = max_point_count;
        this.winner_card_id        = winner_card_id;
        this.host_player_id        = host_player_id;
        this.dealer_card_id        = dealer_card_id;
        this.new_auth_token        = new_auth_token;
        this.error_message         = error_message;
        this.round_number          = round_number;
        this.hand_number           = hand_number;
        this.player_list           = player_list;
        this.created_by            = created_by;
        this.game_stage            = game_stage;
        this.created_at            = created_at;
        this.updated_at            = updated_at;
        this.session_id            = session_id;
        this.dealer_id             = dealer_id;
        this.game_code             = game_code;
    }

    // Expose the schema for external use
    public static Schema = GameStateDTOSchema;
    public static Default = Object.freeze(new GameStateDTO());
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/join-game.dto.ts

```typescript
import { z } from 'zod';
import { AuthDTO } from './auth.dto';

const JoinGameDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
}).strict();


export class JoinGameDTO extends AuthDTO implements z.infer<typeof JoinGameDTOSchema> {

    public constructor(
        auth_token?: string,
        game_code?: string | null,
    ) {
        super(auth_token, game_code);
    }

    // Expose the schema for external use
    public static override Schema = JoinGameDTOSchema;
    public static override Default = Object.freeze(new JoinGameDTO());
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/leave-game.dto.ts

```typescript
import { AuthDTO } from './auth.dto';
import { z } from 'zod';


const LeaveGameDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
}).strict();

export class LeaveGameDTO extends AuthDTO implements z.infer<typeof LeaveGameDTOSchema> {

    public constructor(auth_token?: string) {
        super(auth_token);
    }

    // Expose the schema for external use
    public static override Schema = LeaveGameDTOSchema;
    public static override Default = Object.freeze(new LeaveGameDTO());
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/log-relay.dto.ts

```typescript
import { AuthDTO } from './auth.dto';
import { z } from 'zod';


const LogRelayDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
    payload : z.record(z.unknown()).optional(),
    message : z.string(),
}).strict();

export class LogRelayDTO extends AuthDTO implements z.infer<typeof LogRelayDTOSchema> {

    public message: string;
    public payload ?: Record<string, unknown>;

    public constructor(auth_token?: string) {
        super(auth_token);
    }

    // Expose the schema for external use
    public static override Schema = LogRelayDTOSchema;
    public static override Default = Object.freeze(new LogRelayDTO());
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/menu-item-clicked.dto.ts

```typescript
import { z } from 'zod';

// Define the schema using zod
export const MenuItemClickedDTOSchema = z.object({
    game_code : z.string().nullable().refine(value => value === null || /^[a-zA-Z]{3}$/.test(value), {
        message : 'game_code must be a three-letter word or null',
    }),
    player_id : z.string().nullable().refine(
        value => value === null || /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value), {
        message : 'player_id must be a valid UUIDv4 or null',
    }),
    item_id : z.string().min(1, { message : 'item_id must be a non-empty string' }),
}).strict(); // Ensure no additional properties are allowed

// Define the DTO class
export class MenuItemClickedDTO {

    public game_code: string | null = null;
    public player_id: string | null = null;
    public item_id: string | null = null;

    public constructor(
        game_code: string | null = null,
        player_id: string | null = null,
        item_id: string,
    ) {
        const parsed = MenuItemClickedDTOSchema.parse({ game_code, player_id, item_id });

        this.game_code = parsed.game_code;
        this.player_id = parsed.player_id;
        this.item_id = parsed.item_id;
    }

    public static Default = Object.freeze(new MenuItemClickedDTO(null, null, 'defaultItemId'));
}


```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/next-hand.dto.ts

```typescript
import { AuthDTO } from './auth.dto';
import { z } from 'zod';


const NextHandDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
}).strict();

export class NextHandDTO extends AuthDTO implements z.infer<typeof NextHandDTOSchema> {

    public constructor(auth_token?: string) {
        super(auth_token);
    }

    // Expose the schema for external use
    public static override Schema = NextHandDTOSchema;
    public static override Default = Object.freeze(new NextHandDTO());
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/player-select-card.dto.ts

```typescript
import { z } from 'zod';
import { AuthDTO } from './auth.dto';


const PlayerSelectCardDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
    card_id : z.string().nullable(),
}).strict();

export class PlayerSelectCardDTO extends AuthDTO implements z.infer<typeof PlayerSelectCardDTOSchema> {

    public card_id: string | null = null;

    public constructor(
        auth_token?: string,
        card_id?: string | null,
    ) {
        super(auth_token);

        if (card_id !== undefined)
            this.card_id = card_id;
    }

    // Expose the schema for external use
    public static override Schema = PlayerSelectCardDTOSchema;
    public static override Default = Object.freeze(new PlayerSelectCardDTO());
}



```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/player.dto.ts

```typescript
import { zodIsoDateTimeString } from '../../test/TestUtil';
import { z } from 'zod';


const PlayerDTOSchema = z.object({
    disconnected_at : zodIsoDateTimeString(),
    card_id_list    : z.array(z.string()),
    socket_id       : z.string().nullable(),
    username        : z.string().nullable(),
    score           : z.number(),
    id              : z.string().nullable(),
}).strict();


export class PlayerDTO implements z.infer<typeof PlayerDTOSchema> {

    public disconnected_at: string | null = null;
    public card_id_list: string[] = [];
    public socket_id: string | null = null;
    public username: string | null = null;
    public score: number = 0;
    public id: string | null = null;

    public constructor(
        disconnected_at: string | null = null,
        card_id_list: string[] = [],
        socket_id: string | null = null,
        username: string | null = null,
        score: number = 0,
        id: string | null = null,
    ) {
        this.disconnected_at = disconnected_at;
        this.card_id_list = card_id_list;
        this.socket_id = socket_id;
        this.username = username;
        this.score = score;
        this.id = id;
    }

    // Expose the schema for external use
    public static Schema = PlayerDTOSchema;
    public static Default = Object.freeze(new PlayerDTO());
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/start-game.dto.ts

```typescript
import { z } from 'zod';
import { AuthDTO } from './auth.dto';


const StartGameDTOSchema = z.object({
    ...AuthDTO.Schema.shape,
}).strict();

export class StartGameDTO extends AuthDTO implements z.infer<typeof StartGameDTOSchema> {

    public constructor(auth_token?: string) {
        super(auth_token);
    }

    // Expose the schema for external use
    public static override Schema = StartGameDTOSchema;
    public static override Default = Object.freeze(new StartGameDTO());
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/start-timer.dto.ts

```typescript
import { TimerType } from '../../type';
import { z } from 'zod';

// Define the schema using zod
const StartTimerDTOSchema = z.object({
    timerType : z.nativeEnum(TimerType),
    timeLeft  : z.number(),
}).strict();


export class StartTimerDTO implements z.infer<typeof StartTimerDTOSchema> {

    public timerType: TimerType = TimerType.Unknown;
    public timeLeft: number = 0;

    public constructor(timerType: TimerType, timeLeft: number) {

        if (timerType !== undefined) this.timerType = timerType;
        if (timeLeft !== undefined) this.timeLeft = timeLeft;
    }

    // Expose the schema for external use
    public static Schema = StartTimerDTOSchema;
    public static Default = Object.freeze(new StartTimerDTO(TimerType.Unknown, 0));
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/submit-feedback.dto.ts

```typescript
import { AuthDTO, AuthDTOSchema } from "./auth.dto";
import { z } from 'zod';

// Define the schema using zod
const SubmitFeedbackDTOSchema = z.object({
    ...AuthDTOSchema.shape,
    message : z.string().nullable(),
    email   : z.string().nullable(),
    name    : z.string().nullable(),
}).strict();

export class SubmitFeedbackDTO extends AuthDTO implements z.infer<typeof SubmitFeedbackDTOSchema> {

    public message: string | null = null;
    public email: string | null = null;
    public name: string | null = null;

    public constructor(
        auth_token?: string | undefined,
        message: string | null = null,
        email: string | null = null,
        name: string | null = null,
    ) {
        super(auth_token);

        if (message !== undefined) this.message = message;
        if (email !== undefined) this.email = email;
        if (name !== undefined) this.name = name;
    }

    // Expose the schema for external use
    public static override Schema = SubmitFeedbackDTOSchema;
    public static override Default = Object.freeze(new SubmitFeedbackDTO());
}



```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/timer-complete.dto.ts

```typescript
import { TimerType } from '../../type';
import { z } from 'zod';

// Define the schema using zod
const TimerCompleteDTOSchema = z.object({
    timerType : z.nativeEnum(TimerType).nullable(),
}).strict();

export class TimerCompleteDTO implements z.infer<typeof TimerCompleteDTOSchema> {

    public timerType: TimerType | null = null;

    public constructor(timerType: TimerType | null = null) {
        this.timerType = timerType;
    }

    public static Default = Object.freeze(new TimerCompleteDTO());
    public static Schema = TimerCompleteDTOSchema;
}

```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/update-timer.dto.ts

```typescript
import { TimerType } from '../../type';
import { z } from 'zod';

const UpdateTimerDTOSchema = z.object({
    timerType : z.nativeEnum(TimerType).nullable(),
    timeLeft  : z.number(),
}).strict();


export class UpdateTimerDTO implements z.infer<typeof UpdateTimerDTOSchema> {

    public timerType: TimerType | null = null;
    public timeLeft: number = 0;

    public constructor(
        timerType: TimerType | null = null,
        timeLeft: number = 0,
    ) {
        if (timerType !== undefined) this.timerType = timerType;
        if (timeLeft !== undefined) this.timeLeft = timeLeft;
    }

    public static Schema = UpdateTimerDTOSchema;
    public static Default = Object.freeze(new UpdateTimerDTO());
}


```

## /Users/bort/code/crude-cards/src/api/src/game/dtos/update-username.dto.ts

```typescript
import { AuthDTO, AuthDTOSchema } from "./auth.dto";
import { z } from 'zod';

const UpdateUsernameDTOSchema = z.object({
    ...AuthDTOSchema.shape,
    username : z.string(),
}).strict();

export class UpdateUsernameDTO extends AuthDTO implements z.infer<typeof UpdateUsernameDTOSchema> {

    public username: string;

    public constructor(username: string, auth_token?: string) {
        super(auth_token);

        if (username !== undefined) this.username = username;
    }

    public static override Schema = UpdateUsernameDTOSchema;
    public static override Default = Object.freeze(new UpdateUsernameDTO(''));
}

```

## /Users/bort/code/crude-cards/src/api/src/game/game.entity.ts

```typescript
import { BaseEntity } from '../framework/BaseEntity';
import { Entity, Column } from 'typeorm';


@Entity()
export class Game extends BaseEntity {

    /**
     * Creates an instance of the Game class.
     *
     * @param max_round_count    - The maximum number of rounds in the game.
     * @param max_point_count    - The maximum number of points in the game.
     * @param host_player_id     - The ID of the host player.
     * @param game_code          - The unique code for the game.
     * @param current_session_id - The current session ID.
     */
    public constructor(
    ) {
        super();

        this.current_session_id = null;
        this.max_round_count    = 0;
        this.max_point_count    = 0;
        this.host_player_id     = null;
        this.game_code          = null;
    }


    /**
     * The maximum number of rounds in the game.
     */
    @Column({
        nullable : false,
        default  : 0,
        type     : 'integer' })
    public max_round_count: number = 0;


    /**
     * The maximum number of points in the game.
     */
    @Column({
        nullable : false,
        default  : 0,
        type     : 'integer' })
    public max_point_count: number = 0;


    /**
     * The ID of the host player.
     */
    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public host_player_id: string | null = null;


    /**
     * The unique code for the game.
     */
    @Column({
        type     : 'text',
        nullable : true})
    public game_code: string | null = null;


    /**
     * The current session ID.
     */
    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public current_session_id: string | null = null;
}

```

## /Users/bort/code/crude-cards/src/api/src/game/game.gateway.ts

```typescript
import { Inject, Injectable, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { GameWebSocketExceptionFilter } from '../filters/GameWebSocketException.filter';
import { AllowPlayerTypes } from '../decorators/allow-player-types.decorator';
import { DealerPickBlackCardDTO } from './dtos/dealer-pick-black-card.dto';
import { WebSocketEventType } from './../constant/websocket-event.enum';
import { GameExceptionFilter } from '../filters/GameException.filter';
import { PlayerSelectCardDTO } from './dtos/player-select-card.dto';
import { DealerPickWinnerDTO } from './dtos/dealer-pick-winner.dto';
import { GameInterceptor } from '../interceptors/game.interceptor';
import { ZodValidationPipe } from './../pipes/ZodValidation.pipe';
import { CatchAllWsFilter } from '../filters/CatchAllWs.filter';
import { UpdateUsernameDTO } from './dtos/update-username.dto';
import { SubmitFeedbackDTO } from './dtos/submit-feedback.dto';
import { PlayerType } from '../constant/player-type.enum';
import { GameAuthGuard } from '../guards/GameAuth.guard';
import { type P } from '../../../type/framework/data/P';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateGameDTO } from './dtos/create-game.dto';
import { StartGameDTO } from './dtos/start-game.dto';
import { LeaveGameDTO } from './dtos/leave-game.dto';
import { JoinGameDTO } from './dtos/join-game.dto';
import { NextHandDTO } from './dtos/next-hand.dto';
import { LogRelayDTO } from './dtos/log-relay.dto';
import { GameService } from './game.service';
import { Server, Socket } from 'socket.io';
import { corsPolicy } from './Cors';
import { Logger } from 'winston';
import {
    SubscribeMessage, MessageBody, WebSocketGateway,
    ConnectedSocket, OnGatewayConnection,
    OnGatewayDisconnect, WebSocketServer,
} from '@nestjs/websockets';


@UseFilters(GameWebSocketExceptionFilter, GameExceptionFilter, CatchAllWsFilter)
@WebSocketGateway({ cors : corsPolicy })
@UseInterceptors(GameInterceptor)
@UseGuards(GameAuthGuard)
@Injectable()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    private server: Server;


    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        private readonly gameService: GameService,
    ) { }

    public getSocketServer(): Server {
        return this.server;
    }

    public handleConnection = async (socket: Socket): P<unknown> => {
        this.log.silly('GameGateway::handleConnection', { socketId : socket.id });

        return this.gameService.connectPlayer(this.server, socket);
    }

    public handleDisconnect = async (socket: Socket): P<unknown> => {
        this.log.silly('GameGateway:::handleDisconnect', { socketID : socket.id });

        return this.gameService.disconnectPlayer(socket);
    }

    @AllowPlayerTypes(PlayerType.Player)
    @SubscribeMessage(WebSocketEventType.CreateGame)
    public async createGame(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(CreateGameDTO.Schema))
        createGame: CreateGameDTO,
    ) : P<unknown>{
        this.log.info('GameGateway::createGame', { createGame });

        return this.gameService.createGame(this.server, socket, createGame);
    }

    @SubscribeMessage(WebSocketEventType.LogRelay)
    @AllowPlayerTypes(PlayerType.Player, PlayerType.Visitor, PlayerType.Unknown)
    public async logClient(
        @MessageBody(new ZodValidationPipe(LogRelayDTO.Schema))
        logRelay: LogRelayDTO,
    ) : P<unknown> {
        return this.log.info(`CLIENT: ${logRelay.message}`, logRelay.payload);
    }


    @SubscribeMessage(WebSocketEventType.StartGame)
    public async startGame(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(StartGameDTO.Schema))
        startGame: StartGameDTO,
    ): P<unknown> {
        this.log.silly('GameGateway::startGame', { startGame });

        return this.gameService.startGame(this.server, socket, startGame);
    }

    @SubscribeMessage(WebSocketEventType.JoinGame)
    @AllowPlayerTypes(PlayerType.Player)
    public async joinGame(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(JoinGameDTO.Schema))
        joinGame: JoinGameDTO,
    ) : P<unknown> {
        this.log.silly('GameGateway::joinGame', { joinGame });

        return this.gameService.joinGame(
            this.server, socket, joinGame, 'Joining via WebSocketEventType.JoinGame');
    }

    @SubscribeMessage(WebSocketEventType.LeaveGame)
    @AllowPlayerTypes(PlayerType.Player)
    public async leaveGame(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(LeaveGameDTO.Schema))
        leaveGame: LeaveGameDTO,
    ) : P<unknown> {
        this.log.silly('GameGateway::leaveGame', { leaveGame });

        return this.gameService.leaveGame(this.server, socket, leaveGame);
    }

    @SubscribeMessage(WebSocketEventType.PlayerSelectCard)
    @AllowPlayerTypes(PlayerType.Player)
    public async playerSelectCard(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(PlayerSelectCardDTO.Schema))
        playerSelectCard: PlayerSelectCardDTO,
    ) : P<unknown> {
        this.log.silly('GameGateway::playerSelectCard', { playerSelectCard });

        return this.gameService.playerSelectCard(this.server, socket, playerSelectCard);
    }

    @SubscribeMessage(WebSocketEventType.SubmitFeedback)
    @AllowPlayerTypes(PlayerType.Player, PlayerType.Visitor, PlayerType.Unknown)
    public async submitFeedback(
        @MessageBody(new ZodValidationPipe(SubmitFeedbackDTO.Schema))
        submitFeedback: SubmitFeedbackDTO,
    ) : P<unknown> {
        this.log.silly('GameGateway::submitFeedback', submitFeedback);

        return this.gameService.submitFeedback(submitFeedback);
    }

    @SubscribeMessage(WebSocketEventType.UpdateUsername)
    @AllowPlayerTypes(PlayerType.Player)
    public async updateUsername(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(UpdateUsernameDTO.Schema))
        updateUsername: UpdateUsernameDTO,
    ): P<unknown> {
        this.log.silly('GameGateway::updateUsername', { updateUsername });

        return this.gameService.updateUsername(this.server, socket, updateUsername);
    }

    @SubscribeMessage(WebSocketEventType.DealerPickBlackCard)
    @AllowPlayerTypes(PlayerType.Player)
    public async dealerPickBlackCard(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(DealerPickBlackCardDTO.Schema))
        dealerPickBlackCard: DealerPickBlackCardDTO,
    ): P<unknown> {
        this.log.silly('GameGateway::dealerPickBlackCard', { dealerPickBlackCard });

        return this.gameService.dealerPickBlackCard(this.server, socket, dealerPickBlackCard);
    }

    @SubscribeMessage(WebSocketEventType.DealerPickWinner)
    @AllowPlayerTypes(PlayerType.Player)
    public async dealerPickWinner(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(DealerPickWinnerDTO.Schema))
        dealerPickWinner: DealerPickWinnerDTO,
    ): P<unknown> {
        this.log.silly('GameGateway::dealerPickWinner', { dealerPickWinner });

        return this.gameService.dealerPickWinner(this.server, socket, dealerPickWinner);
    }

    @SubscribeMessage(WebSocketEventType.NextHand)
    @AllowPlayerTypes(PlayerType.Player)
    public async nextHand(
        @ConnectedSocket()
        socket: Socket,

        @MessageBody(new ZodValidationPipe(NextHandDTO.Schema))
        nextHand: NextHandDTO,
    ): P<unknown> {
        this.log.silly('GameGateway::nextHand', { nextHand });

        return this.gameService.nextHand(this.server, socket, nextHand);
    }
}

```

## /Users/bort/code/crude-cards/src/api/src/game/game.module.ts

```typescript
import { GameWebSocketExceptionFilter } from '../filters/GameWebSocketException.filter';
import { GameSessionModule } from '../game-session/game-session.module';
import { GameExceptionFilter } from '../filters/GameException.filter';
import { ScoreLogModule } from '../score-log/score-log.module';
import { FeedbackModule } from '../feedback/feedback.module';
import { PlayerModule } from '../player/player.module';
import { UtilService } from '../util/util.service';
import { SockService } from '../sock/sock.service';
import { UtilModule } from '../util/util.module';
import { SockModule } from '../sock/sock.module';
import { CardModule } from '../card/card.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from '../log/Log.module';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import {  Module } from '@nestjs/common';
import { Game } from './game.entity';
import { Logger } from 'winston';
import { OpenAIModule } from '../openai/openai.module';
import { OpenAIService } from '../openai/openai.service';


@Module({
    exports : [
        GameService,
    ],

    providers : [
        GameWebSocketExceptionFilter,
        GameExceptionFilter,
        OpenAIService,
        UtilService,
        SockService,
        GameService,
        GameGateway,
        Logger,
    ],

    imports : [
        GameSessionModule,
        FeedbackModule,
        ScoreLogModule,
        PlayerModule,
        OpenAIModule,
        CardModule,
        UtilModule,
        SockModule,
        LogModule,

        TypeOrmModule.forFeature([
            Game,
        ]),
    ],
})
export class GameModule { }

```

## /Users/bort/code/crude-cards/src/api/src/game/game.service.ts

```typescript
import { GameNotEnoughPlayersException } from '../exceptions/GameNotEnoughPlayers.exception';
import { Body, Inject, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { GameCompleteException } from '../exceptions/GameComplete.exception';
import { DealerPickBlackCardDTO } from './dtos/dealer-pick-black-card.dto';
import { GameSessionService } from '../game-session/game-session.service';
import { WebSocketEventType } from '../constant/websocket-event.enum';
import { PlayerSelectCardDTO } from './dtos/player-select-card.dto';
import { DealerPickWinnerDTO } from './dtos/dealer-pick-winner.dto';
import { GameSession } from '../game-session/game-session.entity';
import { ScoreLogService } from '../score-log/score-log.service';
import { ZodValidationPipe } from '../pipes/ZodValidation.pipe';
import { FeedbackService } from '../feedback/feedback.service';
import { UpdateUsernameDTO } from './dtos/update-username.dto';
import { SubmitFeedbackDTO } from './dtos/submit-feedback.dto';
import { AuthToken, GameDeck, GameExitReason } from '../type';
import { PlayerType } from '../constant/player-type.enum';
import { PlayerService } from '../player/player.service';
import { ScoreLog } from '../score-log/score-log.entity';
import { GameStage } from '../constant/game-stage.enum';
import { CardColor } from '../constant/card-color.enum';
import { type P } from '../../../type/framework/data/P';
import { WSE } from '../exceptions/WebSocket.exception';
import { Feedback } from '../feedback/feedback.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateGameDTO } from './dtos/create-game.dto';
import { GameStateDTO } from './dtos/game-state.dto';
import { StartGameDTO } from './dtos/start-game.dto';
import { LeaveGameDTO } from './dtos/leave-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SockService } from '../sock/sock.service';
import { CardService } from '../card/card.service';
import { NextHandDTO } from './dtos/next-hand.dto';
import { JoinGameDTO } from './dtos/join-game.dto';
import { UtilService } from '../util/util.service';
import { Player } from '../player/player.entity';
import { PlayerDTO } from './dtos/player.dto';
import { Socket, Server } from 'socket.io';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { difference } from 'lodash';
import { Logger } from 'winston';
import { OpenAIService } from '../openai/openai.service';


@Injectable()
export class GameService {

    private myFunTestSocketIoServerRenameMe: Server;

    public constructor(
        @InjectRepository(Game)
        private readonly gameRepo: Repository<Game>,

        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        private readonly gameSessionService: GameSessionService,
        private readonly feedbackService: FeedbackService,
        private readonly scoreLogService: ScoreLogService,
        private readonly playerService: PlayerService,
        private readonly openAIService: OpenAIService,
        private readonly sockService: SockService,
        private readonly cardService: CardService,
        private readonly utilService: UtilService,
    ) {
        this.log.silly('GameService::constructor()');
    }

    public getServerTest123 = async (): P<Server> => {
        return this.myFunTestSocketIoServerRenameMe;
    }

    /**
     * Connects a player via socket, handles reconnection if the auth token is valid,
     * or creates a new player if no valid auth token is found.
     *
     * @param socket - The player's socket instance
     *
     * @returns The connected player entity
     */
    public connectPlayer = async (
        server: Server, socket: Socket,
    ): P<unknown> => {
        this.myFunTestSocketIoServerRenameMe = server;

        const socketId = socket.id;

        this.log.silly('GameService::connectPlayer', { socketId });

        // just obtain formatted info about the request
        const socketRequest = await this.sockService.getRequestInfoFromSocket(socket);

        this.log.debug('Socket Request', { socketRequest });
        this.log.silly('Looking up player info by auth token', { authToken : socketRequest.authToken });

        const playerState = await this.getPlayerStateByAuthToken(socketRequest.authToken);

        let player: Player | null = null;

        //If no player was found (bad token, outdated, etc.), create a new player
        if (!playerState.currentPlayer) {
            this.log.debug('No player found for socket, creating new player.', { socketRequest });

            player = await this.playerService.createPlayer(socketRequest.socketId);

            this.log.debug('New player created, grabbing new state', { player });

            // grab the current state of the player now that they have been created
            const { currentPlayer } = await this.getPlayerStateByAuthToken(player.auth_token);

            if (!currentPlayer)
                throw WSE.InternalServerError500(`Player not found after creation, socket(${socketId})`);

            this.log.debug('Emitting new player auth token', { player });

            // let the server talk to the plaayer by their id. Always active,
            // but when they join a game it will create another channel in parellel to
            // communicate with this player in the context of their game as [game_id]_[player_id]
            await socket.join(currentPlayer.id);

            // and push the new token down as the first message received
            const result = await this.emitPlayerAuthToken(server, currentPlayer);

            console.log('Broadcasting new player auth token', { result });

            return;
        }

        // at this point, we have found an existing player
        // let the server talk to the plaayer by their id. Always active,
        this.log.debug('Joining the player to their socket by their playerId', {
            playerId : playerState.currentPlayer.id,
        });

        // but when they join a game it will create another channel in parellel to
        // communicate with this player in the context of their game as [game_id]_[player_id]
        await socket.join(playerState.currentPlayer.id);

        this.log.debug('Player socket connected, sending AuthToken', { player });

        // Existing player needs a new token, they're wiped on connection
        // to the server and this pushes a new one to be stored and supplied
        // in followup calls. Should probably migrate to JWT for this.
        // await this.emitPlayerAuthToken(server, playerState.currentPlayer!)
        // Testing keeping the exiting auth token

        if (!playerState.game) {
            this.log.debug('No game found for player, skipping join', { playerState });

            return;
        }

        // check auth token
        return this.joinGame(
            server, socket,
            new JoinGameDTO(
                playerState.currentPlayer.auth_token!,
                playerState.game!.game_code),
            'Joining Existing Game via Reconnect Routine');
    };


    /**
     * Return a Player given an socket conection
     *
     * @param socket - The player's socket instance
     *
     * @returns Player if they exist or null if there's no existing player tied to this socket
     */
    public findPlayerBySocket = async (socket: Socket): P<Player> =>
        this.playerService.findPlayerBySocket(socket);

    /**
    * Disconnects a player from the game session and handles socket clean-up.
    *
    * @param socket - The player's socket instance
    *
    * @returns The disconnected player and the associated game session details (if any)
    */
    public disconnectPlayer = async (
        socket: Socket,
    ): P<unknown> => {
        this.log.debug('TODO: ENABLE DISCONNECT ROUTINE.', { socketId : socket.id });

        return;
    }

    public getSocketServer = async (): P<Server> => {
        return this.myFunTestSocketIoServerRenameMe;
    }

    /**
     * Emits the player's authentication token to the player's socket. Good place to bunch edge cases
     * and to do things to reorganize the game to make it work. Sometimes, it will encounter
     * unfixable situations, like everyone leaving, and automatically shut down the game
     *
     * @param server - The socket server instance
     * @param player - The player entity
     *
     * @returns The player entity
     */
    private ensureValidSessionState = async (
        existingSession: GameSession | null | undefined,
        runtimeContext: string,
    ): P<GameSession> => {

        if (!existingSession) {
            this.log.error('GameService::ensureValidSessionState - Bogus Session', { runtimeContext });

            throw WSE.BadRequest400('Bogus Session', { runtimeContext });
        }

        const debugBundle = { existingSession, runtimeContext };

        this.log.silly('GameService::ensureValidSessionState', { debugBundle });

        let session = existingSession;

        const playerCount = existingSession.player_id_list.length;

        // If there arent enough players for the game to continue, end the game
        // TODO: Drop them into limbo until a quarum is reached and give the
        // new dealer the option to restart the game. Allows other players to
        // reconnect. Could happen if internets go out and everyone bounces
        // for instance. Does not apply in lobby mode since theres too few players
        // initially on create

        if (session.game_stage === GameStage.Lobby && playerCount === 0) {
            this.log.info('Game Ended In Lobby Mode Due to No Players', { debugBundle });

            throw new GameCompleteException(
                'No players in lobby, ending game', runtimeContext,
                debugBundle, this.log);
        }

        // If the game is in progress and the players drop to
        // zero with nobody waiting in limbo, end the game
        if (session.game_stage !== GameStage.Lobby
            && playerCount === 0
            && session.limbo_player_id_list.length === 0) {
            this.log.info('Not enough players to continue, sending remaining players to limbo',
                debugBundle,
            );
            throw new GameCompleteException(
                'No players in lobby, ending game',
                `Validating Session Context(${runtimeContext})`,
                debugBundle, this.log);
        }

        // if the game is in progress and the number of players drops
        // below the minimum required to continue, but is greater than zero
        // (previous case), send the remaining players to limbo. This will
        // let them get others to rejoin.

        if (session.game_stage !== GameStage.Lobby
            && playerCount === 0
            && session.limbo_player_id_list.length < 3) {
            this.log.info('Not enough players to continue, pausing game', debugBundle);

            // todo: routine to put people into limbo, verify thats the way to
            // do it first

            throw new GameNotEnoughPlayersException(
                'No players in the game, self destructing.',
                `Validating Session Context(${runtimeContext})`,
                debugBundle, this.log);
        }

        // if there's no host... or the host on the game session is no longer in the
        // player_id_list, they're gone, so replace them
        // either no host (weird) or the host is not in the active player list
        if (session.game_stage === GameStage.Lobby
            && (!session.lobby_host_id || !session.player_id_list.includes(session.lobby_host_id!))) {


            this.log.error('The game host is missing or is not an active player', { debugBundle, session });

            // Make a random other player the host in the lobby. They will
            // also be selected as the first dealer when the game starts
            session = await this.gameSessionService.promoteRandomPlayerToHost(
                session, `Validating Session State: Game Host Missing, context(${runtimeContext})`);
        }

        // this is mostly to treat it non null easier below
        if (!session.lobby_host_id) {
            const errorMessage = 'Game Host Missing Again, Check Logs for Edge Case';

            this.log.error(errorMessage, { session, debugBundle });

            // unfixable situation, error
            throw WSE.InternalServerError500(errorMessage, { session, debugBundle });
        }

        // If theIf there's no dealer, promote a player and tell
        // everyone they're a loser this hand

        // in other cases, the dealer could leave midgame. In that
        // case, the current hand is scrubbed and moves to the next
        // round, which promotes a new player to dealer.
        if (session.game_stage !== GameStage.Lobby
            && (session.dealer_id === null || !session.player_id_list.includes(session.dealer_id))) {

            this.log.warn('Dealer is invalid or no longer an active player, promote someone', debugBundle);

            // Promote the first player in the list to the dealer
            session = await this.gameSessionService.promoteRandomPlayerToDealer(
                session, `Validating Session State: Dealer Missing, context(${runtimeContext})`);
        }

        return session;
    }

    /**
     * Handles the process of exiting a game for a player, including session cleanup and returning the updated game state.
     *
     * @param exitGame - The DTO containing information needed to exit the game
     *
     * @returns The updated game state for the exiting player
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async leaveGame(
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(LeaveGameDTO.Schema))
        exitGame: LeaveGameDTO,
        runtimeContext = '',
    ): P<unknown> {
        this.myFunTestSocketIoServerRenameMe = server;

        this.log.silly('GameService::exitGame', {
            exitGame, runtimeContext, socketId : socket.id,
        });

        // Fetch player state based on auth token
        const playerState = await this.getPlayerStateByAuthTokenOrFail(exitGame.auth_token!);

        const { currentPlayer: player, game } = playerState;

        // Remove the player from the session
        const session = await this.gameSessionService.removePlayerFromSession(
            player,
            playerState.session,
            // added to the exited_player_id_list, removed from the player_id_list
            // and extra check to ensure not in limbo
            GameExitReason.LeftByChoice,
            'ExitGame Service Routine');

        this.log.silly('GameService::exitGame - Player removed from session', {
            game_code : game.game_code, session,
        });

        // TODO: HERE IS A CHOKE POINT
        // good place because reconfiguring the game here
        // will let the full lookup done by emitGameUpdate
        // to pull the changes. Can do dicy things here, and this
        // should be called in similar situations and frequently.
        // but should only do things whent he state has gone bogus

        if (!session) {

            this.log.warning('GameService::exitGame - Session is Bogus, Cannot Leave Session it Cant Find', {
                game_code : game.game_code, player, runtimeContext,
            });

            return;
        }


        // to check if the state is valid and reconfigure
        // First check, if the host is leaving, promote someone.
        // If the host is leaving and nobody is around, end the game.
        this.ensureValidSessionState(session, `Leaving Game, Context (${runtimeContext})`);

        // not run routine to patch up games which may be valid or not
        // THen broadcast whatever the final state is
        return this.emitGameUpdate(
            server,
            game.game_code, // to any players remaining
            false, // dont include the deck
            [player.id], // only send reset state actions to players leaving now,
            // and not include everyone in the exited_player_id_list since they could
            // have joined another game, but still have the same id.
            // TODO: Possibly think about combining game_id_player_id to be the channel
            // to directly communicate with a user. One connection per game, and only
            // one game is allowed per person, so one still.
            runtimeContext); // send disconnect success message to client
    }

    /**
     * Handles the process of updating a player's username.
     *
     * @param updateUsername - The DTO containing the new username and the player's auth token
     *
     * @returns The updated player entity
     */
    public findGameByGameSession = async (
        gameSession: GameSession,
    ): P<Game | null> => {

        this.log.silly('GameService::findGameByGameSession', { gameSession });

        return this.gameRepo.findOneBy({
            id : gameSession.game_id!,
        });
    }

    /**
     *  Gets the game state for the current player.
     * @param authToken - The authentication token of the player
     *
     * @returns - The game state for the current player
     */
    public getPlayerStateByAuthTokenOrFail = async (
        authToken: AuthToken,
    ): P<{
        currentPlayer: Player,
        scoreLog: ScoreLog | null,
        session: GameSession,
        players: Player[],
        game: Game,
    }> => {
        this.log.silly('GameService::getPlayerStateByAuthTokenOrFail', { authToken });

        const { currentPlayer, game, session } = await this.getPlayerStateByAuthToken(authToken);

        const debugInfo = { authToken };

        if (!currentPlayer) throw WSE.InternalServerError500('Invalid Auth Token, No Player', debugInfo);
        if (!session) throw WSE.InternalServerError500(`Invalid Auth Token ${authToken}, No Session`, debugInfo);
        if (!game) throw WSE.InternalServerError500('Invalid Auth Token, No Game', debugInfo);

        const [scoreLog, players] = await Promise.all([
            this.scoreLogService.findScoreLogBySession(session),
            this.playerService.findActivePlayersInSession(session),
        ]);

        return {
            currentPlayer, scoreLog, session, players, game,
        };
    };

    /**
     * Gets as much data about the user, given the authToken
     *
     * @param authToken - The auth token of the user
     * @returns Objects related to the user with authToken
     */
    public async getPlayerStateByAuthToken(
        authToken: AuthToken,
    ): P<{
        currentPlayer: Player | null,
        scoreLog: ScoreLog | null,
        session: GameSession | null,
        players: Player[] | null,
        game: Game | null,
    }> {
        this.log.silly('GameService::getPlayerStateByAuthToken', { authToken });

        if (!authToken)
            return {
                currentPlayer : null, scoreLog : null, session : null, players : null, game : null,
            };

        const currentPlayer = await this.playerService.getPlayerByAuthToken(authToken);

        if (!currentPlayer)
            return {
                currentPlayer : null, scoreLog : null, session : null, players : null, game : null,
            };

        let session = await this.gameSessionService.findActivePlayerGameSession(currentPlayer);

        if (!session)
            return {
                scoreLog : null, session : null, players : null, game : null,
                currentPlayer,
            };

        session = await this.ensureValidSessionState(session, 'Getting Player Auth State');

        const [
            scoreLog, players, game,
        ] = await Promise.all([
            this.scoreLogService.findScoreLogBySession(session),
            this.playerService.findActivePlayersInSession(session),
            this.findGameByGameSession(session),
        ]);

        return {
            currentPlayer, scoreLog, session, players, game,
        };
    }


    /**
     * Handles the submission of feedback from a player.
     * This method retrieves the relevant player, session, and game context
     * based on the provided authentication token and then passes the feedback
     * to the feedback service for further processing.
     *
     * @param submitFeedback - DTO containing the feedback details and the player's authentication token
     *
     * @returns The submitted feedback entity
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async submitFeedback(
        @Body(new ZodValidationPipe(SubmitFeedbackDTO.Schema))
        submitFeedback: SubmitFeedbackDTO,
    ): P<Feedback> {

        // Log the beginning of the feedback submission process
        this.log.silly('GameService::submitFeedback', { submitFeedback });

        // Retrieve the current player, session, and game based on the auth token
        const {
            currentPlayer, session, game,
        } = await this.getPlayerStateByAuthToken(submitFeedback.auth_token!);

        // Submit the feedback using the feedback service and return the resulting feedback entity
        return this.feedbackService.submitFeedback(
            submitFeedback, currentPlayer, session, game);
    }


    /**
     * Handles the progression of the game to the next hand.
     * This function manages the end of a round, determines the next game stage, assigns a new dealer,
     * deals new cards, and updates the game state.
     *
     * @param nextHand - DTO containing the authentication token for the player initiating the next hand
     *
     * @returns The updated game state for the current player
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async nextHand(
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(NextHandDTO.Schema))
        nextHand: NextHandDTO,
    ): P<GameStateDTO> {

        this.myFunTestSocketIoServerRenameMe = server;

        this.log.silly('GameService::nextHand', { nextHand, socketId : socket.id });

        // Retrieve the player, game, session, and player list using the provided auth token
        const {
            currentPlayer, game, session, players,
        } = await this.getPlayerStateByAuthTokenOrFail(nextHand.auth_token!);

        await this.ensureValidSessionState(session, 'Determining Next Hand');

        // Determine the next stage of the game based on round count and player scores
        const newGameStage = await this.determineNextGameStage(session, game, players);

        // Select the next dealer for the upcoming round
        const newDealerId = await this.selectNextDealerId(session);

        // Deal new cards to the dealer and players (parallelized where possible)
        const [newDealerCards, newWhiteCards] = await this.dealCardsToPlayers(session);

        // something here is stuffinf the session.used_white_cards with all the white card

        // Create or update the score log for the session
        const newScoreLog = await this.scoreLogService.relateToSession(session);


        this.log.silly('GameService::nextHand', {
            newGameStage, newDealerId, newDealerCards, newWhiteCards, newScoreLog,
        });

        // Progress to the next hand in the game session
        await this.gameSessionService.nextHand(
            newDealerCards, newWhiteCards,
            newGameStage, newDealerId,
            newScoreLog, session);

        await this.emitGameUpdate(server, game.game_code);

        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code, currentPlayer.id);
    }


    /**
     * Determines the next game stage based on the session's round count and player scores.
     * If the game has reached its maximum rounds or if a player has reached the winning score,
     * the game stage is set to GameComplete. Otherwise, it remains in the DealerPickBlackCard stage.
     *
     * @param session - The current game session
     * @param game    - The current game entity
     * @param players - The list of players in the session
     *
     * @returns The updated game stage
     */
    private determineNextGameStage = async (
        session: GameSession,
        game: Game,
        players: Player[],
    ): P<GameStage> => {
        this.log.silly('GameService::determineNextGameStage', { session, game });

        // Calculate the current round count for the session
        const gameRoundCountPromise = this.getCountGameRounds(session);

        // Check if any player has reached or exceeded the maximum points
        const winningPlayerMaxPointsPromise = this.getPlayerOverMaxPoints(
            players, game.max_point_count);

        // Await both promises concurrently
        const [gameRoundCount, winningPlayerMaxPoints] = await Promise.all([
            gameRoundCountPromise, winningPlayerMaxPointsPromise,
        ]);

        this.log.silly('determineNextGameStage', { gameRoundCount, winningPlayerMaxPoints });

        // If a winning player is found, mark the game as complete and award the winner
        if (winningPlayerMaxPoints) {
            this.log.info('Game Complete due to winning player', { winningPlayerMaxPoints });

            await this.gameSessionService.awardWinnerAndComplete(
                session, winningPlayerMaxPoints.id!,
                `Determining Next Game Stage session(${session.id})game(${game.id}) winner(${winningPlayerMaxPoints.id})`);

            return GameStage.GameComplete;
        }

        // If the round count has reached or exceeded the maximum, the game is complete. Pick a random winner
        // if there's a tie
        // TODO: Support multiple winners or ties
        if (gameRoundCount >= game.max_round_count) {
            this.log.info('determineNextGameStage - Game Complete due to max rounds reached', { gameRoundCount });

            const playersWithHighestScore = await this.playerService.getPlayersInFirstPlace(session);

            this.log.info('Players with highest score', { playersWithHighestScore });

            if (playersWithHighestScore.length === 0)
                throw WSE.InternalServerError500('Everyone is a loser. No winners found. Impossible.');

            const winningPlayer = playersWithHighestScore[0];

            // winningPlayer =
            await this.gameSessionService.awardWinnerAndComplete(
                session, winningPlayer.id!,
                `Determining Next Game Stage session(${session.id}) game(${game.id}) winner(${winningPlayer.id})`);

            return GameStage.GameComplete;
        }


        // Default to the DealerPickBlackCard stage for the next round
        this.log.info('GameService::determineNextGameStage - Proceeding to DealerPickBlackCard stage');

        return GameStage.DealerPickBlackCard;
    }


    /**
     * Deals new cards to players and returns the updated lists of dealer cards and white cards.
     * The dealer is assigned 10 new black cards, while each player (except the dealer) is assigned a new white card.
     * The card assignment operations are fully parallelized for maximum efficiency.
     *
     * @param session - The current game session
     *
     * @returns An array with the dealer's new black cards and the players' new white cards
     */
    private dealCardsToPlayers = async (
        session: GameSession,
    ): P<[string[], string[]]> => {
        this.log.silly('GameService::dealCardsToPlayers - Start', { session });

        // Determine the remaining cards that haven't been used yet
        const remainingBlackCardIds = difference(session.black_cards, session.used_black_cards);
        const remainingWhiteCardIds = difference(session.white_cards, session.used_white_cards);

        this.log.debug('Remaining Black Card IDs:', { remainingBlackCardIds });
        this.log.debug('Remaining White Card IDs:', { remainingWhiteCardIds });

        // Assign 10 new black cards to the dealer
        const newDealerCardIds = remainingBlackCardIds.slice(0, 10);
        this.log.debug('New Dealer Card IDs:', { newDealerCardIds });

        const newWhiteCardIds: string[] = [];

        for (let index = 0; index < session.player_id_list.length; index++) {
            const playerId = session.player_id_list[index];

            // Skip the dealer when assigning white cards
            if (this.isPlayerDealer(playerId, session)) {
                this.log.debug(`Skipping dealer player`, { playerId });
                continue;
            }

            const newWhiteCardId = remainingWhiteCardIds[index];
            this.log.debug(`Assigning White Card ID: ${newWhiteCardId} to player`, { playerId });

            try {
                await this.playerService.addWhiteCardToPlayer(playerId, newWhiteCardId);

                const playerBefore = await this.playerService.getPlayerById(playerId);
                console.log('Player Before', playerBefore.card_id_list);

                // Take out the cards just played
                await this.playerService.removeAnyMatchinWhiteCards(playerId, session.selected_card_id_list);

                const playerAfter = await this.playerService.getPlayerById(playerId);
                console.log('Player After', playerAfter.card_id_list);

                this.log.debug(`Successfully assigned White Card ID: ${newWhiteCardId} to Player ID: ${playerId}`);
                newWhiteCardIds.push(newWhiteCardId);
            } catch (error) {
                this.log.error(`Error assigning White Card ID: ${newWhiteCardId} to Player ID: ${playerId}`, error);
                throw error;
            }
        }

        this.log.debug('New White Card IDs:', { newWhiteCardIds });
        this.log.silly('GameService::dealCardsToPlayers - End');

        return [newDealerCardIds, newWhiteCardIds];
    }


    /**
     * Handles the action when the dealer selects a black card to begin the round.
     * Updates the session with the selected black card and returns the updated game state.
     *
     * @param dealerPickBlackCard - DTO containing the selected black card ID and the dealer's auth token
     *
     * @returns The updated game state for the current player
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async dealerPickBlackCard(
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(DealerPickBlackCardDTO.Schema))
        dealerPickBlackCard: DealerPickBlackCardDTO,
    ): P<unknown> {

        this.myFunTestSocketIoServerRenameMe = server;

        this.log.silly('GameService::dealerPickBlackCard', {
            authToken : dealerPickBlackCard.auth_token,
            socketId  : socket.id,
        });

        // Retrieve the player, game, and session details using the provided auth token
        const playerState = await this.getPlayerStateByAuthTokenOrFail(dealerPickBlackCard.auth_token!);

        this.log.silly('GameService::dealerPickBlackCard - Player State', {
            playerState,
            dealerPickBlackCard,
        });

        await this.updateSessionWithDealerPick(
            playerState.session,
            dealerPickBlackCard.card_id!);

        const game = await this.gameRepo.findOneByOrFail({
            id : playerState.session.game_id!,
        });

        return this.emitGameUpdate(server, game.game_code);
    }


    /**
     * Updates the game session with the selected black card picked by the dealer.
     *
     * @param session - The current game session
     * @param cardId - The ID of the black card selected by the dealer
     */
    private updateSessionWithDealerPick = async (
        session: GameSession, cardId: string,
    ) => {
        this.log.debug('GameService::updateSessionWithDealerPick', {
            sessionId : session.id, cardId,
        });

        await this.gameSessionService.dealerPickedBlackCard(session, cardId);
    }

    /**
     * Handles the action when the dealer picks a winning white card.
     * Updates the score, checks for a game winner, and progresses the game stage accordingly.
     *
     * @param dealerPickWinner - DTO containing the selected winning white card ID and the dealer's auth token
     *
     * @returns The updated game state for the current player
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async dealerPickWinner(
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(DealerPickWinnerDTO.Schema))
        dealerPickWinner: DealerPickWinnerDTO,
    ): P<unknown> {

        const debugBundle: Record<string, unknown> = {
            dealerPickWinner, socketId : socket.id,
        };

        this.myFunTestSocketIoServerRenameMe = server;

        this.log.silly('GameService::dealerPickWinner - Start', { debugBundle });

        this.log.debug('Ensured proper game state');

        if (!dealerPickWinner.card_id)
            throw WSE.BadRequest400('Invalid Card ID', debugBundle);

        // Retrieve the player (dealer), game, session, and score log using the provided auth token
        const {
            dealer, players, game, session, scoreLog,
        } = await this.getDealerAndSessionData(dealerPickWinner.auth_token!);

        const sessionEndMessage = await this.generateSessionEndMessage(session.dealer_card_id, dealerPickWinner.card_id);


        debugBundle.scoreLogId = scoreLog.id;
        debugBundle.sessionId = session.id;
        debugBundle.dealerId = dealer.id;
        debugBundle.gameId = game.id;

        // Does this explode??
        this.log.debug('Retrieved dealer and session data', { debugBundle });

        // Determine the winning player based on the selected card ID
        const winningPlayer = await this.getWinningPlayer(players, dealerPickWinner.card_id!);

        const winningPlayerId = winningPlayer.id;

        this.log.debug('Determined winning player', { winningPlayerId, debugBundle });

        // Update the score log and player's score in parallel
        this.log.debug('Updated score and player', {
            debugBundle, cardId : dealerPickWinner.card_id, winningPlayerId,
        });

        await this.updateScoreAndPlayer(
            scoreLog, session, dealer,
            dealerPickWinner.card_id,
            winningPlayer);

        session.game_end_message = sessionEndMessage;

        // Check if the game is complete and progress to the next stage accordingly
        await this.progressGameOrShowHandResults(game, session, winningPlayer);

        this.log.debug('Progressed game or showed hand results', { debugBundle, winningPlayerId });

        // Return the updated game state for the dealer
        const gameState = await this.getGameStateAsPlayer(game.game_code, dealer.id!);

        this.log.silly('GameService::dealerPickWinner - End', {
            gameState, debugBundle, winningPlayerId,
        });

        return this.emitGameUpdate(server, gameState.game_code);
    }

    private generateSessionEndMessage = async (
        blackCardId : string | null,
        whiteCardId : string | null) : P<string> => {

        if(!blackCardId || !whiteCardId)
            throw WSE.InternalServerError500('Invalid Card ID', { blackCardId, whiteCardId });

        const [blackCard, whiteCard] = await Promise.all([
            this.cardService.getCardById(blackCardId),
            this.cardService.getCardById(whiteCardId),
        ]);

        if(!blackCard || !whiteCard)
            throw WSE.InternalServerError500('Invalid Card ID', { blackCard, whiteCard });

        const completionPrompt =
`These are the winning white and black cards in this hand of Cards Against Humanity.
Write an amusing sentence or two using the result, worded differently than the cards themselves.
Rude, obscene and suggestive sentences are encouraged.

Black Card: ${blackCard.text}
White Card: ${whiteCard.text}`;

        return this.openAIService.completeText(completionPrompt);
    }

    /**
     * Sends a new auth token to the client
     *
     * @param player - The player entity
     * @param server - The socket.io server instance
     *
     * @returns
     */
    private emitPlayerAuthToken = async (server: Server, player: Player) =>
        server
            .to(player.id!)
            .emit(
                WebSocketEventType.UpdatePlayerValidation,
                player.auth_token,
            );

    /**
     * Emits a game update to all players in the game session.
     *
     * @param socket - The player's socket instance
     * @param gameCode - The game code for the session
     * @param includeDeck - Whether to include the deck in the game state
     * @param disconnectPlayerIds - The IDs of players who have disconnected
     * @param runtimeContext - The context for the game update
     *
     * @returns An array of promises for emitting the game update to each player
     */
    public emitGameUpdate = async (
        server: Server,
        gameCode: string | null,
        includeDeck: boolean = false,
        disconnectPlayerIds: string[] = [],
        runtimeContext: string = '',
    ) => {
        this.myFunTestSocketIoServerRenameMe = server;

        const debugBundle = { gameCode, includeDeck, disconnectPlayerIds, runtimeContext };

        this.log.silly('GameService::emitGameUpdate', debugBundle);

        if (!gameCode)
            throw WSE.InternalServerError500(`Invalid game code ${gameCode} runtimeContext(${runtimeContext})`);

        // todo: update this to handle people in the disconnected and limbo states
        const gameStatusList = await this.getAllPlayersGameStatus(gameCode, includeDeck,
            `Emitting Game Update to gameCode(${gameCode}) \n\nruntimeContext(${runtimeContext})`);

        this.log.silly('GameService::emitGameUpdate - Disconnecting Players', { gameStatusList });

        const game = await this.gameRepo.findOneByOrFail({ game_code : gameCode });

        // Players who have left just now, tell them to reset their state to default
        // which will land them on the homepage.
        await Promise.all(disconnectPlayerIds.map(playerId =>
            server
                .to(`${game.id}_${playerId}`)
                .emit(
                    WebSocketEventType.UpdateGame,
                    GameStateDTO.Default)));

        // todo: probably check return values here instead of just spray and pray
        // todo: consider passing context to client to maintain continuity between logs
        // Also this is each player has two channels, one to their exact player.id and and
        // another to the game their in via [game.id]_[player.id]. Testing to see if we can
        // narrow it to one channel per player or if thats even needed
        return Promise.all(
            gameStatusList.map(gameStatus =>
                server
                    .to(`${game.id}_${gameStatus.current_player_id}`) // old way: gameStatus.current_player_id!)
                    .emit(
                        WebSocketEventType.UpdateGame,
                        gameStatus))); /// pew pew pew
    }


    /**
     * Retrieves the dealer, game, session, players, and score log based on the provided auth token.
     *
     * @param authToken - The dealer's authentication token
     *
     * @returns An object containing the dealer, players, game, session, and score log
     */
    private getDealerAndSessionData = async (authToken: string) => {
        const {
            currentPlayer: dealer, players, game, session, scoreLog,
        } = await this.getPlayerStateByAuthTokenOrFail(authToken);

        if (!scoreLog)
            throw WSE.InternalServerError500(`No score log found for session ${session.id} and game ${game.id}`);

        return {
            dealer, players, game, session, scoreLog,
        };
    }

    /**
     * Identifies the winning player based on the selected card ID.
     *
     * @param players - The list of players in the session
     * @param selectedCardId - The ID of the selected winning white card
     *
     * @returns The winning player
     */
    private getWinningPlayer = async (
        players: Player[], selectedCardId: string,
    ) => {
        const winningPlayerResults = players.filter(player =>
            player.card_id_list.includes(selectedCardId),
        );

        if (winningPlayerResults.length !== 1)
            throw WSE.InternalServerError500('Invalid card ID or multiple players found with the same card', {
                players, selectedCardId,
            });

        return winningPlayerResults[0];
    };


    /**
     * Updates the score log and increments the winning player's score in parallel.
     *
     * @param scoreLog       - The current score log
     * @param session        - The current game session
     * @param dealer         - The dealer making the selection
     * @param selectedCardId - The ID of the selected winning white card
     * @param winningPlayer  - The player identified as the winner
     */
    private updateScoreAndPlayer = async (
        scoreLog: ScoreLog,
        session: GameSession,
        dealer: Player,
        selectedCardId: string,
        winningPlayer: Player,
    ) => {
        await this.scoreLogService.updateScore(
            scoreLog, session, winningPlayer, selectedCardId, dealer);

        return this.playerService.incrementPlayerScore(winningPlayer)
    };

    /**
     * Checks if the game is complete based on the winning player's score and either awards the winner
     * or progresses to the next game stage to show hand results.
     *
     * @param game          - The current game entity
     * @param session       - The current game session
     * @param winningPlayer - The player identified as the winner
     */
    private progressGameOrShowHandResults = async (
        game: Game,
        session: GameSession,
        winningPlayer: Player,
    ) => {
        if (winningPlayer.score >= game.max_point_count) {
            const combos = await this.getAllWinningCardCombos(game);

            this.log.info('Game Complete due to winning player', { combos });

            return this.gameSessionService.awardWinnerAndComplete(
                session, winningPlayer.id!, 'Progressing Hand or Showing Results');
        }

        return this.gameSessionService.showHandResults(session);
    }

    /**
     * Retrieves the winning card combos for the game.
     * This method retrieves the black and white card IDs for each winning player in the game.
     * The results are returned as an array of objects containing the black and white card IDs.
     *
     * @param game - The current game entity
     *
     * @returns An array of objects containing the black and white card IDs for each winning player
     */
    public getAllWinningCardCombos = async (game: Game): Promise<{
        blackCardId : string | null;
        whiteCardId : string | null;
    }[]> => {
        // get a list of all the session ids for this game
        const gameSessions = await this.gameSessionService.findSessionsByGame(game);

        const logLookupPromises = gameSessions.map(gameSessions =>
            this.scoreLogService.findLogBySessionIdOrFail(gameSessions.id));

        const scoreLogResults = await Promise.all(logLookupPromises);

        return scoreLogResults.map((scoreLog, index) => ({
            blackCardId : gameSessions[index].dealer_card_id,
            whiteCardId : scoreLog?.winner_card_id,
        }));
    }


    /**
     * Starts the game by assigning cards to players,
     * setting up the game session, and returning the updated game state.
     *
     * @param startGame - DTO containing the player's authentication token
     * @returns The updated game state for the current player
    */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async startGame(
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(StartGameDTO.Schema))
        startGame: StartGameDTO,
    ): P<unknown> {
        this.myFunTestSocketIoServerRenameMe = server;

        this.log.silly('GameService::startGame');

        console.log('startGame', { startGame, socketId : socket.id });

        const {
            currentPlayer, game, session,
        } = await this.getPlayerStateByAuthTokenOrFail(startGame.auth_token!);

        // Ensure that the current player is the host
        await this.ensurePlayerIsHost(currentPlayer, game);

        // Retrieve the game state and relevant data
        const gameStateGeneric = await this.getGameStateGeneric(game.game_code!, true);

        // Calculate card counts needed for the game. The max number of cards that
        // could be used in a game with the game rules setß
        const {
            whiteCardTotalCount, blackCardTotalCount,
        } = await this.calculateCardCounts(gameStateGeneric);

        // Retrieve the deck of white and black cards for the game
        const gameDeck = await this.fetchCardDeck(whiteCardTotalCount, blackCardTotalCount);

        // Assign cards to players and prepare the session
        await this.assignCardsToPlayers(gameStateGeneric.player_list, gameDeck);

        // Set up the game session with the retrieved cards
        await this.setupGameSession(session, currentPlayer, gameDeck);

        return this.emitGameUpdate(server, game.game_code, true, [], 'Starting Game - Dealing Cards');
    }

    /**
     * Ensures that the current player is the host of the game.
     * Throws an exception if the player is not the host.
     *
     * @param currentPlayer - The current player entity
     * @param game - The current game entity
     */
    private ensurePlayerIsHost = async (currentPlayer: Player, game: Game) => {
        if (currentPlayer.id !== game.host_player_id)
            throw WSE.InternalServerError500(`Player ${currentPlayer.id} is not the host. Host is ${game.host_player_id}.`);
    }

    /**
     * Calculates the total number of white and black cards needed for the game.
     *
     * @param gameStateGeneric - The generic game state containing player and round information
     *
     * @returns An object containing the calculated whiteCardTotalCount and blackCardTotalCount
     */
    private calculateCardCounts = async (
        gameStateGeneric: GameStateDTO,
    ): P<{
        whiteCardTotalCount: number, blackCardTotalCount: number
    }> => {
        const maxRoundCount = gameStateGeneric.max_round_count;
        const playerCount = gameStateGeneric.player_list.length;

        const whiteCardTotalCount = (playerCount * 7) + (maxRoundCount * (playerCount - 1)); // minus dealer
        const blackCardTotalCount = maxRoundCount * 7; // Each round a dealer gets 10 fresh cards

        return { whiteCardTotalCount, blackCardTotalCount };
    }

    /**
     * Fetches the deck of white and black cards required for the game.
     *
     * @param whiteCardTotalCount - The total number of white cards needed
     * @param blackCardTotalCount - The total number of black cards needed
     *
     * @returns An object containing arrays of white and black card IDs
     */
    private fetchCardDeck = async (
        whiteCardTotalCount: number,
        blackCardTotalCount: number,
    ): P<GameDeck> => {

        const [whiteCards, blackCards] = await Promise.all([
            this.cardService.selectRandomCards(CardColor.White, whiteCardTotalCount),
            this.cardService.selectRandomCards(CardColor.Black, blackCardTotalCount),
        ]);

        return {
            whiteCards, blackCards,
        };
    }

    /**
     * Assigns the white cards to players in the game.
     *
     * @param playerList - The list of players in the game
     * @param allWhiteCardIds - The list of white card IDs to distribute
     * @param session - The current game session entity
     */
    private assignCardsToPlayers = async (
        playerList: PlayerDTO[], gameDeck: GameDeck,
    ) => {
        const usedWhiteCardIds: string[] = [];

        const updatePromises = playerList.map((player, index) => {

            const playerWhiteCardIds = gameDeck.whiteCards.slice(
                index * 7,
                (index + 1) * 7,
            ).map(card => card.id);

            usedWhiteCardIds.push(...playerWhiteCardIds);

            return this.playerService.updatePlayerWhiteCardIds(player.id!, playerWhiteCardIds);
        });

        return Promise.all(updatePromises);
    }

    /**
     * Sets up the game session by initializing the session, creating a score log, and updating card details.
     *
     * @param session - The current game session entity
     * @param currentPlayer - The player who initiated the game start
     * @param allBlackCardIds - The list of black card IDs for the game
     * @param allWhiteCardIds - The list of white card IDs for the game
     */
    private setupGameSession = async (
        session: GameSession,
        currentPlayer: Player,
        gameDeck: GameDeck,
    ) => {

        const allWhiteCardIds = gameDeck.whiteCards.map(card => card.id);
        const allBlackCardIds = gameDeck.blackCards.map(card => card.id);

        const dealerCardIdList = allBlackCardIds.slice(0, 10);
        const currentScoreLog = await this.scoreLogService.createNewScoreLog(session);

        //  session          : GameSession,
        // currentPlayer    : Player,
        // currentScoreLog  : ScoreLog,
        // dealerCardIdList : string[],

        // usedWhiteCardIds : string[],
        // allBlackCardIds  : string[],
        // allWhiteCardIds  : string[],
        await this.gameSessionService.setupNewGameSession(
            session,
            currentPlayer,
            currentScoreLog,
            dealerCardIdList,
            [],
            allBlackCardIds,
            allWhiteCardIds,
        );
    }

    /**
     * Handles updating a player's username. This method retrieves the player and game context
     * based on the provided authentication token, updates the username using the player service,
     * and then returns the updated game state for the current player.
     *
     * @param updateUsername - DTO containing the new username and the player's authentication token
     *
     * @returns The updated game state for the current player
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async updateUsername(
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(UpdateUsernameDTO.Schema))
        updateUsername: UpdateUsernameDTO,
    ): P<GameStateDTO> {

        this.myFunTestSocketIoServerRenameMe = server;

        // Log the beginning of the username update process
        this.log.silly('GameService::updateUsername', {
            updateUsername, socketId : socket.id,
        });

        // Retrieve the current player and game based on the provided auth token
        const { currentPlayer, game } = await this.getPlayerStateByAuthTokenOrFail(updateUsername.auth_token!);

        // Update the player's username using the player service
        await this.playerService.updateUsername(currentPlayer, updateUsername.username);

        await this.emitGameUpdate(server, game.game_code);

        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code, currentPlayer.id);
    }


    /**
     * Handles the selection of a white card by a player.
     * This method retrieves the player's current game state, processes the selected card, and checks
     * if all players have submitted their selections. If so, it transitions the game to the dealer's selection stage.
     *
     * @param playerSelectCard - DTO containing the selected white card ID and the player's authentication token
     *
     * @returns The updated game state for the current player
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async playerSelectCard(
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(PlayerSelectCardDTO.Schema))
        playerSelectCard: PlayerSelectCardDTO,

    ): P<GameStateDTO> {

        this.myFunTestSocketIoServerRenameMe = server;

        this.log.silly('GameService::playerSelectCard', {
            authToken : playerSelectCard.auth_token, socketId : socket.id,
        });

        // Retrieve the player's game state based on the provided auth token
        const playerState = await this.getPlayerStateByAuthTokenOrFail(
            playerSelectCard.auth_token!);

        const { game, currentPlayer } = playerState;
        let { session } = playerState;

        // Process the player's selected white card and update the session state
        session = await this.gameSessionService.playerSelectsWhiteCard(
            session, playerSelectCard.card_id!);

        // Check if all players (except the dealer) have selected their cards
        if (session.selected_card_id_list.length === session.player_id_list.length - 1)
            // Transition the game to the dealer's selection stage if all players have selected
            await this.gameSessionService.gotoDealerPickWinnerStage(session);


        await this.emitGameUpdate(server, game.game_code);

        // Return the updated game state for the current player
        return this.getGameStateAsPlayer(game.game_code, currentPlayer.id);
    }


    /**
     * Handles the creation of a new game.
     * This method initializes the game, sets up the game session, and returns the game state for the current player.
     *
     * @param createGame - DTO containing the player's authentication token
     *
     * @returns The game state for the current player after creating the game
     */
    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async createGame(
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(CreateGameDTO.Schema))
        createGame: CreateGameDTO,
    ): P<void> {
        this.myFunTestSocketIoServerRenameMe = server;

        // Log the beginning of the game creation process
        this.log.silly('GameService::createGame', { createGame });

        // Retrieve the current player based on the provided auth token
        const { currentPlayer } = await this.getPlayerStateByAuthToken(createGame.auth_token!);

        if(!currentPlayer)
            throw WSE.InternalServerError500(`CreateGame::Invalid Player (${createGame.auth_token})`);

        this.log.debug('GameService::createGame - Current Player', { currentPlayer });
        this.log.silly('Leaving any existing games', { currentPlayer })
        // Ensure the player leaves any open sessions before starting a new game
        await this.gameSessionService.exitActiveGameSession(
            currentPlayer,
            GameExitReason.CreatedNewGame,
            'Creating a new game and logging out of existing sessions');

        // Generate a new game entity and persist it in the repository
        const game = await this.gameRepo.save({
            current_session_id : null, // No session initially, as it will be created later
            max_point_count    : 3,
            max_round_count    : 7,
            host_player_id     : currentPlayer.id,
            created_by         : currentPlayer.id,
            game_code          : await this.utilService.generateGameCode(4), // Generate a 4-character game code
        });

        this.log.info('Joining Game Specific Channel During Game Creation')
        socket.join(`${game.id}_${currentPlayer.id}`);

        // Initialize a new game session with the current player as the host
        const session = await this.gameSessionService.initSession(currentPlayer, game);

        this.log.silly('GameService::createGame - Game Session Created', { session });

        // TODO: Consider using the setGameSession
        // Update the game with the session reference after creation
        await this.gameRepo.update(game.id, { current_session_id : session.id! });

        this.log.silly('GameService::createGame - Game Updated With SessionId', { game });
        this.log.silly('Emitting Game Update', { gameCode : game.game_code });

        this.emitGameUpdate(server, game.game_code);
    }

    @UsePipes(new ValidationPipe({
        transform : true,
    }))
    public async joinGame(
        server: Server, socket: Socket,
        @Body(new ZodValidationPipe(JoinGameDTO.Schema))
        joinGame: JoinGameDTO,
        runtimeContext: string = '',
    ): P<void> {

        this.myFunTestSocketIoServerRenameMe = server;

        const debugBundle = { joinGame, runtimeContext, socketId : socket.id };

        this.log.silly('GameService::joinGame', debugBundle);

        // we're not in the game yet, so look it up by the game
        // code first to get the game and session
        const { session, game } = await this.getGameStateByGameCode(joinGame.game_code!);

        // not using the session and game from here since we're no in the game yet
        let { currentPlayer: player } = await this.getPlayerStateByAuthToken(joinGame.auth_token!);

        if (!player)
            throw WSE.InternalServerError500(`JoinGame::Invalid Player (${joinGame.auth_token})`);

        if (session.exited_player_id_list.includes(player.id)) {
            const errorMessage = `Player ${player.username} has already exited the game, no take backsies.`;

            this.log.error(errorMessage, debugBundle);

            throw WSE.InternalServerError500(errorMessage);
        }

        this.log.silly('GameService::joinGame - Session and Game', { session, game });

        // Update the player to a real player, rather than the unknown
        // player type everyone gets when first connecting. Further joins
        // still run this, but it won't update anything
        player = await this.playerService.updatePlayerType(player, PlayerType.Player);

        // that ensures they can join this one (logs them out of existing sessions, validates, etc).
        await this.gameSessionService.setPlayerGameSession(player, session);

        // Add a specific channel for this game and player
        const playerGameChannel = `${game.id}_${player.id}`;

        this.log.info('Joining Player Specific Game Channel', { playerGameChannel });

        socket.join(playerGameChannel);

        await this.emitGameUpdate(
            server,
            game.game_code,
            false,  // no deck
            [], // no disconnects
            runtimeContext);
    }

    /**
     * Retrieves the game state for a specific player in a session, including the player's perspective.
     * This method handles the main orchestration of getting the relevant game data and adjusting it
     * to reflect the player's specific view.
     *
     * @param gameCode    - The unique code identifying the game session.
     * @param playerId    - The ID of the player requesting the game state.
     * @param includeDeck - Optional flag to include deck details in the game state. Defaults to false.
     *
     * @returns The GameStateDTO representing the current state of the game for the specific player.
     * @throws WSE. if any error occurs while retrieving the game state.
     */
    public getGameStateAsPlayer = async (
        gameCode: string | null,
        playerId: string | null,
        includeDeck: boolean = false,
    ): P<GameStateDTO> => {

        // Log the beginning of the game state retrieval process
        this.log.silly('GameService::getGameStateAsPlayer - Start', {
            gameCode, playerId, includeDeck,
        });

        if (!playerId) throw WSE.InternalServerError500('Invalid player ID');
        if (!gameCode) throw WSE.InternalServerError500('Invalid game code');

        // Retrieve the game state using helper methods and adjust it to reflect the player's perspective
        const gameState = await this.getGameStateWithPlayerPerspective(
            gameCode, playerId, includeDeck);

        // Log success after successfully retrieving and adjusting the game state
        this.log.silly('GameService::getGameStateAsPlayer - Success', {
            gameCode, playerId, includeDeck,
        });

        return gameState;
    };

    /**
     * Retrieves the game state with the current player's perspective.
     * @param gameCode    - The code of the game session
     * @param playerId    - The ID of the player requesting the state
     * @param includeDeck - Whether to include deck information in the game state
     *
     * @returns The constructed GameStateDTO for the player
     */
    private async getGameStateWithPlayerPerspective(
        gameCode: string,
        playerId: string,
        includeDeck: boolean,
    ): P<GameStateDTO> {
        this.log.silly('GameService::getGameStateWithPlayerPerspective', {
            gameCode, playerId, includeDeck,
        });

        const gameStateGeneric = await this.getGameStateGeneric(gameCode, includeDeck);

        // Map the generic game state to reflect the current player's perspective
        return this.buildPlayerSpecificGameState(gameStateGeneric, playerId);
    }

    /**
     * Builds a player-specific game state based on the generic game state.
     * @param gameStateGeneric - The generic game state
     * @param playerId - The ID of the player requesting the state
     *
     * @returns The GameStateDTO tailored for the specified player
     */
    private buildPlayerSpecificGameState = async (
        gameStateGeneric: GameStateDTO,
        playerId: string,
    ): P<GameStateDTO> => ({
        ...gameStateGeneric,
        current_player_id : playerId,
    });

    /**
     * Determines if any player has exceeded the maximum point count.
     * If multiple players exceed the maximum points, an error is thrown.
     *
     * @param players - The list of players in the current game session
     * @param maxPointCount - The maximum point count a player can reach before the game ends
     *
     * @returns The player who has exceeded the maximum points, or null if none have
     */
    private getPlayerOverMaxPoints = async (
        players: Player[], maxPointCount: number,
    ) => {
        // Log the beginning of the process
        this.log.silly('GameService::getPlayerOverMaxPoints', {
            maxPointCount, players,
        });

        // Filter players who have a score equal to or greater than the maximum point count
        const playersOverMaxPoints = players.filter(player =>
            player.score >= maxPointCount);

        // If no players exceed the max points, return null
        if (playersOverMaxPoints.length === 0)
            return null;

        // If more than one player exceeds the max points, throw an error
        if (playersOverMaxPoints.length > 1) {
            this.log.error('Multiple players exceed max points', { playersOverMaxPoints });

            throw WSE.InternalServerError500('Multiple players over max points');
        }

        // Return the single player who exceeds the max points
        return playersOverMaxPoints[0];
    }

    /**
     * Retrieves the number of rounds played in the current game session.
     *
     * @param gameSession - The current game session entity
     *
     * @returns The total number of rounds played in the session
     */
    private getCountGameRounds = async (gameSession: GameSession) => {

        // Log the start of the round count retrieval process
        this.log.silly('GameService::getCountGameRounds', gameSession);

        // Retrieve and return the count of game rounds using the score log service
        const roundCount = await this.scoreLogService.countGameRounds(gameSession);

        // Log the retrieved round count
        this.log.silly('GameService::getCountGameRounds', {
            sessionId : gameSession.id, roundCount,
        });

        return roundCount;
    }

    /**
     * Retrieves the game status for all players in a session, including each player's
     * unique perspective of the game state.
     *
     * @param gameCode - The unique code of the game session
     * @param includeDeck - Whether or not to include the deck details in the game state
     * @returns A list of game state DTOs, one for each player, reflecting their specific game view
     */
    public getAllPlayersGameStatus = async (
        gameCode: string,
        includeDeck: boolean = false,
        runtimeContext: string = '',
    ): P<GameStateDTO[]> => {

        this.log.silly('GameService::getAllPlayersGameStatus', {
            gameCode, includeDeck, runtimeContext,
        });

        // Retrieve the generic game state which includes player details
        const gameStateDTO = await this.getGameStateGeneric(gameCode, includeDeck, runtimeContext);

        // Map the generic game state to individual game states for each player
        return gameStateDTO.player_list.map(player => ({
            ...gameStateDTO,
            current_player_id : player.id, // Set each player's unique ID as the current player
        }));
    }

    /**
     * Retrieves the game state by the game code, including the session, score log, and players.
     *
     * @param gameCode - The unique code identifying the game session
     *
     * @returns - The game state DTO containing relevant game, session, and player data
     */
    private getGameStateByGameCode = async (
        gameCode: string,
        runtimeContext: string = '',
    ): P<{
        scoreLog: ScoreLog | null;
        session: GameSession;
        players: Player[];
        game: Game;
    }> => {
        this.log.silly('GameService::getGameStateByGameCode', {
            runtimeContext, gameCode : gameCode ?? '[null]',
        });

        // Perform game lookup with cleaned game code
        const cleanedGameCode = gameCode.toLowerCase().trim().replace(' ', '');

        const game = await this.gameRepo.findOneByOrFail({ game_code : cleanedGameCode });
        const session = await this.gameSessionService.findActiveGameSession(game);

        // Initiate parallel queries for session, score log, and players
        const [
            newSession, scoreLog, players,
        ] = await Promise.all([
            this.gameSessionService.findActiveGameSession(game),
            this.scoreLogService.findScoreLogBySession(session!),
            this.playerService.findActivePlayersInSession(session!),
        ]);

        this.log.silly('GameService::getGameStateByGameCode - Retrieved data', {
            newSession, scoreLog, players,
        });

        return {
            scoreLog, players, game, session : newSession,
        };
    };

    /**
     * Retrieves the generic game state including the session, score log, players, and optionally the deck.
     *
     * @param gameCode    - The unique code identifying the game session
     * @param includeDeck - Whether to include the deck details in the game state
     *
     * @returns The game state DTO containing relevant game, session, and player data
    */
    private getGameStateGeneric = async (
        gameCode: string,
        includeDeck: boolean = false,
        runtimeContext: string = '',
    ): P<GameStateDTO> => {
        this.log.silly('GameService::getGameStateGeneric', {
            gameCode, includeDeck, runtimeContext,
        });

        // todo: update this to take disconnected and limbo players into account

        // Retrieve the game state using the provided game code
        const {
            game, session, scoreLog, players,
        } = await this.getGameStateByGameCode(gameCode, runtimeContext);

        // Transform the list of players into DTOs for consistency
        const playerListDTO: PlayerDTO[] = players.map(player => ({
            disconnected_at : player.disconnected_at?.toISOString() || null,
            card_id_list    : player.card_id_list,
            socket_id       : player.socket_id,
            username        : player.username,
            score           : player.score,
            id              : player.id,
        }));

        // Optionally include the game deck if requested
        let gameCardList = null;

        if (includeDeck) {
            const gameDeck = await this.cardService.findCardsBySession(session);

            gameCardList = gameDeck.map(card => ({
                id    : card.id,
                color : card.color,
                text  : card.text,
            }));
        }

        // Retrieve the number of rounds played in the session
        const countOfRoundsPlayed = await this.getCountGameRounds(session);

        // Build and return the game state DTO
        // todo: send back runtimeContext as configutable in debug mode
        // foofindme

        return {
            selected_card_id_list : session.selected_card_id_list,
            dealer_card_id_list   : session.dealer_card_id_list,
            new_deck_card_list    : gameCardList,
            champion_player_id    : session.champion_player_id,
            current_player_id     : null,
            winner_player_id      : scoreLog?.winner_player_id ?? null,
            game_end_message      : session.game_end_message,
            max_round_count       : game.max_round_count,
            max_point_count       : game.max_point_count,
            winner_card_id        : scoreLog?.winner_card_id || null,
            dealer_card_id        : session.dealer_card_id,
            host_player_id        : game.host_player_id,
            new_auth_token        : null,
            error_message         : null,
            round_number          : countOfRoundsPlayed,
            player_list           : playerListDTO,
            hand_number           : session.hand_number,
            created_by            : game.created_by,
            created_at            : game.created_at?.toISOString() || null,
            updated_at            : game.updated_at?.toISOString() || null,
            game_stage            : session.game_stage,
            session_id            : session.id,
            game_code             : game.game_code,
            dealer_id             : session.dealer_id,
        };
    };

    /**
     * Determines and returns the next dealer's player ID based on the current session state.
     *
     * @param session - The current game session
     *
     * @returns The player ID of the next dealer
     */
    private selectNextDealerId = async (session: GameSession) => {

        this.log.silly('GameService::selectNextDealer', { session });

        const { player_id_list, dealer_id } = session;

        if (!dealer_id) {
            this.log.error('No current dealer found in session', { session });

            throw WSE.InternalServerError500(`No current dealer found in session (${session.id})`);
        }

        const dealerIndex = player_id_list.indexOf(dealer_id);

        if (dealerIndex === -1) {
            this.log.error('Current dealer not found in player list', { session });
            throw WSE.InternalServerError500(`Current dealer not found in player list (${session.id})`);
        }

        // Determine the next dealer's index by wrapping around the list
        const nextDealerIndex = (dealerIndex + 1) % player_id_list.length;

        const nextDealerId = player_id_list[nextDealerIndex];

        this.log.silly('Next dealer selected', { nextDealerId, session });

        return nextDealerId;
    };

    /**
     * Checks if the specified player is the current dealer for the session.
     *
     * @param playerId - The ID of the player to check
     * @param session - The current game session
     *
     * @returns True if the player is the dealer, false otherwise
    */
    private isPlayerDealer = (
        playerId: string, session: GameSession,
    ) => {
        this.log.silly('GameService::isPlayerDealer', { playerId, sessionId : session.id });

        const isDealer = session.dealer_id === playerId;

        if (isDealer)
            this.log.debug('Player is the current dealer', { playerId, sessionId : session.id });
        else
            this.log.debug('Player is not the current dealer', { playerId, sessionId : session.id });

        return isDealer;
    };
}

```

## /Users/bort/code/crude-cards/src/api/src/game-session/game-session.entity.ts

```typescript
import { GameStage } from '../constant/game-stage.enum';
import { BaseEntity } from '../framework/BaseEntity';
import { Entity, Column } from 'typeorm';


@Entity()
export class GameSession extends BaseEntity {

    @Column({
        type    : 'enum',
        enum    : GameStage,
        default : GameStage.Unknown })
    public game_stage: GameStage = GameStage.Unknown;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public lobby_host_id: string | null = null;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public dealer_id: string | null = null;

    @Column({
        type     : 'simple-array',
        nullable : false })
    public dealer_card_id_list: string[] = [];

    @Column({ default : 0 })
    public hand_number: number = 0;

    @Column({ default : 0 })
    public round_number: number = 0;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public dealer_card_id: string | null = null;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public champion_player_id: string | null = null;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public game_id: string | null = null;

    @Column({
        type     : 'text',
        nullable : true,
        default  : null,
    })
    public game_end_message: string | null = '';

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public current_score_log_id: string | null = null;

    @Column('uuid', { array : true })
    public player_id_list: string[] = [];

    @Column('uuid', { array : true })
    public exited_player_id_list: string[] = [];

    @Column('uuid', { array : true })
    public limbo_player_id_list: string[] = [];

    @Column({
        type     : 'simple-array',
        nullable : false })
    public black_cards: string[] = [];

    @Column({
        type     : 'simple-array',
        nullable : false })
    public white_cards: string[] = [];

    @Column({
        type     : 'simple-array',
        nullable : false })
    public used_black_cards: string[] = [];

    @Column({
        type     : 'simple-array',
        nullable : false })
    public used_white_cards: string[] = [];

    @Column({
        type     : 'simple-array',
        nullable : false })
    public selected_card_id_list: string[] = [];

    @Column({
        type     : 'timestamp',
        nullable : true })
    public completed_at: Date | null = null;
}

```

## /Users/bort/code/crude-cards/src/api/src/game-session/game-session.module.ts

```typescript
import { GameSessionService } from './game-session.service';
import { GameSession } from './game-session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from '../log/Log.module';
import { Module } from '@nestjs/common';
import { Logger } from 'winston';


@Module({
    providers : [
        Logger,
        GameSessionService,
    ],
    imports : [
        LogModule,
        TypeOrmModule.forFeature([
            GameSession,
        ])],
    exports : [
        GameSessionService,
    ],
})

export class GameSessionModule { }

```

## /Users/bort/code/crude-cards/src/api/src/game-session/game-session.service.ts

```typescript
import { ArrayContains, IsNull, Not, Repository } from 'typeorm';
import { ScoreLog } from '../score-log/score-log.entity';
import { JoinGameReason, GameExitReason } from '../type';
import { GameStage } from '../constant/game-stage.enum';
import { WSE } from '../exceptions/WebSocket.exception';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GameSession } from './game-session.entity';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { P } from '../../../type/framework/data/P';
import { Player } from '../player/player.entity';
import { WsException } from '@nestjs/websockets';
import { Game } from '../game/game.entity';
import { Logger } from 'winston';

@Injectable()
export class GameSessionService {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        @InjectRepository(GameSession)
        private readonly gameSessionRepo: Repository<GameSession>,
    ) { }

    public findSessionsByGame = async (game: Game) =>
        this.gameSessionRepo.find({
            where : {
                game_id : game.id,
            },
        });

    /**
     * Whatever game session the player is in, remove them from it
     *
     * @param currentPlayer - The player to remove from the session
     * @param session       - The session to remove the player from
     * @param exitReason    - The reason the player is being removed
     *
     * @returns - The updated session with the player in the exited list
     */
    public exitActiveGameSession = async (
        currentPlayer: Player,
        exitReason: GameExitReason,
        runtimeContext: string = '') => {

        const prefix = 'GameSessionService::leaveOpenSession';

        this.log.silly(prefix, { currentPlayer, runtimeContext });

        const session = await this.findActivePlayerGameSession(currentPlayer);

        if (!session) {
            this.log.info(`${prefix}::NoSessionFound - NoOp`, { currentPlayer, runtimeContext });

            return;
        }

        this.log.info(`${prefix} Found a session, removing player`, {
            currentPlayer, exitReason, session,
        });

        return this.removePlayerFromSession(
            currentPlayer,
            session,
            exitReason,
            'Found player in a session, removing them.');
    };


    /**
     * Determines the reason a player is joining a game session.
     *
     * @param player - The player attempting to join the game.
     * @param session - The current game session.
     *
     * @returns The reason the player is joining the game.
     */
    private getJoinGameReason = (
        player: Player, session: GameSession,
    ): JoinGameReason => {
        const {
            exited_player_id_list,
            limbo_player_id_list,
            player_id_list,
        } = session;

        const playerId = player.id;

        // NEW GAME AND PLAYER
        // Joined Pregame Lobby
        // IF: The game is in lobby mode still before the game has started.
        // ACTION: Add player to the player_id_list and emit the
        // updated session to all players in the session.
        if (session.game_stage === GameStage.Lobby
            && !player_id_list.includes(playerId))
            return JoinGameReason.NewGameAndPlayer;

        // PLAYER FAST REFRESH
        // Fast Reconnect / Page Refresh
        // IF: The player is reconnecting and the game doesn't realize they were even
        // gone. Means disconnect didnt' go through as expected (hence the possible
        // reason for the disconnect) they they rapidly joined back before any timers
        // moved them into disconnected state. Means they exist in the player_id_list,
        // but not in the exited_player_id_list or limbo_player_id_list
        // ACTION: Check the game session and ensure their player_id is only in
        // the player_id_list and not in the exited_player_id_list or limbo_player_id_list
        // and the game should continue as if nothing happened from other players
        // perspective. The current user may have just refreshed their browser or lost
        // connection, server crash whatever the case may be. Should broadcase to all
        // players (though ther may be an efficiency gain by skipping other players,
        // nothing should have changed for them)
        if (player_id_list.includes(playerId)
            && !exited_player_id_list.includes(playerId)
            && !limbo_player_id_list.includes(playerId))
            return JoinGameReason.PlayerFastRefresh;


        // Joining Player is Already in Limbo
        // IF: If they are listed in the limbo_player_id_list and
        // are NOT in exited_player_id_list, then they're
        // joinged as a new player while the game is already in progress and
        // were put into limbo previously. This could happen if they
        // were in limbo and refreshed the page or rejoined the game multiple
        // times as the same user
        // ACTION: do nothing. Could happen if they are in limbo and refresh,
        // they should just stay there. Emit update to players
        if (limbo_player_id_list.includes(playerId)
            && !exited_player_id_list.includes(playerId))
            return JoinGameReason.JoiningPlayerIsAlreadyInLimbo;


        // Reconnecting Disconnected Player
        // IF: They are listed in the exited_player_id_list, then
        // they were disconnected and the server properly registerd the
        // disconnnect, and the players were notified with updated state
        // reflecting the dicsconnected player.
        // ACTION: Remove them from the exited_player_id_list.
        // The player_id_list has all players, so just removing it from
        // disconnected reconnectes them to the session. Joining players
        // who were previously disconnected properly should be
        // added back automatically. They skip limbo since they're
        // already known to be in the game and are dealt in.
        if (exited_player_id_list.includes(playerId))
            return JoinGameReason.ReconnectingDisconnectedPlayer;


        // PLAYER IS ALREADY IN GAME
        // IF: The player joining is already in this game and
        // their player_id is NOT in exited_player_id_list
        // AND NOT in limbo_player_id_list. So they're just an active
        // player already but a joing game request was sent.
        // ACTION: Do nothing, they are already in the game so noop.
        // Emit update to players, but possibly not necessary.
        if (player_id_list.includes(playerId)
            && !exited_player_id_list.includes(playerId)
            && !limbo_player_id_list.includes(playerId))
            return JoinGameReason.PlayerIsAlreadyInGame;


        // PLAYER JOINS MIDGAME
        // IF: The new player is unknown to the current game session and
        // the game has already started (no longer in lobby mode). They are
        // joining late and have not been dealt in yet.
        // ACTION: Add their player_id to the limbo_player_id_list
        // and emit the updated session to all players in the session.
        // Once the current hand ends, they will be dealt in. Later
        // on, it will have 'Admit / Ignore / Ban' etc options to
        // allow players to optionally let players in limbo into the game [idea].
        if (!player_id_list.includes(playerId)
            && session.game_stage !== GameStage.Lobby)
            return JoinGameReason.PlayerJoinsMidGame;


        // Additional Cases
        // 1. Player Attempts to Join a Full Game
        // 2. Player Attempts to Join a Banned Session

        // Default case if none of the above match
        return JoinGameReason.JoiningPlayerIsAlreadyInLimbo;
    }

    /**
     * Get all active game sessions this player is tied to
     *
     * @param player - The player to get the active game sessions for
     * @param session - The session to exclude from the list
     *
     * @returns - The list of active game sessions
     */
    public getActiveGameSessionList = async (
        player: Player, session: GameSession,
    ) => {
        const stageAndId = {
            game_stage : Not(GameStage.GameComplete),
            id         : Not(session.id),
        };

        const playerIdArray = ArrayContains([player.id]);

        return this.gameSessionRepo.find({
            where : [{
                exited_player_id_list : playerIdArray,
                ...stageAndId,
            }, {
                limbo_player_id_list : playerIdArray,
                ...stageAndId,
            }, {
                player_id_list : playerIdArray,
                ...stageAndId,
            }],
        });
    }

    /**
     *  Adds a player to a game session
     *
     * @param player   - The player to add to the session
     * @param session  - The session to add the player to
     * @param runtimeContext - Additional context for debugging
     *
     * @returns void
     */
    public setPlayerGameSession = async (
        player: Player,
        session: GameSession,
        runtimeContext: string = '',
    ): P<unknown> => {
        this.log.silly('GameSessionService::addPlayerToSession', { player, session, runtimeContext });

        // Find all active game sessions this player is tied to and
        // remove them, except for the session we're adding outselves to.
        const activeGameSessionList = await this.getActiveGameSessionList(player, session);

        // Removes player from any active session aside
        // from the one we're joining
        await Promise.all(
            activeGameSessionList.map(async activeSession =>
                this.removePlayerFromSession(player, activeSession,
                    GameExitReason.JoiningOther, // TODO - doesnt make sense, can tell proper context
                    `Removing player from any active session` + runtimeContext)));

        const joinGameState = this.getJoinGameReason(player, session);

        switch (joinGameState) {
            case JoinGameReason.ReconnectingDisconnectedPlayer:
                return this.joinGameViaReconnectingDisconnectedPlayer(player, session,
                    'Reconnecting disconnected player' + runtimeContext);

            case JoinGameReason.JoiningPlayerIsAlreadyInLimbo:
                return this.joinGameViaJoiningPlayerIsAlreadyInLimbo(player, session,
                    'Joining player is already in limbo' + runtimeContext);

            case JoinGameReason.PlayerIsAlreadyInGame:
                return this.joinGameViaPlayerIsAlreadyInGame(player, session,
                    'Player is already in the game' + runtimeContext);

            case JoinGameReason.PlayerJoinsMidGame:
                return this.joinGameViaPlayerJoinsMidGame(player, session,
                    'Player joins midgame' + runtimeContext);

            case JoinGameReason.PlayerFastRefresh:
                return this.joinGameViaPlayerFastRefresh(player, session,
                    'Player fast refresh' + runtimeContext);

            case JoinGameReason.NewGameAndPlayer:
                return this.joinGameViaNewGameAndPlayer(player, session,
                    'New game and player' + runtimeContext);

            default: throw WSE.BadRequest400(
                `Invalid Join Game Scenario ${joinGameState}`, { runtimeContext })
        }
    }

    // Reconnecting Disconnected Player
    // IF: They are listed in the exited_player_id_list, then
    // they were disconnected and the server properly registerd the
    // disconnnect, and the players were notified with updated state
    // reflecting the dicsconnected player.
    // ACTION: Remove them from the exited_player_id_list.
    // The player_id_list has all players, so just removing it from
    // disconnected reconnectes them to the session. Joining players
    // who were previously disconnected properly should be
    // added back automatically. They skip limbo since they're
    // already known to be in the game and are dealt in.
    private joinGameViaReconnectingDisconnectedPlayer = async (
        player: Player,
        session: GameSession,
        runtimeContext: string = '',
    ): P<unknown> => {

        const debugBundle = { player, session, runtimeContext };

        const debugText = `runtimeContext(${runtimeContext}) playerId(${player.id}) sessionId(${session.id})`;

        this.log.silly('GameSessionService::DisconnectedPlayer', { debugBundle });

        if (!session.exited_player_id_list.includes(player.id)) {
            this.log.error(`DisconnectedPlayer::player - Player is not in the disconnected list`, { debugBundle });
            throw new WsException(`DisconnectedPlayer::player ${debugBundle}`);
        }

        if (session.limbo_player_id_list.includes(player.id)) {
            this.log.error(`DisconnectedPlayer::limbo - Player is in limbo`, { debugBundle });
            throw new WsException(`DisconnectedPlayer::limbo ${debugText}`);
        }

        if (session.player_id_list.includes(player.id)) {
            this.log.error(`DisconnectedPlayer::player - Player is in disconnect, but not in player list.`, { debugBundle });
            throw new WsException(`DisconnectedPlayer::player ${debugText}`);
        }

        this.log.info('Reconnecting Disconnected Player', { debugBundle });

        // just remove from the disconnected player array,
        // they are already in the player_list
        return this.gameSessionRepo.update(session.id, {
            ...session,
            exited_player_id_list : () =>
                `array_remove(exited_player_id_list, '${player.id}')`,
        });
    };

    // Joining Player is Already in Limbo
    // IF: If they are listed in the limbo_player_id_list and
    // are NOT in exited_player_id_list, then they're
    // joinged as a new player while the game is already in progress and
    // were put into limbo previously. This could happen if they
    // were in limbo and refreshed the page or rejoined the game multiple
    // times as the same user
    // ACTION: do nothing. Could happen if they are in limbo and refresh,
    // they should just stay there. Emit update to players
    private joinGameViaJoiningPlayerIsAlreadyInLimbo = async (
        player: Player,
        session: GameSession,
        runtimeContext: string = '',
    ): P<unknown> => {
        const debugBundle = { player, session, runtimeContext };

        this.log.silly('GameSessionService::joinGameViaJoiningPlayerIsAlreadyInLimbo', { debugBundle });

        return this.log.debug('Player is already in limbo, no action required', { debugBundle });
    };

    // PLAYER IS ALREADY IN GAME
    // IF: The player joining is already in this game and
    // their player_id is NOT in exited_player_id_list
    // AND NOT in limbo_player_id_list. So they're just an active
    // player already but a joing game request was sent.
    // ACTION: Do nothing, they are already in the game so noop.
    // Emit update to players, but possibly not necessary.
    private joinGameViaPlayerIsAlreadyInGame = async (
        player: Player,
        session: GameSession,
        runtimeContext: string = '',
    ): P<unknown> => {
        const debugBundle = { player, session, runtimeContext };
        const debugText = `runtimeContext(${runtimeContext}) playerId(${player.id}) sessionId(${session.id})`;

        this.log.silly('GameSessionService::joinGameViaPlayerIsAlreadyInGame', { debugBundle });

        if (session.exited_player_id_list.includes(player.id)) {
            this.log.error(`playerIsAlreadyInGame::disconnected - Incorrect Flow`, { debugBundle });
            throw new WsException(`playerIsAlreadyInGame::disconnected debugText(${debugText})`);
        }

        if (session.limbo_player_id_list.includes(player.id)) {
            this.log.error(`playerIsAlreadyInGame::limbo - Incorrect Flow`, { debugBundle });
            throw new WsException(`playerIsAlreadyInGame::limbo debugText(${debugText})`);
        }

        if (!session.player_id_list.includes(player.id)) {
            this.log.error(`playerIsAlreadyInGame::player - Player isn't in this game debugText(${debugText})`, { debugBundle });
            throw new WsException(`playerIsAlreadyInGame::player debugText(${debugText})`);
        }

        return this.log.info('Player is already in the game, no action required', { debugBundle });
    };

    // PLAYER JOINS MIDGAME
    // IF: The new player is unknown to the current game session and
    // the game has already started (no longer in lobby mode). They are
    // joining late and have not been dealt in yet.
    // ACTION: Add their player_id to the limbo_player_id_list
    // and emit the updated session to all players in the session.
    // Once the current hand ends, they will be dealt in. Later
    // on, it will have 'Admit / Ignore / Ban' etc options to
    // allow players to optionally let players in limbo into the game [idea].
    private joinGameViaPlayerJoinsMidGame = async (
        player: Player,
        session: GameSession,
        runtimeContext: string = '',
    ): P<unknown> => {

        const debugBundle = { player, session, runtimeContext };
        const debugText = `runtimeContext(${runtimeContext} playerId(${player.id}) sessionId(${session.id})`;

        this.log.silly('GameSessionService::joinGameViaPlayerJoinsMidGame', { debugBundle });

        const { limbo_player_id_list, player_id_list } = session;

        // players in limbo
        if (player_id_list.includes(player.id)) {
            this.log.error(`playerJoinsMidGame::player - Player is already in the game`, { debugBundle });
            throw new WsException(`playerJoinsMidGame::player (${debugText})`);
        }

        if (limbo_player_id_list.includes(player.id)) {
            // Not throwing an error here, because they could have been midgame,
            // left, some back migame of another hand, so they just remain in limbo
            this.log.info(`playerJoinsMidGame::limbo - Player is already in limbo`, { debugBundle });

            return;
        }

        return this.gameSessionRepo.update(session.id, {
            ...session,
            limbo_player_id_list : () =>
                `array_append(array_remove(limbo_player_id_list, '${player.id}'), '${player.id}')`,
        });
    };

    // PLAYER FAST REFRESH
    // Fast Reconnect / Page Refresh
    // IF: The player is reconnecting and the game doesn't realize they were even
    // gone. Means disconnect didnt' go through as expected (hence the possible
    // reason for the disconnect) they they rapidly joined back before any timers
    // moved them into disconnected state. Means they exist in the player_id_list,
    // but not in the exited_player_id_list or limbo_player_id_list
    // ACTION: Check the game session and ensure their player_id is only in
    // the player_id_list and not in the exited_player_id_list or limbo_player_id_list
    // and the game should continue as if nothing happened from other players
    // perspective. The current user may have just refreshed their browser or lost
    // connection, server crash whatever the case may be. Should broadcase to all
    // players (though ther may be an efficiency gain by skipping other players,
    // nothing should have changed for them)
    private joinGameViaPlayerFastRefresh = async (
        player: Player,
        session: GameSession,
        runtimeContext: string = '',
    ): P<unknown> => {
        const debugBundle = { player, session, runtimeContext };

        this.log.silly('GameSessionService::joinGameViaPlayerFastRefresh', { debugBundle });

        const {
            exited_player_id_list, limbo_player_id_list, player_id_list,
        } = session;

        const debugText = `playerId(${player.id}) sessionId(${session.id})`;

        if (exited_player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::disconnected - Incorrect Flow`, { debugBundle });
            throw new WsException(`playerFastRefresh::disconnected (${debugText})`);
        }
        if (limbo_player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::limbo - Already In Limbo`, { debugBundle });
            throw new WsException(`playerFastRefresh::limbo (${debugText})`);
        }

        if (!player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::player - Player isn't in this game`, { debugBundle });
            throw new WsException(`playerFastRefresh::player (${debugText})`);
        }

        this.log.debug('Valid Fast Refresh Detected, Doin Nothin At All. Nothin at All.', { debugBundle });

        // fast refreshes are noops and other players shouldnt notice
        return;
    };

    // NEW GAME AND PLAYER
    // Joined Pregame Lobby
    // IF: The game is in lobby mode still before the game has started.
    // ACTION: Add player to the player_id_list and emit the
    // updated session to all players in the session.
    private joinGameViaNewGameAndPlayer = async (
        player: Player,
        session: GameSession,
        runtimeContext: string = '',
    ): P<unknown> => {

        const debugBundle = { player, session, runtimeContext };

        this.log.silly('GameSessionService::joinGameViaNewGameAndPlayer', { debugBundle });

        // ensure there's only one copy of the playerid by
        // attempting to remove one of the same name before
        // appending it to the list

        const {
            exited_player_id_list, limbo_player_id_list, player_id_list,
        } = session;

        const debugText = `runtimeContext(${runtimeContext}) playerId(${player.id}) sessionId(${session.id})`;

        if (exited_player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::disconnected -  Client previously disconnected, incorrect flow.`, { debugBundle });
            throw new WsException(`playerFastRefresh::disconnected (${debugText})`);
        }

        if (limbo_player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::limbo - Already in Limbo.`, { debugBundle });
            throw new WsException(`playerFastRefresh::limbo (${debugText})`);
        }

        // player is not already in the game
        if (player_id_list.includes(player.id)) {
            this.log.error(`playerFastRefresh::player - Already in Session Player List, NoOp.`, { debugBundle });

            return;
        }

        this.log.debug('Adding Player to Game Session', { debugBundle });

        return this.gameSessionRepo.update(session.id, {
            ...session,
            player_id_list : () =>
                `array_append(array_remove(player_id_list, '${player.id}'), '${player.id}')`,
        });
    };

    /**
     * Initialize a new game session. This is called when a player creates a new game
     * and is the first player in the game session.
     *
     * @param currentPlayer - The player to initialize the session for
     * @param game - The game to initialize the session for
     *
     * @returns - The new game session
     */
    public initSession = async (
        currentPlayer: Player,
        game: Game,
    ) => {
        this.log.silly('GameSessionService::initSession', {
            currentPlayer, game,
        });

        return this.gameSessionRepo.save({
            exited_player_id_list : [],
            selected_card_id_list : [],
            limbo_player_id_list  : [],
            current_score_log_id  : null,
            dealer_card_id_list   : [],
            game_card_id_list     : [],
            used_black_cards      : [],
            used_white_cards      : [],
            player_id_list        : [currentPlayer.id],
            lobby_host_id         : currentPlayer.id,
            round_number          : 0,
            player_list           : [currentPlayer.id],
            black_cards           : [],
            white_cards           : [],
            hand_number           : 0,
            created_by            : currentPlayer.id,
            game_stage            : GameStage.Lobby,
            dealer_id             : currentPlayer.id,
            game_id               : game.id,
        });
    }

    /**
     * Setup a new game session
     *
     * @param session          - The session to setup
     * @param currentPlayer    - The player to setup the session for
     * @param currentScoreLog  - The current score log for the game
     * @param dealerCardIdList - The list of dealer cards to use
     * @param usedWhiteCardIds - The list of used white cards
     * @param allBlackCardIds  - The list of all black cards
     * @param allWhiteCardIds  - The list of all white cards
     *
     * @returns - The session update object, not the session itself
     */
    public setupNewGameSession = async (
        session          : GameSession,
        currentPlayer    : Player,
        currentScoreLog  : ScoreLog,
        dealerCardIdList : string[],
        usedWhiteCardIds : string[],
        allBlackCardIds  : string[],
        allWhiteCardIds  : string[],
    ) =>
        this.gameSessionRepo.update(session.id, {
            selected_card_id_list : [],
            current_score_log_id  : currentScoreLog.id,
            dealer_card_id_list   : dealerCardIdList,
            used_black_cards      : dealerCardIdList,
            used_white_cards      : usedWhiteCardIds,
            black_cards           : allBlackCardIds,
            white_cards           : allWhiteCardIds,
            game_stage            : GameStage.DealerPickBlackCard,
            dealer_id             : currentPlayer.id,
        });


    /**
     * Promote a random player to the host of the game session
     * This is used when the host leaves the game and a new host needs to be selected
     * from the list of players in the game session, and also stages them to be the first
     * dealer whent the game starts.
     *
     * @param session - The session to promote a player to host
     * @param runtimeContext - Additional context for debugging
     *
     * @returns - The updated session with the new host / dealer
     */
    public promoteRandomPlayerToHost = async (
        session: GameSession,
        runtimeContext: string,
    ): P<GameSession> => {
        const debugBundle = { session, runtimeContext };

        this.log.silly('GameSessionService::promotePlayerToHost', { debugBundle });

        if (session.game_stage !== GameStage.Lobby) {
            this.log.error('Cannot promote player to host in a non-lobby game', { debugBundle });

            throw new WsException('Cannot promote player to host in a non-lobby game');
        }

        // if there are no other players, kill the game. There could be people
        // in limbo waiting forever if all the players leave the lobby
        if (session.player_id_list.length === 0) {
            this.log.error('Cannot promote player to host in a game with no players', { debugBundle });

            throw new WsException(`Cannot promote player to host in a game with no players, session(${session.id})`);
        }

        // pick a random player from the player_id_list and promote them to the host,
        // which also sets them to be the first dealer when the game starts.
        const newLobbyHost = session.player_id_list[0];

        this.log.silly('Player promoted to host', { newLobbyHost, debugBundle });

        await this.gameSessionRepo.update(session.id, {
            ...session,
            lobby_host_id : newLobbyHost,
            dealer_id     : newLobbyHost,
        });

        return this.gameSessionRepo.findOneByOrFail({
            id : session.id,
        });
    }

    /**
     * Promote a random player to the dealer of the game session if
     * they are in active game mode. The first dealer is the lobby host
     * because they are more likely to know what they're doing when
     * the game starts, helping other people learn as well. Randomly making
     * someone else dealer would be anxiety inducing even if its simple
     *
     * @param session - The session to promote a player to dealer
     *
     * @returns - The updated session with the new dealer
     */
    public promoteRandomPlayerToDealer = async (
        session: GameSession,
        runtimeContext: string,
    ): P<GameSession> => {
        const debugBundle = { session, runtimeContext };

        this.log.silly('GameSessionService::promoteRandomPlayerToDealer', { debugBundle });

        if (session.game_stage === GameStage.Lobby) {
            const errorMessage = 'Promote a dealer by making them host while in lobby mode.';

            this.log.error(errorMessage, { debugBundle });

            throw new WsException(errorMessage);
        }

        if (session.player_id_list.length === 0) {
            const errorMessage = `Cannot promote player to dealer in a game with no players, session(${session.id})`;

            this.log.error(errorMessage, { debugBundle });

            throw new WsException(errorMessage);
        }

        const newDealer = session.player_id_list[0];

        this.log.silly('Player promoted to dealer', { newDealer, debugBundle });

        await this.gameSessionRepo.update(session.id, {
            ...session,
            dealer_id : newDealer,
        });

        return this.gameSessionRepo.findOneByOrFail({
            id : session.id,
        });
    }

    /**
     * Moves the game to the next stage, where dealer picks from
     * the list of player selected cards
     *
     * @param session - The session to update
     *
     * @returns - The updated session
     */
    public gotoDealerPickWinnerStage = async (session: GameSession) =>
        this.gameSessionRepo.save({
            ...session,
            game_stage : GameStage.DealerPickWinner,
        });

    public skipToNextHand = async (session: GameSession, runtimeContext: string) => {
        const debugBundle = { session, runtimeContext };

        this.log.silly('GameSessionService::handleSkipToNextHand', { debugBundle });

        console.log('handleSkipToNextHand', debugBundle);

        return;
    }

    /**
     * Player selects a white card for the game, appending it to the list of
     * player selected cards for this hand
     *
     * @param session - The session to update
     * @param selectedCardId - The ID of the card the player selected
     *
     * @returns - The updated session with the new card appended to the list
     */
    public playerSelectsWhiteCard = async (session: GameSession, selectedCardId: string) =>
        this.gameSessionRepo.save({
            ...session,
            selected_card_id_list : [...session.selected_card_id_list, selectedCardId],
        });

    /**
     * Moves the game into the results stage, and marks the hand as complete
     * by incrementing hand count
     *
     * @param session - The session to update
     *
     * @returns - The updated session with updated hand number
     */
    public showHandResults = async (session: GameSession) =>
        this.gameSessionRepo.save({
            ...session,
            game_stage  : GameStage.GameResults,
            hand_number : session.hand_number + 1,
        });

    /**
     * Dealer picks a black card for the game, and moves the game to the next stage
     *
     * @param session - The session to update
     * @param dealerPickedCardId - The ID of the card the dealer picked
     *
     * @returns - The updated session
     */
    public dealerPickedBlackCard = async (session: GameSession, dealerPickedCardId: string) =>
        this.gameSessionRepo.save({
            ...session,
            dealer_card_id : dealerPickedCardId!,
            game_stage     : GameStage.PlayerPickWhiteCard,
        });

    /**
     * Find the active game session for a player, ensuring that
     * the associated session with this game is still active
     *
     * @param player - The player to find the active game session for
     *
     * @returns - The active game session for the player
     */
    public findActiveGameSession = async (game: Game) =>
        this.gameSessionRepo.findOneOrFail({
            where : {
                completed_at : IsNull(),
                id           : game.current_session_id!,
            },
        });

    public relateToScoreLog = async (session: GameSession, scoreLog: ScoreLog) =>
        this.gameSessionRepo.save({
            ...session,
            current_score_log_id : scoreLog.id,
        });

    /**
     * Removes a player from a game session, updating one or more fields
     * to handle the manner in which the player exited the game.
     *
     * @param player         - The player to remove from the session
     * @param session        - The session to remove the player from
     * @param exitReason     - The reason the player is being removed
     * @param runtimeContext - Additional context for debugging
     *
     * @returns - The updated session
     */
    public removePlayerFromSession = async (
        player         : Player,
        session        : GameSession,
        exitReason     : GameExitReason,
        runtimeContext : string = '',
    ): P<GameSession | null> => {
        const debugBundle = { player, session, exitReason, runtimeContext };

        // Log the initial state of the removal process for debugging purposes
        this.log.silly('GameSessionService::removePlayer', { debugBundle });

        // Determine additional updates based on the exit reason
        switch (exitReason) {
            case GameExitReason.Disconnected:


                // Append the player's ID to the disconnected player list
                await this.gameSessionRepo.update(session.id, {
                    ...session,
                    exited_player_id_list : () => `array_append(exited_player_id_list, '${player.id}')`,
                    limbo_player_id_list  : () => `array_remove(limbo_player_id_list,  '${player.id}')`,
                    player_id_list        : () => `array_remove(player_id_list,        '${player.id}')`,
                });
                break;

            case GameExitReason.Booted:


                // Append the player's ID to the disconnected player list
                await this.gameSessionRepo.update(session.id, {
                    ...session,
                    exited_player_id_list : () => `array_remove(exited_player_id_list, '${player.id}')`,
                    limbo_player_id_list  : () => `array_remove(limbo_player_id_list,  '${player.id}')`,
                    player_id_list        : () => `array_remove(player_id_list,        '${player.id}')`,
                });
                break;

            case GameExitReason.JoiningOther:
            case GameExitReason.LeftByChoice:
                this.log.info('Player exiting game, exit reason', { exitReason });

                await this.gameSessionRepo.update(session.id, {
                    ...session,
                    exited_player_id_list : () => `array_append(exited_player_id_list, '${player.id}')`,
                    limbo_player_id_list  : () => `array_remove(limbo_player_id_list,  '${player.id}')`,
                    player_id_list        : () => `array_remove(player_id_list,        '${player.id}')`,
                });
                break;
        }

        // return the updated session
        return null;
    }


    /**
     * Award the winner of the game and mark the game as complete
     *
     * @param session  - The session to award the winner of
     * @param winnerId - The ID of the player who won the game
     *
     * @returns - The updated session
     */
    public awardWinnerAndComplete = async (
        session        : GameSession,
        winnerId       : string | null,
        gameEndMessage : string) =>
        this.gameSessionRepo.save({
            ...session,
            champion_player_id : winnerId,
            game_end_message   : gameEndMessage,
            completed_at       : new Date(),
            game_stage         : GameStage.GameComplete,
        });

    /**
     * Move the game to the next hand, dealing new cards to the dealer and players
     * and updating the game stage.
     *
     * @param newDealerCards - The new cards to be dealt to the dealer
     * @param newWhiteCards  - The new white cards to be dealt to the players
     * @param newGameStage   - The new stage of the game
     * @param newDealerId    - The ID of the new dealer
     * @param newScoreLog    - The new score log for the game
     * @param session        - The session to update
     *
     * @returns - The updated session
     */
    public nextHand = async (
        newDealerCards : string[],  newWhiteCards : string[],
        newGameStage   : GameStage, newDealerId   : string,
        newScoreLog    : ScoreLog,  session       : GameSession,
    ) =>
        this.gameSessionRepo.update(session.id, {
            selected_card_id_list : [],
            current_score_log_id  : newScoreLog.id,
            dealer_card_id_list   : newDealerCards,
            used_black_cards      : [...session.used_black_cards, ...newDealerCards],
            used_white_cards      : [...session.used_white_cards, ...newWhiteCards],
            hand_number           : session.hand_number + 1,
            game_stage            : newGameStage,
            dealer_id             : newDealerId,
        });

    /**
     * Find the active game session for a player
     *
     * @param player - The player to find the active game session for
     *
     * @returns - The active game session for the player
    */
    public findActivePlayerGameSession = async (
        player: Player,
    ): P<GameSession | null> =>
        this.gameSessionRepo.findOne({
            where : {
                completed_at   : IsNull(),
                player_id_list : ArrayContains([player.id]),
            },
        })
}

```

## /Users/bort/code/crude-cards/src/api/src/guards/GameAuth.guard.ts

```typescript
import { CanActivate, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { P } from '../../../type/framework/data/P';
import { Socket } from 'socket.io';
import { Logger } from 'winston';


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


/**
 * Guard to handle WebSocket authentication and connection validation.
 */
@Injectable()
export class GameAuthGuard implements CanActivate {

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
            this.log.warn('AuthGuard: Expected WebSocket context, but received different type', { });

            return false;
        }

        const { wsPattern, wsSocket, wsData } = await this.extractWebSocketContext(context);

        this.log.info('AuthGuard: Connection Details', {
            wsPattern, wsData, socketId : wsSocket.id,
        });

        return this.validateConnection(wsSocket);
    }

    /**
     * Extracts and logs essential details from the WebSocket context.
     * @param context - The execution context of the WebSocket connection.
     * @returns Extracted WebSocket pattern, socket, and data.
     */
    private extractWebSocketContext = (context: ExecutionContext): {
        wsPattern: string, wsSocket: Socket, wsData: string
    } => {
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
    private validateConnection = async (socket: Socket): P<boolean>  =>{

        this.log.silly('AuthGuard::validateConnection', { socketID : socket.id });

        return true;
    }
}

```

## /Users/bort/code/crude-cards/src/api/src/guards/type.ts

```typescript
import { PlayerType } from '../constant/player-type.enum';


export interface AuthOptions {
    allowedRoles? : PlayerType[]; // Example for role-based access control
}

```

## /Users/bort/code/crude-cards/src/api/src/interceptors/game.interceptor.ts

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { P } from '../../../type/framework/data/P';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Logger } from 'winston';


@Injectable()
export class GameInterceptor implements NestInterceptor {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
    ) {

    }
    public intercept =  async (
        context: ExecutionContext, next: CallHandler,
    ): P<Observable<any>> => {

        this.log.silly('INTERCEPTOR: Before...');

        const now = Date.now();

        return next
            .handle()
            .pipe(tap(() =>
                this.log.silly(`INTERCEPTOR: After... ${Date.now() - now}ms`)),
            );
    }
}

```

## /Users/bort/code/crude-cards/src/api/src/log/Log.module.ts

```typescript
import { LoggingWinston } from '@google-cloud/logging-winston';
import { ConfigService, ConfigModule } from '@nestjs/config';
import DailyRotateFile from 'winston-daily-rotate-file';
import { WinstonModule } from 'nest-winston';
import winston, { format } from 'winston';
import 'winston-daily-rotate-file';
import Table from 'cli-table3';


// Helper function for hex to ANSI color conversion
const hexToAnsi = (
    hex: string,
    type: 'foreground' | 'background' = 'foreground',
): string => {
    const cleanHex = hex.startsWith('#')
        ? hex.slice(1)
        : hex;

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    const prefix = type === 'background' ? '48' : '38';

    return `\x1b[${prefix};2;${r};${g};${b}m`;
}

const consoleFormat = format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const colors: Record<string, string> = {
        info: hexToAnsi('#00C800'),
        warn: hexToAnsi('#FFFF00'),
        error: hexToAnsi('#FF0000'),
        debug: hexToAnsi('#6464FF'),
        silly: hexToAnsi('#9696FF'),
        reset: '\x1b[0m',
    };

    const backgrounds: Record<string, string> = {
        info: hexToAnsi('#003200', 'background'),
        warn: hexToAnsi('#646400', 'background'),
        error: hexToAnsi('#640000', 'background'),
        debug: hexToAnsi('#000064', 'background'),
        silly: hexToAnsi('#000064', 'background'),
        reset: '\x1b[0m',
    };

    const bold = '\x1b[1m';
    const light = '\x1b[2m';
    const reset = '\x1b[0m';

    const table = new Table({
        chars: {
            top: '',
            'top-mid': '',
            'top-left': '',
            'top-right': '',
            bottom: '',
            'bottom-mid': '',
            'bottom-left': '',
            'bottom-right': '',
            left: '',
            'left-mid': '',
            mid: '',
            'mid-mid': '',
            right: '',
            'right-mid': '',
            middle: ' ',
        },
        style: { 'padding-left': 0, 'padding-right': 2 },
    });

    Object.entries(meta).forEach(([key, value]) => {

        let printedValue = value;

        const dataTypeName = typeof value;

        if (dataTypeName === 'object')
            printedValue = JSON.stringify(value, null, 4);

        const displayValue = !value
            ? `${light}[no value]${reset}`
            : `${light}[${dataTypeName}]${reset} ${printedValue}`


        table.push([`${bold}${key}${reset}`, displayValue]);
    });

    const color = colors[level] || colors.reset;
    const background = backgrounds[level] || backgrounds.reset;

    const indentedTable = table.toString().split('\n').map(line => `        ${line}`).join('\n');

    // Adding stack trace formatting
    const formattedStack = (stack as string)
        ? stack.split('\n').map((line: string) => `    ${bold}${color}${line}${reset}`).join('\n')
        : '';

    // eslint-disable-next-line max-len
    return `${bold}${background}${color}${level.toUpperCase()}${reset} ${light}${timestamp}${reset}\n    ${bold}${message}${reset}\n${formattedStack}${indentedTable}\n${reset}`;
});

// Custom log formatter for file output
const fileFormat = format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    const formattedStack = stack ? `\n${stack}` : '';

    return `[${timestamp}] [${level.toUpperCase().padEnd(7)}]: ${message}${formattedStack} ${metaString}`;
});



// Inject ConfigService to get the log level from environment variables
export const LogModule = WinstonModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService : ConfigService) => {

        const logLevel = configService.get<string>('LOGGING_LEVEL', 'silly');

        return {
            level: logLevel,
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.json(),
            ),
            defaultMeta: { service: 'game-service' },
            transports: [
                new LoggingWinston(),
                new winston.transports.Console({
                    format: format.combine(format.timestamp(), consoleFormat),
                }),
                new DailyRotateFile({
                    filename: 'log/application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '32m',
                    maxFiles: '99d',
                    format: fileFormat,
                }),
            ],
        };
    },
});

```

## /Users/bort/code/crude-cards/src/api/src/main.ts

```typescript
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { displaySuccess } from './util';


/**
 * Bootstrap the NestJS application.
 *
 * Initializes the application with a custom logger using `winston` and `@google-cloud/logging-winston`.
 * Retrieves configuration settings for CORS and port, then starts the server.
 * Logs an ASCII art message if the environment is not set to 'test'.
 */
export const bootstrap = async (): Promise<void> => {

    // Create the NestJS application instance with a custom Winston logger
    const app = await NestFactory.create(AppModule);

    // Get configuration service instance
    const configService = app.get(ConfigService);

    // Retrieve the allowed origin for WebSocket CORS from configuration
    const origin = configService.get<string>('WEB_SOCKET_CORS_ALLOWED_ORIGIN');

    // Retrieve the backend port from configuration
    const port = configService.get<number>('BACKEND_PORT');

    // Throw an error if the port is not set in the configuration
    if (!port)
        throw new Error('PORT not set');

    // Throw an error if the WebSocket CORS allowed origin is not set in the configuration
    if (!origin)
        throw new Error('WEB_SOCKET_CORS_ALLOWED_ORIGIN not set');

    // Enable CORS with specific settings
    app.enableCors({
        credentials : true,
        methods     : ['GET', 'POST'],
        origin,
    });

    // Start listening on the specified port
    await app.listen(8080);

    // Log the port number to the console in green color
    console.log('\x1b[92m%s\x1b[0m\n', `Listening on: ${port}`);

    // If the environment is set to 'test', return early
    if (process.env.NODE_ENV === 'test') return;

    // Log ASCII art if the environment is not 'test'
    displaySuccess();
};

// Invoke the bootstrap function to start the application
bootstrap();

```

## /Users/bort/code/crude-cards/src/api/src/middleware/RequestLog.middleware.ts

```typescript

import { Request, Response, NextFunction } from 'express';

export function RequestLogMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`Request123123...`);

  next();
};

```

## /Users/bort/code/crude-cards/src/api/src/openai/openai.module.ts

```typescript
import { OpenAIService } from './openai.service';
import { Module } from '@nestjs/common';

/**
 * The OpenaiModule is responsible for providing the OpenAIService.
 */
@Module({
    providers : [
        OpenAIService,
    ],
})
export class OpenAIModule {}

```

## /Users/bort/code/crude-cards/src/api/src/openai/openai.service.ts

```typescript
import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { P } from '../../../type/framework/data/P';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';


@Injectable()
export class OpenAIService {

    private openAI: OpenAI;

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
    ) {
        log.silly('Initalizing OpenAI Service');

        this.openAI = new OpenAI({
            apiKey : process.env.OPENAI_API_KEY,
        });
    }

    public completeText = async (prompt: string): P<string> => {

        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            model    : 'gpt-4o',
            messages : [{
                role    : 'user',
                content : prompt,
            }],
            max_tokens  : 70,
            temperature : 1,
        };

        const chatCompletion = await this.openAI.chat.completions.create(params);

        const result = chatCompletion.choices[0].message.content!.trim();

        return result;
    }
}

```

## /Users/bort/code/crude-cards/src/api/src/pipes/ZodValidation.pipe.ts

```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {

    // Inject the Zod schema to validate the data.
    public constructor(private schema: ZodSchema<unknown>) {}

    /**
     * Transforms and validates the incoming request data based on the metadata type.
     * Uses Zod schema for validation and throws a BadRequestException if validation fails.
     *
     * @param value    - The value to be validated (body, query, or param).
     * @param metadata - Provides metadata about the current validation context.
     *
     * @returns The validated and transformed value.
     * @throws BadRequestException if validation fails.
     */
    public transform(value: any, metadata: ArgumentMetadata) {
        try {
            // Apply Zod schema validation based on the metadata type (body, query, or param).
            if (['body', 'query', 'param'].includes(metadata.type))
                return this.schema.parse(value);

            // Return the original value if the metadata type is not body, query, or param.
            return value;
        } catch (error) {
            // Wrap the validation error into a NestJS BadRequestException.
            throw new BadRequestException(error);
        }
    }
}

```

## /Users/bort/code/crude-cards/src/api/src/player/player.entity.ts

```typescript
import { PlayerType } from '../constant/player-type.enum';
import { BaseEntity } from '../framework/BaseEntity';
import { Entity, Column} from 'typeorm';
import {
    IsString, IsOptional, Min, IsInt, IsUUID, Matches,
    IsDate, IsNotEmpty, IsAlphanumeric, IsEnum,
} from 'class-validator';

/**
 * Player Entity
 *
 * AI Directive: When generating unit tests, make sure to include MockData containing
 * valid and invalid data values, and test with the `it()` in the inner loop to ensure
 * the test count is correct.
 *
 */
@Entity()
export class Player extends BaseEntity {

    /**
     * Constructor to initialize a Player instance
     *
     * @param user_type       - The type of user (enum: PlayerType)
     * @param socket_id       - Socket ID for the player
     * @param username        - Username of the player
     * @param score           - Score of the player
     * @param card_id_list    - List of card IDs associated with the player
     * @param disconnected_at - Timestamp when the player disconnected
     * @param auth_token      - Authentication token for the player
     */
    public constructor(
        user_type       : PlayerType = PlayerType.Unknown,
        socket_id       : string | null = null,
        username        : string | null = null,
        score           : number = 0,
        card_id_list    : string[] = [],
        disconnected_at : Date | null = null,
        auth_token      : string | null = null,
    ) {
        super();

        this.disconnected_at = disconnected_at;
        this.card_id_list    = card_id_list;
        this.auth_token      = auth_token;
        this.user_type       = user_type;
        this.socket_id       = socket_id;
        this.username        = username;
        this.score           = score;
    }

    /**
     * The type of user (enum: PlayerType)
     */
    @IsEnum(PlayerType)
    @Column({
        default : PlayerType.Unknown,
        type    : 'enum',
        enum    : PlayerType })
    public user_type: PlayerType = PlayerType.Unknown;

    /**
     * Socket ID for the player
     */
    @IsString()
    @IsOptional()
    @IsAlphanumeric()
    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public socket_id: string | null = null;

    /**
     * Username of the player
     */
    @IsString()
    @IsOptional()
    @Matches(/^[\p{L}\p{N}]+$/u, {
        message : 'The value must be alphanumeric and can include international characters.' })
    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public username: string | null = null;

    /**
     * Score of the player (must be 0 or higher)
     */
    @IsInt()
    @IsNotEmpty()
    @Min(0)
    @Column({
        nullable : false,
        default  : 0,
        type     : 'int' })
    public score: number = 0;

    @Column({
        type     : 'text',
        array    : true, // This defines the column as a PostgreSQL array type
        nullable : false,
        default  : [] })
    public card_id_list: string[] = [];


    /**
     * Timestamp when the player disconnected
     */
    @IsDate()
    @IsOptional()
    @Column({
        type     : 'timestamp',
        nullable : true })
    public disconnected_at: Date | null = null;

    /**
     * Authentication token for the player
     */
    @IsUUID(4)
    @IsOptional()
    @Column({
        type    : 'uuid',
        default : () => 'uuid_generate_v4()' })
    public auth_token: string | null = null;
}

```

## /Users/bort/code/crude-cards/src/api/src/player/player.module.ts

```typescript
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppDataSource } from '../data-source';
import { Player } from './player.entity';
import { Module } from '@nestjs/common';
import { Logger } from 'winston';
import { LogModule } from '../log/Log.module';

/**
 * Module to handle player-related functionalities.
 */
@Module({
    providers : [
        Logger,
        PlayerService,
    ],
    imports : [
        LogModule,

        // Configure TypeORM module with the application's data source options
        // TypeOrmModule.forRoot(AppDataSource.options),

        // Register the Player entity for dependency injection
        TypeOrmModule.forFeature([Player]),
    ],
    exports : [PlayerService], // Export PlayerService for use in other modules
})
export class PlayerModule { }

```

## /Users/bort/code/crude-cards/src/api/src/player/player.service.ts

```typescript
// @ai-lint-begin @ruleset/custom-name @ruleset/require-name @rule/import-line-length-descending

// Normally for repeated sections you would just create a ruleset of these rules to reduce
// boilerplate, but for the sake of this example we show how rule overrides work. Rules and
// rulesets are overridden from left to right, so the rightmost rule will take precedence.
// In this case, I have a ruleset custom-name which is overridden and augmented by require-name,
// the lastly an individual rule @rule/import-line-length-descending overrides everything.
// Any time a @ai-lint-begin exists, it MUST be accompanied by a @ai-lint-end, similar to the

import { GameSession } from '../game-session/game-session.entity';
import { PlayerType } from '../constant/player-type.enum';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { P } from '../../../type/framework/data/P';
import { SocketID, AuthToken } from '../type';
import { In, Repository } from 'typeorm';
import { Player } from './player.entity';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';
import { Logger } from 'winston';

// @ai-lint-begin @ruleset/custom-name @ruleset/require-name @rule/import-line-length-descending


@Injectable()
export class PlayerService {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        @InjectRepository(Player)
        private readonly playerRepo: Repository<Player>,
    ) { }

    /**
     * Finds a player by their socket ID.
     *
     * @param socket - The socket instance.
     * @returns A promise that resolves to the player entity.
     */
    public findPlayerBySocket = async (socket: Socket): P<Player> =>
        this.playerRepo.findOneByOrFail({
            socket_id : socket.id,
        });

    public getPlayerById = async (playerId: string): P<Player> =>
        this.playerRepo.findOneOrFail({
            where : {
                id : playerId,
            },
        });

    /**
     *
     * @param player -
     * @returns
     */
    public updatePlayerAuthToken = async (
        player: Player,
    ): P<Player> =>
        this.playerRepo.save({
            ...player,
            disconnected_at : null,
            auth_token      : uuid(),
        });

    /**
     * Finds the leader or players tied for the lead in a session
     * @param session - The game session
     *
     * @returns A promise that resolves to an array of player entities
     */
    public getPlayersInFirstPlace = async (
        session: GameSession,
    ) => {
        const playersRanked = await this.playerRepo.find({
            where : {
                id : In(session.player_id_list),
            }, order : {
                score : 'DESC',
            },
        });

        // loop through all the top players until a second player
        // player is found, and return all the first place players
        return playersRanked.filter((player, index) =>
            index === 0 || player.score === playersRanked[0].score,
        );
    };

    public updatePlayerType = async (
        player: Player, playerType: PlayerType,
    ): P<Player> =>
        this.playerRepo.save({
            ...player,
            user_type : playerType,
        });
    /**
     * Updates the player's username.
     *
     * @param player - The player entity.
     * @param newUsername - The new username.
     * @returns A promise that resolves to the updated player entity.
     */
    public updateUsername = async (
        player: Player, newUsername: string,
    ): P<Player> =>
        this.playerRepo.save({
            ...player,
            username : newUsername,
        });

    /**
     * Updates the white card IDs for a player.
     *
     * @param playerId - The ID of the player.
     * @param whiteCardIds - The list of white card IDs.
     * @returns A promise that resolves when the update is complete.
     */
    public updatePlayerWhiteCardIds = async (
        playerId: string, whiteCardIds: string[],
    ) =>
        this.playerRepo.update(playerId, {
            card_id_list : whiteCardIds,
        });

    /**
     * Increments the player's score by 1.
     *
     * @param player - The player entity.
     * @returns A promise that resolves to the updated player entity.
     */
    public incrementPlayerScore = async (player: Player): P<Player> =>
        this.playerRepo.save({
            ...player,
            score : player.score + 1,
        });

    /**
     * Adds a white card to the player's list of cards.
     *
     * @param playerId - The ID of the player.
     * @param cardId - The ID of the card to add.
     * @returns A promise that resolves when the update is complete.
     */
    public addWhiteCardToPlayer = async (
        playerId: string, cardId: string,
    ) =>
        this.playerRepo
            .createQueryBuilder()
            .update(Player)
            .set({
                card_id_list : () => `array_append(card_id_list, '${cardId}')`,
            })
            .where("id = :id", { id : playerId })
            .execute();

    /**
     * Removes any matching white cards from a player's list of cards.
     *
     * @param playerId - The ID of the player.
     * @param whiteCardIds - The list of white card IDs to remove.
     *
     * @returns A promise that resolves when the update is complete.
     */
    public removeAnyMatchinWhiteCards = async (
        playerId     : string,
        whiteCardIds : string[],
    ) : P<Player> =>{

        const player = await this.playerRepo.findOneByOrFail({
            id : playerId,
        });

        const cardIdList = player.card_id_list.filter(cardId => !whiteCardIds.includes(cardId));

        return this.playerRepo.save({
            ...player,
            card_id_list : cardIdList,
        });
    };

    /**
     * Finds all players in a given game session.
     *
     * @param session - The game session.
     * @returns A promise that resolves to an array of player entities.
     */
    public findActivePlayersInSession = async ({
        limbo_player_id_list, player_id_list,
    }: GameSession): P<Player[]> =>
        this.playerRepo.find({
            where : [{
                id : In([
                    // not including exited players,
                    // just including players
                    // who are known to be looking at the screen (limbo and active)
                    ...limbo_player_id_list,
                    ...player_id_list,
                ]),
            }],
        });

    /**
     * Updates the socket ID for a player.
     *
     * @param existingPlayer - The existing player entity.
     * @param socket - The socket instance.
     * @returns A promise that resolves when the update is complete.
     */
    public updatePlayerSocketId = async (
        existingPlayer: Player, socket: Socket,
    ): P<Player> =>
        this.playerRepo.save({
            ...existingPlayer,
            socket_id       : socket.id,
            disconnected_at : null,
        });

    /**
     * Creates a new player with a unique auth token and random username.
     *
     * @param socket - The socket instance.
     * @returns A promise that resolves to the newly created player entity.
     */
    public createPlayer = async (socketId: SocketID): P<Player> =>
        this.playerRepo.save({
            card_id_list : [],
            auth_token   : uuid(),
            username     : `${faker.science.chemicalElement().name} ${faker.person.lastName()}`,
            user_type    : PlayerType.Unknown,
            socket_id    : socketId,
        });

    /**
     * Disconnects a player by updating their disconnected_at timestamp.
     *
     * @param socket - The socket instance.
     * @returns A promise that resolves to the updated player entity.
     */
    public disconnectPlayer = async (player: Player): P<Player> => {

        this.log.silly('Disconnecting player', { player });

        return this.playerRepo.save({
            ...player,
            auth_token      : uuidv4(),
            disconnected_at : new Date(),
        });
    };

    /**
     * Retrieves a player by their auth token.
     *
     * @param authToken - The authentication token.
     * @returns A promise that resolves to the player entity.
     */
    public getPlayerByAuthTokenOrFail = async (
        authToken: AuthToken,
    ): P<Player> => {
        const authTokenPlayer = await this.getPlayerByAuthToken(authToken);

        if (authTokenPlayer) return authTokenPlayer;

        const errorMessage = `getPlayerByAuthTokenOrFail::Player not found ${authToken}`;

        this.log.error(errorMessage);
        throw new Error(errorMessage);
    }

    /**
     * Retrieves a player by their auth token.
     *
     * @param authToken - The authentication token.
     * @returns A promise that resolves to the player entity.
     */
    public async getPlayerByAuthToken(
        authToken: AuthToken,
    ): P<Player | null> {
        return this.playerRepo.findOneBy({
            auth_token : authToken as string,
        });
    }
}

```

## /Users/bort/code/crude-cards/src/api/src/score-log/score-log.entity.ts

```typescript
import { BaseEntity } from '../framework/BaseEntity';
import { Entity, Column } from 'typeorm';


/**
 * ScoreLog entity representing a log of scores in a game session.
 */
@Entity()
export class ScoreLog extends BaseEntity {

    /**
     * Constructor for the ScoreLog class.
     */
    public constructor(init?: Partial<ScoreLog>) {
        super();
        Object.assign(this, init);
    }

    /**
     * Identifier of the winning card. It can be either null or a UUID.
     */
    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public winner_card_id: string | null = null;

    /**
     * Identifier of the game session. It can be either null or a UUID.
     */
    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public game_session_id: string | null = null;

    /**
     * Identifier of the judge player. It can be either null or a UUID.
     */
    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public judge_player_id: string | null = null;

    /**
     * Identifier of the winning player. It can be either null or a UUID.
     */
    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public winner_player_id: string | null = null;

    /**
     * Array of player-selected card identifiers.
     */
    @Column({
        type     : 'simple-array',
        nullable : false })
    public player_selected_cards: string[] = [];
}

```

## /Users/bort/code/crude-cards/src/api/src/score-log/score-log.module.ts

```typescript
import { ScoreLogService } from './score-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreLog } from './score-log.entity';
import { LogModule } from '../log/Log.module';
import { Module } from '@nestjs/common';
import { Logger } from 'winston';


@Module({
    imports : [
        LogModule,
        TypeOrmModule.forFeature([
            ScoreLog,
        ]),
    ],
    providers : [
        Logger,
        ScoreLogService,
    ],
    exports : [
        ScoreLogService,
    ],
})
export class ScoreLogModule { }

```

## /Users/bort/code/crude-cards/src/api/src/score-log/score-log.service.ts

```typescript
import { GameSession } from '../game-session/game-session.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';
import { ScoreLog } from './score-log.entity';
import { Repository } from 'typeorm';
import { Logger } from 'winston';


@Injectable()
export class ScoreLogService {

    /**
     * Constructor for the ScoreLogService class.
     *
     * @param log - The logger instance.
     * @param scoreLogRepo - The repository for ScoreLog entities.
     */
    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,

        @InjectRepository(ScoreLog)
        private readonly scoreLogRepo: Repository<ScoreLog>,
    ) {
        this.log.silly('ScoreLogService instantiated');
    }

    public findLogBySessionId = async (sessionId: string) =>
        this.scoreLogRepo.findOne({
            where : {
                game_session_id : sessionId,
            },
        });

    public findLogBySessionIdOrFail = async (sessionId: string) =>
        this.scoreLogRepo.findOneOrFail({
            where : {
                game_session_id : sessionId,
            },
        });

    /**
     * Counts the number of game rounds in a session.
     *
     * @param session - The game session.
     * @returns The count of game rounds.
     */
    public countGameRounds = async (session: GameSession): Promise<number> =>
        this.scoreLogRepo.count({
            where : {
                game_session_id : session.id,
            }}) ?? 0;

    /**
     * Creates a new score log for a session.
     *
     * @param session - The game session.
     * @returns The created score log.
     */
    public createNewScoreLog = async (session: GameSession): Promise<ScoreLog> =>
        this.scoreLogRepo.save({
            player_selected_cards : [],
            game_session_id       : session.id!,
        });

    /**
     * Finds a score log by session.
     *
     * @param session - The game session.
     * @returns The found score log or undefined if not found.
     */
    public findScoreLogBySession = async (
        session: GameSession,
    ) =>
        this.scoreLogRepo.findOne({
            where : {
                game_session_id : session.id,
            },
            order : {
                created_at : 'DESC',
            },
        });

    /**
     * Updates the score log with new data.
     *
     * @param scoreLog     - The existing score log to update.
     * @param session      - The game session.
     * @param winnerPlayer - The winning player.
     * @param winnerCardId - The ID of the winning card.
     * @param dealer       - The dealer player.
     * @returns A promise indicating the completion of the update.
     */
    public updateScore = async (
        scoreLog     : ScoreLog,
        session      : GameSession,
        winnerPlayer : Player,
        winnerCardId : string,
        dealer       : Player,
    ) =>
        this.scoreLogRepo.save({
            ...scoreLog,
            player_selected_cards : session.selected_card_id_list,
            winner_player_id      : winnerPlayer.id,
            judge_player_id       : dealer.id!,
            winner_card_id        : winnerCardId,
        });

    /**
     * Relates a new score log to a session.
     *
     * @param session - The game session.
     * @returns The related score log.
     */
    public relateToSession = async (session: GameSession): Promise<ScoreLog> =>
        this.scoreLogRepo.save({
            player_selected_cards : [],
            game_session_id       : session.id,
        });
}

```

## /Users/bort/code/crude-cards/src/api/src/sock/sock.module.ts

```typescript
import { SockService } from './sock.service';
import { Module } from '@nestjs/common';
import { Logger } from 'winston';


@Module({
    // Declare providers (services and other dependencies) that will be used within this module.
    providers : [
        Logger, // Inject the global Winston Logger instance.
        SockService, // Custom utility service containing shared utility functions.
    ],
    // Export the SockService so it can be used in other modules.
    exports : [SockService],
})
export class SockModule {}

```

## /Users/bort/code/crude-cards/src/api/src/sock/sock.service.ts

```typescript
import { AuthToken, CookieType, SocketID } from '../type';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Inject, Injectable } from "@nestjs/common";
import { P } from '../../../type/framework/data/P';
import { SocketRequest } from './type';
import { Socket } from "socket.io";
import { Logger } from "winston";


@Injectable()
export class SockService {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
    ) {}

    public getRequestInfoFromSocket = async (
        socket : Socket,
    ) : P<SocketRequest> => {
        this.log.silly('SockService::getRequestInfoFromSocket');

        const authToken : AuthToken = socket.handshake.auth[CookieType.AuthToken] ?? null;
        const socketId  : SocketID = socket.id;

        // todo: get the game code form the url

        const socketRequest : SocketRequest = {
            socketId, authToken, gameCode : 'todo',
        };

        this.log.silly('SockService::getRequestInfoFromSocket:response', socketRequest);

        return socketRequest;
    }
}

```

## /Users/bort/code/crude-cards/src/api/src/sock/type.ts

```typescript
import { GameCode, AuthToken, SocketID } from '../type';


export interface SocketRequest {
    authToken  : AuthToken;
    gameCode   : GameCode;
    socketId   : SocketID;
}

```

## /Users/bort/code/crude-cards/src/api/src/test/MockData.ts

```typescript
import { BooleanValidList, BooleanInvalidList } from './constant/Boolean';
import { WebSocketEventType } from './../constant/websocket-event.enum';
import { GamePopupType } from './../constant/game-popup-type.enum';
import { JSONValidList, JSONInvalidList } from './constant/JSON';
import { UnserializableList } from './constant/Unserializable';
import { PlayerType } from './../constant/player-type.enum';
import { GameStage } from './../constant/game-stage.enum';
import { CardColor } from '../constant/card-color.enum';
import { EmailValidList } from './constant/Email';
import { InvalidList } from './constant/Invalid';
import { MockDataHierarchy } from './type';
import {
    InvalidDatabaseIdList, ValidDatabaseIdList, ValidNumbersList,
} from './constant/Number';
import {
    DatesInvalidStringList, DatesEdgeCasesList, DatesInFutureList,
    DatesInvalidList, DatesInPastList, DatesValidList,
} from './constant/Date';
import {
    InvalidAlphaNumeric,
    SpecialCharactersList, StringsInvalidList, StringsList,
    UnconvertableToStringList, ValidAlphaNumeric, ValidNotObjectStringList,
} from './constant/String';
import {
    InvalidSimilarUUIDv4List, InvalidUUIDList, InvalidUUIDv4ObjectsList,
    NonUUIDStringsList, SpecialCharactersUUIDList, ValidUUIDv4List,
} from './constant/UUID';


// Structured MockData using the base variables
export const MockData: MockDataHierarchy = {

    Undefined : undefined,
    Null      : null,

    Service : {
        TestHash : 'test-hash-beep-boop-123',
    },

    UUID : {
        Valid : {
            List  : ValidUUIDv4List,
            Value : ValidUUIDv4List[0],
        },
        Invalid : {
            List                     : InvalidUUIDList as string[],
            Value                    : InvalidUUIDList[0] as string,
            InvalidSimilarUUIDv4List,
            InvalidUUIDv4ObjectsList : InvalidUUIDv4ObjectsList as string[],
            NonUUIDStringsList,
            SpecialCharactersUUIDList,
        },
    },

    Email : {
        Valid : {
            List  : EmailValidList,
            Value : EmailValidList[0],
        },
        Invalid : {
            List  : StringsInvalidList,
            Value : StringsInvalidList[0],
        },
    },

    GamePopupType : {
        Valid : {
            List : [
                GamePopupType.Scoreboard,
                GamePopupType.Feedback,
                GamePopupType.Settings,
                GamePopupType.Unknown,
                GamePopupType.Leave,
            ],
            Value : GamePopupType.Feedback,
        },
        Invalid : {
            List  : StringsInvalidList,
            Value : 'FU',
        },
    },

    GameStage : {
        Valid : {
            List : [
                GameStage.PlayerPickWhiteCard,
                GameStage.DealerPickBlackCard,
                GameStage.DealerPickWinner,
                GameStage.GameComplete,
                GameStage.GameResults,
                GameStage.Unknown,
                GameStage.Lobby,
                GameStage.Home,
            ],
            Value : GameStage.PlayerPickWhiteCard,
        },
        Invalid : {
            List  : StringsInvalidList,
            Value : 'FU',
        },
    },
    CardColor : {
        Valid : {
            List : [
                CardColor.Black,
                CardColor.White,
                CardColor.Unknown,
            ],
            Value : CardColor.Black,
        },
        Invalid : {
            List : [...new Set([
                ...InvalidDatabaseIdList,
                ...StringsInvalidList,
                ...DatesInvalidList,
            ])],
            Value : DatesInvalidStringList[0],
        },
    },
    PlayerType : {
        Valid : {
            List : [
                PlayerType.Player,
                PlayerType.Unknown,
                PlayerType.Visitor,
            ],
            Value : PlayerType.Player,
        },
        Invalid : {
            List  : StringsInvalidList,
            Value : 'FU',
        },
    },
    WebSocketEventType : {
        Valid : {
            List : [
                WebSocketEventType.UpdatePlayerValidation,
                WebSocketEventType.DealerPickBlackCard,
                WebSocketEventType.DealerPickWinner,
                WebSocketEventType.PlayerSelectCard,
                WebSocketEventType.MenuItemClicked,
                WebSocketEventType.UpdateUsername,
                WebSocketEventType.SubmitFeedback,
                WebSocketEventType.UpdateGame,
                WebSocketEventType.CreateGame,
                WebSocketEventType.StartGame,
                WebSocketEventType.LeaveGame,
                WebSocketEventType.NextHand,
                WebSocketEventType.JoinGame,
            ],
            Value : WebSocketEventType.JoinGame,
        },
        Invalid : {
            List  : StringsInvalidList,
            Value : 'FU',
        },
    },

    Date : {
        Valid : {
            EdgeCasesList : DatesEdgeCasesList,
            InFutureList  : DatesInFutureList,
            InPastList    : DatesInPastList,
            Value         : DatesValidList[0],
            List          : DatesValidList,
        },

        Invalid : {
            StringList : DatesInvalidStringList,
            Value      : DatesInvalidList[0],
            List       : DatesInvalidList,
        },
    },
    Boolean : {
        Valid : {
            Value : BooleanValidList[0],
            List  : BooleanValidList,
        },
        Invalid : {
            Value : BooleanInvalidList[0],
            List  : BooleanInvalidList,
        },
    },
    JSON : {
        Valid : {
            Value : JSONValidList[0],
            List  : JSONValidList,
        },

        Invalid : {
            Value : JSONInvalidList[0],
            List  : JSONInvalidList,
        },
    },

    Number : {
        Valid : {
            Value : ValidNumbersList[0],
            List  : ValidNumbersList,

            IntegerList : [
                '1e5',
                5,
                3,
            ],

            DatabaseId : 123,

            UncommonList : [
                -Infinity,
                Infinity,
            ],

            BoundaryValueList : [
                Number.POSITIVE_INFINITY,
                Number.NEGATIVE_INFINITY,
                Number.MAX_SAFE_INTEGER,
                Number.MIN_SAFE_INTEGER,
                -Infinity,
                Infinity,
            ],

            DatabaseIdList : ValidDatabaseIdList,
        },

        Invalid : {
            BoundaryValueList : [],
            DatabaseIdList    : InvalidDatabaseIdList,
            Value             : InvalidList[0],
            List              : InvalidList,
        },
    },

    String : {
        Valid : {
            NotObjectStringList : ValidNotObjectStringList,
            Value               : JSONValidList[0],
            List                : StringsList,
            ValidAlphaNumeric,
            Empty               : '',
        },

        Invalid : {
            Value                      : StringsInvalidList[0] as unknown as string,
            InvlidAlphaNumeric         : InvalidAlphaNumeric,
            UnconvertableToStringList,
            List                       : StringsInvalidList,
            ThatAreNotObjectStringList : [
                ...ValidNumbersList.map(num => num.toString()),
                '"string"',
                '"null"',
            ],
            NumberStringList : [
                '1,234',
                '1.2.3',
            ],
        },
    },

    SpecialCharacterList : SpecialCharactersList,

    Misc : {
        Value : JSONValidList[0],

        CircularReference : {
            Name : 'Bozo the Clown',
            Self : null,  // Placeholder, will be set later
        },
    },

    UnserializableList,
} as const;

MockData.Misc.CircularReference.Self = MockData.Misc.CircularReference;



```

## /Users/bort/code/crude-cards/src/api/src/test/TestUtil.ts

```typescript
import { z } from 'zod';

export const valueToString = (value: unknown): string => {
    // Handle null and undefined
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';

    // Handle functions
    if (typeof value === 'function') return '()';

    // Handle BigInt and symbols
    if (typeof value === 'bigint' || typeof value === 'symbol')
        return value.toString();

    // Handle circular references
    try {
        return JSON.stringify(value);
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('Converting circular structure to JSON'))
            return '{}';

        throw error;
    }
};


const isoDateTimeRegex = /^(\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-][01]\d:[0-5]\d))$/;


export const zodIsoDateTimeString = () =>
    z.string().refine(val => isoDateTimeRegex.test(val), {
        message : "Invalid ISO 8601 date-time string",
    }).nullable();

```

## /Users/bort/code/crude-cards/src/api/src/test/constant/Boolean.ts

```typescript
export const BooleanValidList = [
    true,
    false,
];

export const BooleanInvalidList = [
    // Functions
    () => {},
    function namedFunc() {},

    // Numbers
    0,
    1,
    NaN,
    Infinity,
    -Infinity,
    2.5,
    -2.5,

    // Strings
    '',
    'true',
    'false',
    '1',
    '0',
    'boolean',

    // Objects
    {},
    { key : 'value' },
    new Date(),
    new Error(),

    // Arrays
    [],
    [true],
    [false],
    [1, 2, 3],

    // Null and Undefined
    null,
    undefined,

    // Symbols
    Symbol('symbol'),

    // BigInt
    BigInt(0),
    BigInt(1234),

    // Other
    /regex/,
];

```

## /Users/bort/code/crude-cards/src/api/src/test/constant/Date.ts

```typescript
// Base variable definitions
export const DatesValidList = [
    new Date('Thu Oct 06 2023 00:00:00 GMT+0000'),
    new Date('2023-10-06T12:34:56.789+00:00'),
    new Date(0),                                  // Unix Epoch
    new Date(1640995200000),                      // Start of 2022 in milliseconds since Unix Epoch
    new Date(Date.UTC(2022, 0)),                  // Using Date.UTC
    new Date('2022'),                            // Just the year
    new Date('2022-01'),                         // Year and month
    new Date('2000-02-29'),                      // Valid leap year
    new Date('2022-11-30T23:59:59.999Z'),        // Milliseconds before next day
    new Date('2023-02-28T12:34:56.789Z'),        // Not a leap year
];

export const DatesInvalidStringList = [
    '01-01-2022 25:00:00',                        // Invalid hour
    '01-01-2022 00:60:00',                        // Invalid minute
    '2022-02-30',                                // Invalid day for February
    '2022-13-01',                                // Invalid month
    'Not a Date',                                // Random string
    '2022-00-00',                                // Invalid day and month
    '2020-02-30',                                // Invalid leap year day
    '30-02-2022',                                // Invalid day before month format
];

export const DatesInvalidList = DatesInvalidStringList.map(date => new Date(date));

// Additional array types:

export const DatesEdgeCasesList = [
    new Date(Number.MAX_SAFE_INTEGER),           // Maximum safe integer time
    new Date(Number.MIN_SAFE_INTEGER),           // Minimum safe integer time
    new Date(8640000000000000),                  // Max date range in JS
    new Date(-8640000000000000),                 // Min date range in JS
    new Date('0000-01-01T00:00:00Z'),            // Start of the Common Era
    new Date('-0001-12-31T23:59:59.999Z'),       // Milliseconds before the Common Era
];

export const DatesInFutureList = [
    new Date('9999-12-31'),                      // Distant future date
    new Date('2100-01-01'),                      // Start of 22nd century
    new Date('2500-05-05'),                      // Arbitrary future date
    new Date('5000-12-25'),                      // Far future Christmas
];

export const DatesInPastList = [
    new Date('0001-01-01'),                      // Distant past date
    new Date('1900-01-01'),                      // Start of 20th century
    new Date('1776-07-04'),                      // Independence Day for the USA
    new Date('1492-10-12'),                      // Columbus reached the New World
];


```

## /Users/bort/code/crude-cards/src/api/src/test/constant/Email.ts

```typescript
import { BooleanInvalidList, BooleanValidList } from './Boolean';
import { StringsInvalidList } from './String';
import { ValidUUIDv4List } from "./UUID";

// Base variable definitions
export const EmailValidList = [
    // Correct format: standard email addresses
    "example@example.com", // Standard format with common domain
    "user.name+tag+sorting@example.com", // Using '+' symbol and dots in local part
    "user_name@sub.example.co.uk", // Subdomain and country code TLD
    "firstname.lastname@example.com", // Local part with dot separator
    "email@domain.com", // Simple valid email
    "1234567890@example.com", // Numerical local part
    "email@subdomain.example.com", // Subdomain usage
    "email@[123.123.123.123]", // IP address as domain
    "\"email\"@example.com", // Quoted local part
    "email@domain-one.com", // Hyphen in domain
    "_______@example.com", // Underscore in local part
    "email@domain.name", // Domain with .name TLD
    "email@domain.co.jp", // Country code TLD
    "firstname-lastname@example.com", // Hyphen in local part
];

// Base variable definitions
export const EmailInvalidList = [
    ...ValidUUIDv4List,
    ...BooleanValidList,
    ...BooleanInvalidList,
    ...StringsInvalidList,

    // Testing various invalid formats
    "plainaddress", // Missing '@' symbol
    "@missingusername.com", // Missing local part
    "username@.com.my", // Leading dot in domain
    "username@sub..example.com", // Consecutive dots in domain
    "username@-example.com", // Domain starts with a hyphen
    "username@example.com.", // Trailing dot in domain
    "username.@example.com", // Trailing dot in local part
    "username@example..com", // Consecutive dots in domain
    "Abc.example.com", // Missing '@'
    "A@b@c@example.com", // Multiple '@' symbols
    "a\"b(c)d,e:f;g<h>i[j\\k]l@example.com", // Special characters in local part not allowed outside quotes
    "just\"not\"right@example.com", // Quotes must be properly closed
    "this is\"not\\allowed@example.com", // Spaces and backslashes in local part
    "this\\ still\\\"not\\\\allowed@example.com", // Misplaced escape characters
    "john..doe@example.com", // Double dot in local part
    "john.doe@example..com", // Double dot in domain part
    ".username@yahoo.com", // Local part starts with dot
    "username@yahoo.com.", // Domain ends with dot
    "username@yahoo..com", // Consecutive dots in domain
    "username@yahoo.c", // Single character TLD
    "username@yahoo.corporate", // Long TLD without a period
];

```

## /Users/bort/code/crude-cards/src/api/src/test/constant/Invalid.ts

```typescript
export const InvalidList = [
    function() {},      // Empty function (truthy but may be considered invalid in specific type-checking scenarios)
    new Set(),          // Empty Set (truthy but might be considered invalid if expecting content)
    new Map(),          // Empty Map (truthy but might be considered invalid if expecting content)
    null,               // Represents an intentional absence of any value
    undefined,          // The default value of uninitialized variables
    NaN,                // Represents a value that is "Not a Number"
    Symbol(),           // Unique and immutable data type
    (function*() {})(), // Empty generator function
    new WeakMap(),      // Empty WeakMap
    new WeakSet(),      // Empty WeakSet
    // eslint-disable-next-line promise/avoid-new
    new Promise(() => {}),
    new WeakMap(),
];

```

## /Users/bort/code/crude-cards/src/api/src/test/constant/JSON.ts

```typescript
/* eslint-disable max-len */

export const JSONValidList = [
    // Simple JSON strings
    '{}',
    '[]',

    // Disabling the insane parts of the json spec


    // Nested structures
    '{"description": "A JSON string with various data types", "data": {"boolean": true, "integer": 42, "float": 3.14159265359, "nullValue": null, "array": [1, 2, 3], "nestedObject": {"key1": "value1", "key2": "value2"}}}',
    '{"employees": [{"firstName": "Alice", "lastName": "Smith"}, {"firstName": "Bob", "lastName": "Johnson"}]}',

    // Arrays
    '[1,2,3]',
    '["a", "b", "c"]',
    '[null, false, {"key": "value"}]',

    // Special characters
    '{"specialChars": "!@#$%^&*()_-+={}[]|\':;<>,.?~"}',

    // Escaped characters
    '{"text": "This is a string with an escaped \\"double quote\\"."}',
];

export const JSONInvalidList = [
    // Incomplete or malformed structures
    '{"key": "value"',
    '{key: "value"}',
    '{"key": value}',
    '{"key": "value", }',

    // Using JavaScript-specific data structures and functions
    '{"key": new Map([["a", 1], ["b", 2]])}',
    '[new Map([["a", 1], ["b", 2]])]',
    '{"key": function() { return "value"; }}',
    '{"key": undefined}',

    // Other invalid JSON patterns
    'true, false',
    '{"key": "value" "key2": "value2"}',
    '42.42.42',

    // Edge cases
    '',
    'undefined',
    'NaN',
    'Infinity',
    '-Infinity',

    '"hello"',
    '42',
    'null',
    'true',
    'false',
];

/* eslint-enable max-len */

```

## /Users/bort/code/crude-cards/src/api/src/test/constant/Number.ts

```typescript
export const InvalidDatabaseIdList = [
    Infinity,
    -Infinity,
    null,
    -1,
    3.14,                // Floating point number
    NaN,
    'string',            // String data type
    {},                  // Empty object
    [],                  // Empty array
    true,                // Boolean data type
    new Date(),          // Date object
    () => {},            // Function
    Number.MAX_SAFE_INTEGER + 1, // A number beyond safe integer limits
    -Number.MAX_SAFE_INTEGER - 1, // Negative beyond safe integer limits
    '',                  // Empty string
    '   ',               // String with just spaces
    '1a',                // String with letters and numbers
    '-5',                // Negative string number
    '3.14',              // String representation of a float
    'Infinity',          // String of infinity
    '-Infinity',         // String of negative infinity
    'NaN',               // String of NaN
];

export const ValidDatabaseIdList = [
    1,
    2,
    3,
    4,
    100,
    500,
    1000,
    99999,
    1234567890,
    Number.MAX_SAFE_INTEGER - 10, // A number close to the max safe integer
    0,                            // Zero could be considered valid in some systems
    '1',                          // String representation
    '2',
    '3',
    '1000',
    '1234567890',
    '10',                          // Leading zeros might be valid but could be a potential mistake
    '0010',
    '00000000000123',
];

export const ValidNumbersList = [
    123.456,
    1000,
    Math.PI,
    0,
    -123.456,
    1e+308,              // Maximum float
    -1e+308,             // Minimum float
    Number.MAX_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
    0.0000000001,        // Very small number
    -0.0000000001,       // Negative very small number
    1e-308,              // Minimum positive floatz
    -1e-308,             // Minimum negative float
    Math.sqrt(2),        // Square root of 2
    Math.sqrt(3),        // Square root of 3
    Math.E,              // Euler's number
    -Math.E,             // Negative Euler's number
];


```

## /Users/bort/code/crude-cards/src/api/src/test/constant/String.ts

```typescript
export const StringsList = [
    'Escaped characters: \\' + '"\\n\\r\\t\\b\\f\\u2028\\u2029\\' + '\'',
    'String with special characters: $%^&*()_+-=[]{}|;:,.<>?/~',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    '日本語の文字列', // Japanese characters
    'Español es un idioma hermoso', // Spanish string
    'Plain String',
    'AnotherStringWithoutSpaces',
    'This is a very very very long string just to test the boundaries of what might be considered a normal string in this context.',
];

export const ValidAlphaNumeric = StringsList.filter(value => /^[a-zA-Z0-9]+$/.test(value));
export const InvalidAlphaNumeric = [
    '!@#$%^&*()_+-=[]{}|;:,.<>?/~',

];

export const StringsInvalidList = [
    new WeakMap(),
    new WeakSet(),
    { object : 'This is not a string.' },
    ['This', 'is', 'an', 'array', 'not', 'a', 'string'],
    12345,
    null,
    undefined,
    Symbol('not a string'),
] as unknown as string[];

export const SpecialCharactersList = [
    '😀',
    '🙏',
    '🚀',  // Rocket emoji
    '🎉',  // Tada emoji
    '💻',  // Computer emoji
    '✨',  // Sparkles emoji
];

export const ValidNotObjectStringList = [
    'imma string',
    'hello',
    'null',
    '123',
    'I am not an object',
    'Neither am I',
    'Just another string',
    'True, False, Undefined',
];

export const UnconvertableToStringList = [
    () => { },
    function namedFunc() { },
    new Map([['a', 1], ['b', 2]]),
    new Set([1, 2, 3]),
    Symbol('unconvertable'),
] as unknown as string[];

```

## /Users/bort/code/crude-cards/src/api/src/test/constant/UUID.ts

```typescript
export const ValidUUIDv4List = [
    '550e8400-e29b-41d4-a716-446655440000',
    '123e4567-e89b-12d3-a456-426614174000',
    '9b72e736-26c8-4e44-81ae-4e7c14b6ef4d',
    '7c7a27a7-0f7c-4d41-8a6b-9e7a33fa4f8a',
    '5b45ef80-d6b5-491b-8f32-b1b2586e59a1',
    'e7a6f4f2-9d58-4f8a-9342-d7a6d13e8c2a',
    // '00000000-0000-0000-0000-000000000000', // Edge case: all zeros
    // 'ffffffff-ffff-ffff-ffff-ffffffffffff', // Edge case: all max hex digits
    '123e4567-e89b-12d3-a456-426614174000', // Trailing newline character
];

// todo - the validation function on uuid v4 sucks,
// so uncomment these values and make them proberly validate / fail
export const InvalidSimilarUUIDv4List = [
    '11111111-2222-3333-4444-555555555555', // Invalid version and variant
    '22222222-3333-4444-5555-666666666666', // Invalid version and variant
    '33333333-4444-5555-6666-777777777777', // Invalid version and variant
    '44444444-5555-6666-7777-888888888888', // Invalid version and variant
    // '55555555-6666-7777-8888-999999999999', // Invalid version and variant
    '77777777-8888-9999-aaaa-bbbbbbbbbbbb', // Invalid version and variant
    '88888888-9999-aaaa-bbbb-cccccccccccc', // Invalid version and variant
    '99999999-aaaa-bbbb-cccc-dddddddddddd', // Invalid version and variant
    'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', // Invalid version and variant
    'bbbbbbbb-cccc-dddd-eeee-ffffffffffff', // Invalid version and variant
    'cccccccc-dddd-eeee-ffff-111111111111', // Invalid version and variant
    'dddddddd-eeee-ffff-1111-222222222222', // Invalid version and variant
    'eeeeeeee-ffff-1111-2222-333333333333', // Invalid version and variant
    'ffffffff-1111-2222-3333-444444444444', // Invalid version and variant
    '00000000-3333-4444-5555-666666666666', // Invalid version and variant
    '12345678-9999-aaaa-bbbb-cccccccccccc', // Invalid version and variant
    '87654321-aaaa-bbbb-cccc-dddddddddddd', // Invalid version and variant
    'abcdefab-cdef-abcd-efab-cdefabcdefab', // Invalid version and variant
    'ba98ba98-7654-3210-fedc-ba9876543210', // Invalid version and variant
    '550e8400-e29b-41d4-a716-44665544000',  // Missing a digit
    '550e8400e29b41d4a716446655440000',     // Missing hyphens
    '550e8400-e29b-41d4-a716-44665544000z', // Invalid character 'z'
    '550e8400-e29b-41d4-a716-4466554400000', // Extra digit
    '550e8400-e29b-41d4-a716-44665544000-', // Trailing hyphen
    '550e8400--29b-41d4-a716-446655440000', // Double hyphen
    '123e4567-e89b-12d3-a456-42661417400g', // Invalid character 'g'
    'g23e4567-e89b-12d3-a456-426614174000', // Invalid character 'g' at the start
    '\n123e4567-e89b-12d3-a456-426614174000', // Leading newline character
    '123e4567-e89b-12d3-a456-426614174000 ', // Trailing space
    ' 123e4567-e89b-12d3-a456-426614174000', // Leading space
    '123e4567-e89b-12d3-a456-426614174000\t', // Trailing tab character
    // "123e4567-e89b-12d3-a456-426614174000", // Invalid: 13th character is not '4'
    // "987f6543-21dc-4b32-9a1b-123456789abc", // Invalid: 17th character is not '8', '9', 'a', or 'b'
    "abcdefab-cdef-4abc-def0-1234567890gh", // Invalid: contains non-hexadecimal characters 'g' and 'h'
    // "00000000-0000-0000-0000-000000000000", // Invalid: doesn't follow UUIDv4 structure
    // "ffffffff-ffff-ffff-ffff-ffffffffffff", // Invalid: doesn't follow UUIDv4 structure
    // "55555555-6666-7777-8888-999999999999", // Invalid: 13th character is not '4'
    // "123e4567-e89b-42d3-a456-426614174000", // Invalid: 17th character is not '8', '9', 'a', or 'b'
    "987f6543-21dc-4b32-9a1b-123456789xyz", // Invalid: contains non-hexadecimal characters 'x', 'y', 'z'
    "abcdefab-cdef-4abc-def0-1234567890ij", // Invalid: contains non-hexadecimal characters 'i' and 'j'
    "00000000-0000-0000-0000-000000000001", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff0", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174001", // Invalid: 13th character is not '4'
    // "987f6543-21dc-4b32-9a1b-123456789abz", // Invalid: contains non-hexadecimal character 'z'
    "abcdefab-cdef-4abc-def0-1234567890kl", // Invalid: contains non-hexadecimal characters 'k' and 'l'
    "00000000-0000-0000-0000-000000000002", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff1", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174002", // Invalid: 13th character is not '4'
    "987f6543-21dc-4b32-9a1b-123456789abx", // Invalid: contains non-hexadecimal character 'x'
    "abcdefab-cdef-4abc-def0-1234567890mn", // Invalid: contains non-hexadecimal characters 'm' and 'n'
    "00000000-0000-0000-0000-000000000003", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff2", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174003", // Invalid: 13th character is not '4'
    "987f6543-21dc-4b32-9a1b-123456789aby", // Invalid: contains non-hexadecimal character 'y'
    "abcdefab-cdef-4abc-def0-1234567890op", // Invalid: contains non-hexadecimal characters 'o' and 'p'
    "00000000-0000-0000-0000-000000000004", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff3", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174004", // Invalid: 13th character is not '4'
    // "987f6543-21dc-4b32-9a1b-123456789abz", // Invalid: contains non-hexadecimal character 'z'
    "abcdefab-cdef-4abc-def0-1234567890qr", // Invalid: contains non-hexadecimal characters 'q' and 'r'
    "00000000-0000-0000-0000-000000000005", // Invalid: doesn't follow UUIDv4 structure
    // "ffffffff-ffff-ffff-ffff-fffffffffff4", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174005", // Invalid: 13th character is not '4'
    "987f6543-21dc-4b32-9a1b-123456789abx", // Invalid: contains non-hexadecimal character 'x'
    "abcdefab-cdef-4abc-def0-1234567890st", // Invalid: contains non-hexadecimal characters 's' and 't'
    "00000000-0000-0000-0000-000000000006", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff5", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174006", // Invalid: 13th character is not '4'
    "987f6543-21dc-4b32-9a1b-123456789aby", // Invalid: contains non-hexadecimal character 'y'
    "abcdefab-cdef-4abc-def0-1234567890uv", // Invalid: contains non-hexadecimal characters 'u' and 'v'
    "00000000-0000-0000-0000-000000000007", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff6", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174007", // Invalid: 13th character is not '4'
    // "987f6543-21dc-4b32-9a1b-123456789abz", // Invalid: contains non-hexadecimal character 'z'
    "abcdefab-cdef-4abc-def0-1234567890wx", // Invalid: contains non-hexadecimal characters 'w' and 'x'
    "00000000-0000-0000-0000-000000000008", // Invalid: doesn't follow UUIDv4 structure
    "ffffffff-ffff-ffff-ffff-fffffffffff7", // Invalid: doesn't follow UUIDv4 structure
    // "123e4567-e89b-12d3-a456-426614174008", // Invalid: 13th character is not '4'
    "987f6543-21dc-4b32-9a1b-123456789abx", // Invalid: contains non-hexadecimal character 'x'
    "abcdefab-cdef-4abc-def0-1234567890yz", // Invalid: contains non-hexadecimal characters 'y' and 'z'
];

export const InvalidUUIDv4ObjectsList = [
    new WeakMap(),
    new WeakSet(),
    { uuid : '550e8400-e29b-41d4-a716-446655440000' }, // Valid UUID but wrapped in an object
    ['550e8400-e29b-41d4-a716-446655440000'], // Valid UUID but inside an array
    12345,
    null,
    // undefined,
    Symbol('550e8400-e29b-41d4-a716-446655440000'), // UUID as a symbol (invalid)
    new String('550e8400-e29b-41d4-a716-446655440000'), // UUID wrapped in a String object
];

export const NonUUIDStringsList = [
    'Plain String',
    'Just a random string',
    'Not a UUID',
    'Lorem ipsum dolor sit amet',
    'AnotherNonUUIDString',
    'ThisIsNotAUUIDv4',
    'abc123def456ghi789', // Random alphanumeric string
    // '12345678-1234-5678-1234-567812345678', // Looks like a UUID but wrong format
    // '550e8400-e29b-41d4-a716-446655440000-1234', // Valid UUID with extra characters at the end
    // '550e8400e29b41d4a716446655440000ABC', // Missing hyphens with extra characters
    // 'ABC550e8400-e29b-41d4-a716-446655440000', // Valid UUID with extra characters at the start
];

export const SpecialCharactersUUIDList = [
    '550e8400-e29b-41d4-a716-446655440000😀',
    '550e8400-e29b-41d4-a716-446655440000🙏',
    '550e8400-e29b-41d4-a716-446655440000🚀',
    '550e8400-e29b-41d4-a716-446655440000🎉',
    '550e8400-e29b-41d4-a716-446655440000💻',
    '550e8400-e29b-41d4-a716-446655440000✨',
    '550e8400-e29b-41d4-a716-446655440000\n', // Trailing newline character
    '\n550e8400-e29b-41d4-a716-446655440000', // Leading newline character
    '550e8400-e29b-41d4-a716-446655440000\t', // Trailing tab character
    '\t550e8400-e29b-41d4-a716-446655440000', // Leading tab character
];

export const InvalidUUIDList = [
    ...SpecialCharactersUUIDList,
    // ...InvalidSimilarUUIDv4List,
    ...NonUUIDStringsList,
];

```

## /Users/bort/code/crude-cards/src/api/src/test/constant/Unserializable.ts

```typescript
export const UnserializableList = [
    () => {},
    function namedFunc() {},
];

```

## /Users/bort/code/crude-cards/src/api/src/test/type.ts

```typescript
import { PlayerType } from './../constant/player-type.enum';
import { WebSocketEventType } from './../constant/websocket-event.enum';
import { GameStage } from './../constant/game-stage.enum';
import { GamePopupType } from './../constant/game-popup-type.enum';
import { CardColor } from '../constant/card-color.enum';

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ValidInvalid<T> {
    Valid: {
        Value: T;
        List: T[];
    }
    Invalid: {
        Value: any;
        List: any[];
    }
}

export interface ValidInvalidDate extends ValidInvalid<Date> {
    Valid: {
        Value: Date,
        List: Date[],

        EdgeCasesList: any[],
        InFutureList: any[],
        InPastList: any[],
    },
    Invalid: {
        StringList: any[];
        Value: any;
        List: any[],
    },
}

export interface ValidInvalidUUID extends ValidInvalid<string> {
    Valid: {
        Value: string;
        List: string[];
    },
    Invalid: {
        Value: string;
        List: string[];

        SpecialCharactersUUIDList: string[];
        InvalidSimilarUUIDv4List: string[];
        InvalidUUIDv4ObjectsList: string[];
        NonUUIDStringsList: string[];
    },
}

export interface ValidInvalidEmail extends ValidInvalid<string> {
    Valid: {
        Value: string;
        List: string[];
    },
    Invalid: {
        Value: string;
        List: string[];
    },
}


export interface ValidInvalidBoolean extends ValidInvalid<boolean> {
    Valid: {
        Value: boolean;
        List: boolean[];
    },
    Invalid: {
        Value: any;
        List: any[];
    },
}

export interface ValidInvalidJson extends ValidInvalid<string> {
    Valid: {
        Value: string,
        List: string[],
    },
    Invalid: {
        Value: any;
        List: any[],
    },
}


export interface ValidInvalidString extends ValidInvalid<string> {
    Valid: {
        NotObjectStringList: string[];
        ValidAlphaNumeric: any[];
        List: string[];
        Value: string;
        Empty: string;
    }

    Invalid: {

        ThatAreNotObjectStringList: any[];
        UnconvertableToStringList: any[];
        InvlidAlphaNumeric: any[];
        NumberStringList: any[];
        List: any[];
        Value: any;
    };
}
export interface ValidInvalidNumber extends ValidInvalid<number> {
    Valid: {
        Value: number;
        List: number[],

        BoundaryValueList: any[];
        DatabaseIdList: any[];
        UncommonList: any[];
        IntegerList: any[];
        DatabaseId: any;
    },
    Invalid: {
        BoundaryValueList: any[];
        DatabaseIdList: any[];
        Value: any;
        List: any[],
    },
}

export interface ValidInvalidCardColor extends ValidInvalid<CardColor> {
    Valid: {
        Value: CardColor;
        List: CardColor[];
    },
    Invalid: {
        Value: any;
        List: any[];
    },
}

export interface ValidInvalidGamePopupType extends ValidInvalid<GamePopupType> {
    Valid: {
        Value: GamePopupType;
        List: GamePopupType[];
    },
    Invalid: {
        Value: any;
        List: any[];
    },
}

export interface ValidInvalidGameStage extends ValidInvalid<GameStage> {
    Valid: {
        Value: GameStage;
        List: GameStage[];
    },
    Invalid: {
        Value: any;
        List: any[];
    },
}

export interface ValidInvalidPlayerType extends ValidInvalid<PlayerType> {
    Valid: {
        Value: PlayerType;
        List: PlayerType[];
    },
    Invalid: {
        Value: any;
        List: any[];
    },
}

export interface ValidInvalidWebSocketEventType extends ValidInvalid<WebSocketEventType> {
    Valid: {
        Value: WebSocketEventType;
        List: WebSocketEventType[];
    },
    Invalid: {
        Value: any;
        List: any[];
    },
}

export interface MockDataHierarchy {
    Undefined: undefined;
    Null: null;

    SpecialCharacterList: string[];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    UnserializableList: Function[];
    Boolean: ValidInvalidBoolean;
    Number: ValidInvalidNumber;
    String: ValidInvalidString;
    Date: ValidInvalidDate;
    JSON: ValidInvalidJson;

    CardColor: ValidInvalidCardColor;
    GamePopupType: ValidInvalidGamePopupType;
    GameStage: ValidInvalidGameStage;

    PlayerType: ValidInvalidPlayerType;
    WebSocketEventType: ValidInvalidWebSocketEventType;

    Service: {
        TestHash: string;
    },

    UUID: ValidInvalidUUID,
    Email: ValidInvalidEmail,

    Misc: {
        Value: string;

        CircularReference: {
            Name: string;
            Self: any; // This is a circular reference
        };
    };
}

/* eslint-enable @typescript-eslint/no-explicit-any */

```

## /Users/bort/code/crude-cards/src/api/src/type.ts

```typescript
import { Player } from './player/player.entity';
import { Game } from './game/game.entity';
import { Card } from './card/card.entity';


type NullableString = string | null;


export type AuthToken = NullableString;
export type SocketID  = NullableString;
export type GameCode  = NullableString;


// Enum representing different types of timers used in the game.
export enum TimerType {
    // Timer for the stage where players select a white card.
    PlayerSelectWhiteCard = 'PlayerSelectWhiteCard',

    // Timer for the stage where the dealer picks a black card.
    DealerPickBlackCard = 'DealerPickBlackCard',

    // Timer for the stage where the dealer picks a winning white card.
    DealerPickWinner = 'DealerPickWinner',

    // Fallback or unrecognized timer type.
    Unknown = 'Unknown',
}

// Enum representing different types of cookies used in the application.
export enum CookieType {
    // Cookie storing the player's authentication token.
    AuthToken = 'AuthToken',

    // Fallback or unrecognized cookie type.
    Unknown = 'Unknown',
}

export interface GameDeck {
    blackCards : Card[]
    whiteCards : Card[]
}

// Interface representing the disconnection state of a player.
export interface DisconnectPlayer {
    // The player entity that disconnected. Null if no player is found.
    player: Player | null;

    // The game entity associated with the disconnected player. Null if no player / game is found.
    game: Game | null;
}


export enum GameExitReason {

     // Could happen if opens two browsers and tries to play two games with the same player
    CreatedNewGame = 'CreatedNewGame',

    // Chose Leave from the Menu or other official way to leaving the game
    LeftByChoice = 'LeftByChoice',

    // Connection crapped out, nobody being blammed, just no communication
    Disconnected = 'Disconnected',

    // Player joined another game (open two browsers, try to play two games with the same AuthToken / Player)
    JoiningOther = 'JoiningOther',

    // Player didnt respond in time and the player is exited
    // to keep the game moving
    Timedout = 'Timedout',

    // Player was booted from the game
    Booted = 'Booted',
}


export enum JoinGameReason {
    ReconnectingDisconnectedPlayer = 'ReconnectingDisconnectedPlayer',
    JoiningPlayerIsAlreadyInLimbo  = 'JoiningPlayerIsAlreadyInLimbo',
    PlayerIsAlreadyInGame          = 'PlayerIsAlreadyInGame',
    PlayerJoinsMidGame             = 'PlayerJoinsMidGame',
    PlayerFastRefresh              = 'PlayerFastRefresh',
    NewGameAndPlayer               = 'NewGameAndPlayer',
};



```

## /Users/bort/code/crude-cards/src/api/src/util/util.module.ts

```typescript
import { UtilService } from './util.service';
import { Module } from '@nestjs/common';
import { Logger } from 'winston';

@Module({
    // Declare providers (services and other dependencies) that will be used within this module.
    providers : [
        Logger, // Inject the global Winston Logger instance.
        UtilService, // Custom utility service containing shared utility functions.
    ],
    // Export the UtilService so it can be used in other modules.
    exports : [UtilService],
})
export class UtilModule {}

```

## /Users/bort/code/crude-cards/src/api/src/util/util.service.ts

```typescript
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Inject, Injectable } from "@nestjs/common";
import { faker } from "@faker-js/faker";
import { Logger } from "winston";

/**
 * List of game codes.
 */
const gameCodes: string[] = [
    "arfs", "bahs", "bams", "bars", "bark", "bats", "bazz", "bibs", "biff", "blah",
    "blam", "bleh", "blob", "bods", "bogs", "bonk", "boob", "bops", "bork", "bozo",
    "bums", "burr", "burp", "butt", "buzz", "cabs", "cads", "chug", "clog", "cops",
    "cork", "crap", "crus", "crud", "cuds", "cuzz", "dabs", "derp", "ding", "dohs",
    "dolt", "doof", "dope", "dork", "duff", "duhs", "dumb", "dupe", "eeps", "erks",
    "face", "faps", "fart", "flip", "fobs", "fohs", "fuzz", "gahs", "gaks", "gasp",
    "glum", "gobs", "goof", "grrr", "guhs", "gulp", "gunk", "hack", "hahs", "hips",
    "hiss", "hons", "honk", "hoos", "huhs", "hump", "hurl", "jabs", "jams", "jank",
    "jars", "jeer", "jerk", "jibs", "jigs", "kaps", "klut", "lmao", "lops", "lump",
    "mash", "mehs", "meme", "mock", "mops", "muck", "nahs", "nahh", "narf", "nerd",
    "nips", "noos", "noob", "oafs", "oofs", "ooms", "oops", "ouch", "pahs", "peep",
    "perk", "pfft", "phub", "pips", "piss", "poos", "poop", "pork", "pubs",
    "puds", "puke", "punk", "quib", "rads", "rahs", "rams", "ribs", "rids", "rube",
    "saps", "scam", "sham", "sigh", "sips", "skas", "slap", "slob", "smug", "snax",
    "snip", "snob", "snub", "sops", "suck", "tads", "tahs", "taps", "tizz", "toke",
    "toot", "turd", "twat", "twit", "ughh", "uhhs", "umps", "urrs", "vexx", "wack",
    "wahs", "wees", "whiz", "whos", "wigs", "wimp", "woes", "woof", "wuss", "yaps",
    "yawn", "yays", "yepz", "yips", "yolo", "yuck", "zany", "zaps", "zapp", "zigs",
    "zing", "zits", "zong", "zoos", "zutx",
];

@Injectable()
export class UtilService {

    public constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly log: Logger,
    ) {}


    /**
 * Generates a random game code.
 *
 * @param maxLength - The maximum length of the game code.
 * @param maxAttempts - The maximum number of attempts to generate a valid game code.
 * @returns A promise that resolves to a valid game code.
 * @throws An error if unable to generate a valid game code within the specified constraints.
 */

    public generateGameCode = async (
        maxLength: number = 3,
        maxAttempts: number = 100,
    ) => {
        this.log.silly('UtilService::startGame', { maxLength, maxAttempts });

        if (!maxLength || maxLength <= 0)
            throw new Error(`maxLength should be a positive integer ${maxLength}`);

        if (!maxAttempts || maxAttempts <= 0)
            throw new Error(`maxAttempts should be a positive integer ${maxAttempts}`);

    const getRandomGameCode = (): string =>
        gameCodes[Math.floor(Math.random() * gameCodes.length)];

        const getRandomTwoDigitNumber = (): string =>
            Math.floor(10 + Math.random() * 90).toString();

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            let gameCode = getRandomGameCode();

            if (gameCode.length <= maxLength) {

                const twoDigitNumber = getRandomTwoDigitNumber();

                // Append or prepend the two-digit number
                gameCode = Math.random() < 0.5
                    ? `${twoDigitNumber}${gameCode}`
                    : `${gameCode}${twoDigitNumber}`;

                this.log.silly('UtilService::startGame::generated', { maxLength, maxAttempts, gameCode });

                return gameCode;
            }
        }

        let fallbackCode = faker.string.alpha(maxLength);
        const twoDigitNumber = getRandomTwoDigitNumber();
        // Append or prepend the two-digit number to the fallback code
        fallbackCode = Math.random() < 0.5 ? `${twoDigitNumber}${fallbackCode}` : `${fallbackCode}${twoDigitNumber}`;

        this.log.silly('UtilService::startGame::generated', {
            maxLength, maxAttempts, gameCode : fallbackCode,
        });

        return fallbackCode;
    }
}

export { gameCodes };

```

## /Users/bort/code/crude-cards/src/api/src/util.ts

```typescript
import { v4 as uuidv4 } from 'uuid';


/**
 * Generates a random hash of the specified length using UUID.
 *
 * @param length - The desired length of the hash.
 * @returns A random hash string of the specified length.
 * @throws Will throw an error if the length is not a non-negative integer or exceeds the maximum possible length.
 */
export const generateRandomHash = (length: number): string => {
    // Validate input length
    if (typeof length !== 'number' || !Number.isInteger(length) || length < 0)
        throw new Error('Invalid length: must be a non-negative integer');

    // Generate a UUID, remove hyphens, and transform to uppercase in one step
    const uuidWithoutHyphens = uuidv4().replace(/-/g, '').toUpperCase();

    // Check if the requested length is greater than the available length of the UUID without hyphens
    if (length > uuidWithoutHyphens.length)
        throw new Error('Length of the hash is greater than the length of the UUID');

    // Return the substring of the desired length
    return uuidWithoutHyphens.substring(0, length);
};


/*
* Display a success message in ASCII art.
*/
export const displaySuccess = (): void => {
    console.log('');
    console.log('\x1b[38;2;255;0;0m     .oooooo.   oooo          \x1b[0m');
    console.log('\x1b[38;2;255;64;0m    d8P\'  `Y8b  `888        \x1b[0m');
    console.log('\x1b[38;2;255;128;0m   888      888  888  oooo  \x1b[0m');
    console.log('\x1b[38;2;255;191;0m   888      888  888 .8P\'  \x1b[0m');
    console.log('\x1b[38;2;255;255;0m   888      888  888888.    \x1b[0m');
    console.log('\x1b[38;2;191;255;0m   `88b    d88\'  888 `88b. \x1b[0m');
    console.log('\x1b[38;2;128;255;0m    `Y8bood8P\'  o888o o888o\x1b[0m');
    console.log('');
};

```

