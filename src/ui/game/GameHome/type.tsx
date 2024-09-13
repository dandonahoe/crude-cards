// src/ui/game/GameHome/type.tsx
import { Dispatch } from 'react';
import { CA } from '../../../constant/framework/CoreAction';
import { UnknownAction } from '@reduxjs/toolkit';

export interface GameHomeHandlers {

    sanitizeGameCode : (input: string) => string;
    handleStartGame  : (dispatch: Dispatch<UnknownAction>) => CA;
    handleJoinGame   : (dispatch: Dispatch<UnknownAction>, gameCode: string) => CA

    handleKeyDown : (
        dispatch : Dispatch<any>,
        e        : React.KeyboardEvent<HTMLInputElement>,
        gameCode : string,
    ) => CA;
}
