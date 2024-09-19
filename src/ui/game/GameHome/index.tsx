import { GameAction } from '../../../client/action/game.action';
import { GameDeckLayout } from '../GameDeckLayout';
import { GameStackType } from '../GameStack/type';
import { GameTitleCard } from './GameTitleCard';
import { useDispatch } from '@app/client/hook';
import { ResizeButton } from './ResizeButton';
import { GameJoinForm } from './GameJoinForm';
import { GameStack } from '../GameStack';
import { useState } from 'react';


/** Main Game Home Component */
export const GameHome = () => {
    const dispatch = useDispatch();
    const [gameCode, setGameCode] = useState('');

    const handleStartGame = () => dispatch(GameAction.createGame({}));
    const handleJoinGame  = () => dispatch(GameAction.joinGame({ game_code : gameCode }));

    return (
        <GameStack type={GameStackType.FullHeightCentered}>
            <ResizeButton />
            <GameDeckLayout
                id='home-screen'
                cards={[
                    <GameTitleCard
                        onStartGame={handleStartGame}
                        key='title-card' />,
                    <GameJoinForm
                        onJoinGame={handleJoinGame}
                        setGameCode={setGameCode}
                        gameCode={gameCode}
                        key='join-form' />,
                ]}/>
        </GameStack>
    );
};
