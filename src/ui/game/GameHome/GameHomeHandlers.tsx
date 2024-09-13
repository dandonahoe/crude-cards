import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { Dispatch } from '@reduxjs/toolkit';


export const handleJoinGame = (dispatch: Dispatch<any>, gameCode: string): CA => {
    return dispatch(GameAction.joinGame({ game_code : gameCode }));
};

export const handleStartGame = (dispatch: Dispatch<any>): CA => {
    return dispatch(GameAction.createGame({}));
};

export const handleKeyDown = (
    dispatch: Dispatch<any>,
    e: React.KeyboardEvent<HTMLInputElement>,
    gameCode: string,
): CA => {
    if (e.key === 'Enter') {
        e.preventDefault();

        return handleJoinGame(dispatch, gameCode);
    }

    return dispatch(GameAction.noOp());
};

export const sanitizeGameCode = (input: string): string => {
    return input.replace(/[^a-zA-Z0-9]/g, '').trim().toLowerCase();
};
