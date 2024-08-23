import { Stack } from '@mantine/core';
import { GamePopup } from '../GamePopup';
import { GameView } from '../GameView';
import { RFC } from '@app/ui/type';
import {useEffect } from 'react';
import { GameDebug } from '../GameDebug';


export const GameBoard : RFC = () => {
    // if hitting the site on the root url, then clear the AuthToken cookie
    // if it exits
    useEffect(() => {

        if(window.location.pathname === '/') {
            console.log('Clearing AuthToken cookie, at root url');
            document.cookie = 'AuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    }, []);

    return (
        <Stack h='100vh'>
            <GamePopup />
            <GameView />
            <GameDebug />
        </Stack>
    );
}

