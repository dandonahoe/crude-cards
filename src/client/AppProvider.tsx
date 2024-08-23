import { AppContextProvider } from './AppContextProvider';
import React, { PropsWithChildren } from 'react';
import { AppStore } from './AppStore';
import { RFC } from '@app/ui/type';


export const AppProvider : RFC<PropsWithChildren> = ({
    children,
}) =>
    <AppStore>
        <AppContextProvider>
            {children}
        </AppContextProvider>
    </AppStore>
