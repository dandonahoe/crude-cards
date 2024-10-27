import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { AppShell, Box, Group, rem } from '@mantine/core';
import { GameTemplateHeader } from './GameTemplateHeader';
import { GameThemeProvider } from '../GameThemeProvider';
import { Notifications } from '@mantine/notifications';
import { GamePopup } from '../../component/GamePopup';
import { GameToast } from '../../component/GameToast';
import classes from './GameTemplate.module.css';
import { useElementSize } from '@mantine/hooks';
import { AppContext } from '@app/ui/AppContext';
import { BrowserTheme } from '../../type';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Props } from './type';

export const GameTemplate : RFC<Props>= ({
    children,
}) => {

    const { ref, height : headerHeight } = useElementSize();

    const { isDebugging } = useContext(AppContext);

    const debugProps = {
        bd : isDebugging ? '1px solid #f00' : undefined,
    };

    return (
        <GameThemeProvider browserTheme={BrowserTheme.Default}>
            <Notifications />
            <AppShell
                className={classes.appRoot}
                withBorder={false}>
                <AppShell.Header
                    ref={ref}
                    {...debugProps}>
                    <GameTemplateHeader />
                </AppShell.Header>
                <AppShell.Main
                    bd={isDebugging ? '1px solid #0f0' : undefined}
                    pt={rem(headerHeight === 0
                        ? 0
                        : headerHeight +  50,
                    )}>
                    <GamePopup />
                    <GameToast />
                    <Group
                        bd={isDebugging ? '1px dashed #0fd' : undefined}
                        wrap='nowrap'
                        justify='space-between'>
                        <Box
                            c={CardColor.Black}
                            w={rem(0)}
                            hiddenFrom='xs'>
                            {'.'}
                        </Box>
                        {/* Testing Git */}
                        <Box
                            bd={isDebugging ? '1px solid #cf0' : undefined}
                            c={CardColor.Black}
                            w='100%'>
                            {children}
                        </Box>
                        <Box
                            c={CardColor.Black}
                            w={rem(0)}
                            hiddenFrom='xs'>
                            {'.'}
                        </Box>
                    </Group>
                </AppShell.Main>
            </AppShell>
        </GameThemeProvider>
    );
}

