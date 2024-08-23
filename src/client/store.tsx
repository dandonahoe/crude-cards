import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import Saga from '@app/client/saga';
import rootSlice from './RootSlice';
import { Env } from '@app/Env';


const sagaMiddleware = createSagaMiddleware();

const shouldLoadDevTools = !Env.isProduction();

if(shouldLoadDevTools)
    console.log('Will load devtools');

const store = configureStore({
    devTools   : shouldLoadDevTools,
    reducer    : rootSlice.reducer,
    middleware : gDM => gDM({}).concat(sagaMiddleware),
});

sagaMiddleware.run(Saga);


export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// eslint-disable-next-line import/no-default-export
export default store;// as ToolkitStore<CoreAppRoot>;
