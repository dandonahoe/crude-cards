import { GameDeckLayout } from '../../component/GameDeckLayout';
import { GameStackType } from '../../component/GameStack/type';
import { GameAction } from '@app/client/action/game.action';
import { GameStack } from '../../component/GameStack';
import { GameTitleCard } from './GameTitleCard';
import { useDispatch } from '@app/client/hook';
import { ResizeButton } from './ResizeButton';
import { GameJoinForm } from './GameJoinForm';
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
