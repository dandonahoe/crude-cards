import { CardColor } from '../../../api/src/constant/card-color.enum';
import { AppShell, Box, Group, rem } from '@mantine/core';
import { GameTemplateHeader } from './GameTemplateHeader';
import { GameThemeProvider } from '../GameThemeProvider';
import { Notifications } from '@mantine/notifications';
import classes from './GameTemplate.module.css';
import { useElementSize } from '@mantine/hooks';
import { AppContext } from '@app/ui/AppContext';
import { useSelector } from '@app/client/hook';
import { GameContext } from '../GameContext';
import { GamePopup } from '../GamePopup';
import { GameToast } from '../GameToast';
import { BrowserTheme } from '../type';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Props } from './type';
import {
    selectDealerDealtCard, selectPlayerDealtCard,
    selectCurrentPlayer, selectDealerCards,
    selectPlayerCards, selectIsDealer,
    selectGameState, selectPopupType,
} from '@app/client/selector/game';


export const GameTemplate : RFC<Props>= ({
    children,
}) => {

    const dealerDealtCard = useSelector(selectDealerDealtCard);
    const playerDealtCard = useSelector(selectPlayerDealtCard);
    const currentPlayer   = useSelector(selectCurrentPlayer  );
    const dealerCards     = useSelector(selectDealerCards    );
    const playerCards     = useSelector(selectPlayerCards    );
    const popupType       = useSelector(selectPopupType      );
    const gameState       = useSelector(selectGameState      );
    const isDealer        = useSelector(selectIsDealer       );

    const { ref, height : headerHeight } = useElementSize();

    const { isDebugging } = useContext(AppContext);

    const debugProps = {
        bd : isDebugging ? '1px solid #f00' : undefined,
    };

    return (
        <GameContext.Provider
            value={{
                gameState, isDealer, popupType, headerHeight,
                currentPlayer, dealerCards, playerCards,
                dealerDealtCard, playerDealtCard,
            }}>
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
        </GameContext.Provider>
    );
}

