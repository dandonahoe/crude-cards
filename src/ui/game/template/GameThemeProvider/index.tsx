import { GameThemeBlueSteel } from "@app/client/GameThemeBlueSteel";
import { GameThemeJazzHands } from "@app/client/GameThemeJazzHands";
import { MantineProvider } from "@mantine/core";
import { BrowserTheme } from "../../type";
import { RFC } from "@app/ui/type";
import { Props } from "./type";


export const GameThemeProvider : RFC<Props> = ({
    browserTheme, children,
}) => {

    // debugger;

    switch(browserTheme) {

        case BrowserTheme.JazzHands:
        case BrowserTheme.Default: return (
            <MantineProvider
                theme={GameThemeJazzHands}
                defaultColorScheme='dark'
                forceColorScheme='dark'>
                {children}
            </MantineProvider>);

        case BrowserTheme.BlueSteel: return (
            <MantineProvider
                theme={GameThemeBlueSteel}
                defaultColorScheme='dark'
                forceColorScheme='dark'>
                {children}
            </MantineProvider>);

        default: return children;
    }
};
