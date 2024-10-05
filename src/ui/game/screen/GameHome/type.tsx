import { CA } from '../../../../constant/framework/CoreAction';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';


export interface GameHomeHandlers {

    sanitizeGameCode : (input    : string                                   ) => string;
    handleStartGame  : (dispatch : Dispatch<UnknownAction>                  ) => CA;
    handleJoinGame   : (dispatch : Dispatch<UnknownAction>, gameCode: string) => CA

    handleKeyDown : (
        dispatch : Dispatch<UnknownAction>,
        e        : React.KeyboardEvent<HTMLInputElement>,
        gameCode : string,
    ) => CA;
}


export interface GameJoinFormProps {
    setGameCode : (code : string) => void;
    onJoinGame  : () => void;
    gameCode    : string;
}


export interface GameTitleCardProps {
    onStartGame: () => void
}
