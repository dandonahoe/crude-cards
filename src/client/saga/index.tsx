import { type Saga } from '@app/type/framework/core/CoreSaga';
import { forkWhileAll } from '../SagaHelper';
import { WebSocks } from './WebSocks';


function* saga() : Saga {
    yield* forkWhileAll([
        ...WebSocks,
    ]);
}

// eslint-disable-next-line import/no-default-export
export default saga;
