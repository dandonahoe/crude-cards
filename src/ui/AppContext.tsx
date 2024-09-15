import { AppContextModel } from '../type/framework/core/AppContextModel';
import { ColorTheme } from '@app/constant/framework/ColorTheme';
import { ScreenSize } from '../constant/framework/ScreenSize';
import { createContext } from 'react';


export const AppContext = createContext<AppContextModel>({

    isDebugging : false,

    screenSize : ScreenSize.Desktop,
    colorTheme : ColorTheme.Light,


    isDesktop : true,
    isMobile  : false,
    isTablet  : false,
    isPhone   : false,

    isReducedMotion : false,
    tabVisibility   : 'visible',
    networkStatus   : { online : true },
    isIdle          : false,
    os              : 'undetermined',
});

// Shorthand
export const App = AppContext;
