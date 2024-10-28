import { GameAction } from '@app/client/action/game.action';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { CA } from '@app/constant/framework/CoreAction';
import { GameHomeHandlers } from './type';


export const Logic : GameHomeHandlers = {

    sanitizeGameCode : (input : string) : string =>
        input.replace(/[^a-zA-Z0-9]/g, '').trim().toLowerCase(),

    handleStartGame : (
        dispatch : Dispatch<UnknownAction>,
        game_code : string,
    ) : CA => dispatch(GameAction.webCreateGame({ game_code })),

    handleJoinGame : (
        dispatch : Dispatch<UnknownAction>,
        game_code : string,
    ) : CA => dispatch(GameAction.webJoinGame({ game_code })),

    handleKeyDown : (
        dispatch : Dispatch<UnknownAction>,
        evt      : React.KeyboardEvent<HTMLInputElement>,
        gameCode : string,
    ) : CA => {

        evt.preventDefault();

        if (evt.key !== 'Enter')
            dispatch(GameAction.noOp())

        return Logic.handleJoinGame(dispatch, gameCode);
    },
};
