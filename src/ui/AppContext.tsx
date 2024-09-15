import { AppContextModel } from '../type/framework/core/AppContextModel';
import { ColorTheme } from '@app/constant/framework/ColorTheme';
import { ScreenSize } from '../constant/framework/ScreenSize';
import { createContext } from 'react';


export const DefaultAppContext : AppContextModel = Object.freeze({

    isDebugging : true,

    screenSize : ScreenSize.Desktop,
    colorTheme : ColorTheme.Dark,

    isDesktop : true,
    isMobile  : false,
    isTablet  : false,
    isPhone   : false,

    isReducedMotion : false,
    tabVisibility   : 'visible',
    networkStatus   : { online : true },
    isIdle          : false,
    os              : 'undetermined',
} as const);

export const AppContext = createContext<AppContextModel>(DefaultAppContext);

// Shorthand
export const App = AppContext;
