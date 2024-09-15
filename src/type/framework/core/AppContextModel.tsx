import { ColorTheme } from '@app/constant/framework/ColorTheme';
import { ScreenSize } from '@app/constant/framework/ScreenSize';
import { NetworkStatus } from './NetworkStatus';
import { OS } from '@mantine/hooks';


export interface AppContextModel {
    isDebugging : boolean;

    screenSize       : ScreenSize;
    colorTheme       : ColorTheme;

    isDesktop : boolean;
    isMobile  : boolean;
    isTablet  : boolean;
    isPhone   : boolean;

    tabVisibility   : DocumentVisibilityState;
    isReducedMotion : boolean;
    isIdle          : boolean;

    networkStatus : NetworkStatus;
    os            : OS;
}
