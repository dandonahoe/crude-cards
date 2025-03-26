import { GameAction } from '@app/client/action/game.action';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { CA } from '@app/constant/framework/CoreAction';
import { GameHomeHandlers } from './type';


export const Logic : GameHomeHandlers = {

    sanitizeGameCode : (input : string) : string =>
        input.replace(/[^a-zA-Z0-9]/g, '').trim().toLowerCase(),

    handleStartGame : (dispatch : Dispatch<UnknownAction>) : CA =>
        dispatch(GameAction.createGame({})),

    handleJoinGame : (
        dispatch : Dispatch<UnknownAction>,
        gameCode : string,
    ) : CA =>
        dispatch(GameAction.joinGame({ game_code : gameCode })),

    handleKeyDown : (
        dispatch : Dispatch<UnknownAction>,
        e        : React.KeyboardEvent<HTMLInputElement>,
        gameCode : string,
    ) : CA => {

        e.preventDefault();

        if (e.key !== 'Enter') dispatch(GameAction.noOp())

        return Logic.handleJoinGame(dispatch, gameCode);
    },
};
