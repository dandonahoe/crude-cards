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
