import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { CoreAction } from '../constant/framework/CoreAction';
import { all, fork, call, take } from 'typed-redux-saga';
import { Saga } from '../type/framework/core/CoreSaga';
import { GameAction } from './action/game.action';
import { AxiosError } from 'axios';
import { sagaDispatch } from '.';


// helper function to templatize the take effect and return just the payload object
export function* takePayload<T>(
    type : ActionCreatorWithPayload<T>,
) : Saga<T> {

    const { payload } = (yield take(type)) as CoreAction<T>;

    return payload;
}

export function* takePayloadList<T>(
    types : ActionCreatorWithPayload<T>[],
) : Saga<T> {

    const { payload } = (yield take(types)) as CoreAction<T>;

    return payload;
}


function* handleError(exc : unknown) : Saga {

    if (exc instanceof AxiosError)
        return;

    // console.log(exc.response?.data?.message || exc.message);

    if (exc instanceof Error) {

        console.log(exc.message)

        return;
    }

    yield null;
}

export const sagaDispatchAll = (actions : CoreAction[]) : Saga<unknown> =>
    all(actions.map(action => sagaDispatch(action ?? GameAction.noOp())));

export const forkWhile = (saga : () => Saga) : Saga<unknown> =>
    fork(whileSaga, saga);

export const forkWhileAll = (sagas : (() => Saga)[]) : Saga<unknown> =>
    all(sagas.map(saga => forkWhile(saga)));

// utility function to fork a saga and repeatedely call a callback method
// even if it thros an exception.
function* whileSaga(saga : () => Saga) : Saga {

    while (true) try {
        yield* call(saga);
    } catch (exc) {
        yield* call(handleError, exc);
    }
}

export const SagaHelper = {
    sagaDispatchAll,
    forkWhileAll,
    takePayload,
    forkWhile,
};
