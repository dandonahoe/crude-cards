import { AppContextModel } from '../type/framework/core/AppContextModel';
import { NetworkStatus } from '../type/framework/core/NetworkStatus';
import { ColorTheme } from '@app/constant/framework/ColorTheme';
import { ScreenSize } from '@app/constant/framework/ScreenSize';
import React, { PropsWithChildren, useMemo } from 'react';
import { App } from '@app/ui/AppContext';
import { RFC } from '@app/ui/type';
import {
    useColorScheme, useMediaQuery, useNetwork, useOs,
    useDocumentVisibility, useReducedMotion, useIdle,
} from '@mantine/hooks';


export const AppContextProvider : RFC<PropsWithChildren> = ({
    children,
}) => {
    const isReducedMotion = useReducedMotion() || false;
    const tabVisibility   = useDocumentVisibility();
    const networkStatus   = useNetwork() as NetworkStatus;
    const colorScheme     = useColorScheme();
    const isIdle          = useIdle(5000);
    const os              = useOs() || 'undetermined';

    const colorTheme =  colorScheme === 'dark'
        ? ColorTheme.Dark
        : ColorTheme.Light;

    const isPhone  = useMediaQuery('(max-width: 36em)') || false;
    const isTablet = useMediaQuery('(max-width: 75em)') || false;

    const screenSize : ScreenSize =
        isPhone
            ? ScreenSize.Phone
            : isTablet
                ? ScreenSize.Tablet
                : ScreenSize.Desktop;

    const isDesktop = screenSize === ScreenSize.Desktop;
    const isMobile  = isPhone || isTablet;

    // value is cached by useMemo to avoid excessive re-renders
    const context = useMemo(() => ({

        isDesktop, isTablet, isMobile, isPhone,

        tabVisibility,
        isReducedMotion,
        networkStatus,
        colorTheme,
        screenSize,

        isIdle,
        os,
    } as AppContextModel), [
        isIdle, os, tabVisibility, isReducedMotion,
        isDesktop, isTablet, isMobile, isPhone,
        networkStatus, colorTheme, screenSize,
    ]);

    return (
        <App.Provider value={context}>
            {children}
        </App.Provider>
    );
};
