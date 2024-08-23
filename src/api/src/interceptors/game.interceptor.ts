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
