import { type Saga } from '@app/type/framework/core/CoreSaga';
import { forkWhileAll } from '../SagaHelper';
import { WS } from './WS';


function* saga() : Saga {
    yield* forkWhileAll([
        ...WS,
    ]);
}

// eslint-disable-next-line import/no-default-export
export default saga;
