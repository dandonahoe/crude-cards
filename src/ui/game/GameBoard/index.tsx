import { GamePopup } from '../GamePopup';
import { GameDebug } from '../GameDebug';
import { GameView } from '../GameView';
import { Stack } from '@mantine/core';
import { RFC } from '@app/ui/type';
import {useEffect } from 'react';
import { Props } from './type';

export const GameBoard : RFC<Props> = ({ id }) => {
    // if hitting the site on the root url, then clear the AuthToken cookie
    // if it exits
    useEffect(() => {
        if(window.location.pathname === '/') {
            console.log('Clearing AuthToken cookie, at root url');
            document.cookie = 'AuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    }, []);

    return (
        <Stack
            h='100vh'
            id={id}>
            <GamePopup />
            <GameView />
            <GameDebug />
        </Stack>
    );
}

