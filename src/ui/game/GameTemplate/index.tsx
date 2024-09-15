import { AppShell, Box, Group, MantineProvider, rem } from '@mantine/core';
import { GameTemplateHeader } from './GameTemplateHeader';
import { GameTheme } from '@app/client/GameTheme';
import classes from './GameTemplate.module.css';
import { useElementSize } from '@mantine/hooks';
import { useSelector } from '@app/client/hook';
import { GameContext } from '../GameContext';
import { GamePopup } from '../GamePopup';
import { GameToast } from '../GameToast';
import { RFC } from '@app/ui/type';
import { Props } from './type';
import {
    selectDealerDealtCard, selectPlayerDealtCard,
    selectCurrentPlayer, selectDealerCards,
    selectPlayerCards, selectIsDealer,
    selectGameState, selectPopupType,
} from '@app/client/selector/game';
import { GameText } from '../GameText';


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

    return (
        <GameContext.Provider
            value={{
                currentPlayer, dealerCards, playerCards,
                dealerDealtCard, playerDealtCard,
                gameState, isDealer, popupType,
                headerHeight,
            }}>
            <MantineProvider
                defaultColorScheme='dark'
                forceColorScheme='dark'
                theme={GameTheme}>
                <AppShell
                    className={classes.appRoot}
                    withBorder={false}>
                    <AppShell.Header
                        ref={ref}
                        bd='1px solid #f0f'>
                        <GameTemplateHeader />
                    </AppShell.Header>
                    <AppShell.Main
                        bd='1px solid #0f0'
                        pt={rem(headerHeight === 0
                            ? 0
                            : headerHeight +  50,
                        )}>
                        <GameText>
                            {'hellooo'}
                        </GameText>
                        {/* <GamePopup />
                        <GameToast />
                         */}
                        <Group
                            bd='1px dashed #0fd'
                            wrap='nowrap'
                            justify='space-between'>
                            <Box
                                c='#000'
                                w={rem(0)}
                                hiddenFrom='xs'>
                                {'.'}
                            </Box>
                            <Box
                                bd='1px solid #cf0'
                                c='#000'
                                w='100%'>
                                {children}
                            </Box>
                            <Box
                                c='#000'
                                w={rem(0)}
                                hiddenFrom='xs'>
                                {'.'}
                            </Box>
                        </Group>
                    </AppShell.Main>
                </AppShell>
            </MantineProvider>
        </GameContext.Provider>
    );
}

