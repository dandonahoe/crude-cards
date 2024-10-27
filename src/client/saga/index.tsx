import { type Saga } from '@app/type/framework/core/CoreSaga';
import { forkWhileAll } from '../SagaHelper';
import { WebSockSaga } from './WebSockSaga';


function* saga() : Saga {
    yield* forkWhileAll([
        ...WebSockSaga,
    ]);
}

// eslint-disable-next-line import/no-default-export
export default saga;
