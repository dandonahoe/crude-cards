import { AppContextModel } from '../type/framework/core/AppContextModel';
import { NetworkStatus } from '../type/framework/core/NetworkStatus';
import { ColorTheme } from '@app/constant/framework/ColorTheme';
import { ScreenSize } from '@app/constant/framework/ScreenSize';
import React, { PropsWithChildren, useMemo } from 'react';
import { DefaultAppContext } from '../ui/AppContext';
import { App } from '@app/ui/AppContext';
import { RFC } from '@app/ui/type';
import {
    useColorScheme, useMediaQuery, useNetwork, useOs,
    useDocumentVisibility, useReducedMotion, useIdle,
} from '@mantine/hooks';


export const AppContextProvider : RFC<PropsWithChildren> = ({
    children,
}) => {
    const isReducedMotion = useReducedMotion(DefaultAppContext.isReducedMotion);
    const tabVisibility   = useDocumentVisibility();
    const networkStatus   = useNetwork() as NetworkStatus;
    const colorScheme     = useColorScheme(DefaultAppContext.colorTheme);
    const isIdle          = useIdle(5000);
    const os              = useOs() || DefaultAppContext.os;

    // todo - this has never worked reliably but seems close
    const colorTheme = colorScheme === ColorTheme.Dark
        ? ColorTheme.Dark
        : ColorTheme.Light;

    // todo - remove hard coded values
    const isPhone  = useMediaQuery('(max-width: 36em)') || DefaultAppContext.isPhone;
    const isTablet = useMediaQuery('(max-width: 75em)') || DefaultAppContext.isTablet;

    const screenSize : ScreenSize =
        isPhone
            ? ScreenSize.Phone
            : isTablet
                ? ScreenSize.Tablet
                : ScreenSize.Desktop;

    const isDesktop = screenSize === ScreenSize.Desktop;
    const isMobile  = isPhone || isTablet;

    const appContext = useMemo(() => ({
        isDebugging : DefaultAppContext.isDebugging,
        tabVisibility, isReducedMotion, networkStatus, isDesktop, os,
        isTablet, isMobile, isPhone, colorTheme, screenSize, isIdle,
    } as AppContextModel), [
        tabVisibility, isReducedMotion, networkStatus, isDesktop, os,
        isTablet, isMobile, isPhone, colorTheme, screenSize, isIdle,
    ]);

    return (
        <App.Provider value={appContext}>
            {children}
        </App.Provider>
    );
};
