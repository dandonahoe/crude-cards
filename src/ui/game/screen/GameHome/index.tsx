import { GameDeckLayout } from '../../component/GameDeckLayout';
import { GameStackType } from '../../component/GameStack/type';
import { GameAction } from '@app/client/action/game.action';
import { GameStack } from '../../component/GameStack';
import { GameTitleCard } from './GameTitleCard';
import { useDispatch } from '@app/client/hook';
import { ResizeButton } from './ResizeButton';
import { GameJoinForm } from './GameJoinForm';
import { RFC } from '@app/ui/type';
import { useState } from 'react';

export const GameHome : RFC = () => {

    const dispatch = useDispatch();
    const [game_code, setGameCode] = useState('');

    const handleStartGame = () => dispatch(GameAction.webCreateGame({ game_code }));
    const handleJoinGame  = () => dispatch(GameAction.webJoinGame(  { game_code }));

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
                        gameCode={game_code}
                        key='join-form' />,
                ]}/>
        </GameStack>
    );
};
