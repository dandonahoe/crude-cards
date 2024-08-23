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
    selectGameState, selectPopupTypeId,
    selectPlayerCards, selectIsDealer,
} from '@app/client/selector/game';


export const GameTemplate : RFC<Props>= ({
    children,
}) => {

    const dealerDealtCard = useSelector(selectDealerDealtCard);
    const playerDealtCard = useSelector(selectPlayerDealtCard);
    const currentPlayer   = useSelector(selectCurrentPlayer  );
    const dealerCards     = useSelector(selectDealerCards    );
    const playerCards     = useSelector(selectPlayerCards    );
    const popupTypeId     = useSelector(selectPopupTypeId    );
    const gameState       = useSelector(selectGameState      );
    const isDealer        = useSelector(selectIsDealer       );

    const { ref, height : headerHeight } = useElementSize();

    return (
        <GameContext.Provider
            value={{
                currentPlayer, dealerCards, playerCards,
                dealerDealtCard, playerDealtCard,
                gameState,  isDealer, popupTypeId,
                headerHeight,
            }}>
            <MantineProvider
                forceColorScheme='dark'
                theme={GameTheme}>
                <AppShell
                    className={classes.appRoot}
                    withBorder={false}>
                    <AppShell.Header ref={ref}>
                        <GameTemplateHeader />
                    </AppShell.Header>
                    <AppShell.Main
                        pt={rem(headerHeight === 0
                            ? 0
                            : headerHeight +  50,
                        )}>
                        <GamePopup />
                        <GameToast />
                        <Group
                            wrap='nowrap'
                            justify='space-between'>
                            <Box
                                c='#000'
                                w={rem(0)}
                                hiddenFrom='xs'>
                                {'.'}
                            </Box>
                            <Box
                                c='#000'
                                w='100%'>
                                {children}
                            </Box>
                            <Box
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

