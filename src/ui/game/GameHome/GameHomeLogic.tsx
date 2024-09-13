import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { GameHomeHandlers } from './type';


export const Logic : GameHomeHandlers = {

    sanitizeGameCode : (input: string): string =>
        input.replace(/[^a-zA-Z0-9]/g, '').trim().toLowerCase(),

    handleStartGame : (dispatch: Dispatch<UnknownAction>): CA =>
        dispatch(GameAction.createGame({})),

    handleJoinGame : (dispatch: Dispatch<any>, gameCode: string): CA =>
        dispatch(GameAction.joinGame({ game_code : gameCode })),

    handleKeyDown : (
        dispatch : Dispatch<UnknownAction>,
        e        : React.KeyboardEvent<HTMLInputElement>,
        gameCode : string,
    ): CA => {

        if (e.key === 'Enter') {
            e.preventDefault();

            return Logic.handleJoinGame(dispatch, gameCode);
        }

        return dispatch(GameAction.noOp());
    },
};
