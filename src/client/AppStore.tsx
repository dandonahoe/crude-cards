import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { RFC } from '@app/ui/type';
import store from './store';


export const AppStore : RFC<PropsWithChildren> = ({
    children,
}) =>
    <Provider store={store}>
        {children}
    </Provider>
