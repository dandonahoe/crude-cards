import { selectIsHost } from '../../../client/selector/game';
import { useContext, useEffect, useState } from 'react';
import { CookieType } from '../../../api/src/type';
import { GameDebugTabs } from './GameDebugTabs';
import { useSelector } from '@app/client/hook';
import { GameContext } from '../GameContext';
import classes from './GameDebug.module.css';
import { Box, rem } from '@mantine/core';
import { RFC } from '@app/ui/type';
import Cookies from 'js-cookie';
import { Props } from './type';


export const GameDebug: RFC<Props> = ({
    isVisible,
}) => {

    const {
        gameState, isDealer, currentPlayer, dealerDealtCard, playerDealtCard,
    } = useContext(GameContext);

    const [authToken, setAuthToken] = useState<string | null>(null);
    const isHost = useSelector(selectIsHost);

    useEffect(() => {
        const token = Cookies.get(CookieType.AuthToken);

        setAuthToken(token ?? null);
    }, []);

    if (!isVisible) return null;

    return (
        <Box
            onClick={() => console.log('Admin Open')}
            className={classes.pi}
            w={rem(220)}
            h={rem(440)}>
            <GameDebugTabs
                playerDealtCard={playerDealtCard}
                dealerDealtCard={dealerDealtCard}
                currentPlayer={currentPlayer}
                gameState={gameState}
                authToken={authToken}
                isDealer={isDealer}
                isHost={isHost} />
        </Box>
    );
};
