import { GameDeckLayout } from '../../component/GameDeckLayout';
import { GameStackType } from '../../component/GameStack/type';
import { GameAction } from '@app/client/action/game.action';
import { GameStack } from '../../component/GameStack';
import { CookieType } from '../../../../api/src/type';
import { GameText } from '../../component/GameText';
import { GameBox } from '../../component/GameBox';
import { GameTitleCard } from './GameTitleCard';
import { useDispatch } from '@app/client/hook';
import { ResizeButton } from './ResizeButton';
import { GameJoinForm } from './GameJoinForm';
import { useState } from 'react';
import Cookies from 'js-cookie';


/** Main Game Home Component */
export const GameHome = () => {

    const dispatch = useDispatch();
    const [gameCode, setGameCode] = useState('');

    const handleStartGame = () => dispatch(GameAction.wsCreateGame({}));
    const handleJoinGame  = (inputGameCode : string) => dispatch(GameAction.wsJoinGame({ game_code : inputGameCode }));

    const authToken = Cookies.get(CookieType.AuthToken);

    if(!authToken)
        return (
            <GameBox>
                <GameText>
                    {'Loading....'}
                </GameText>
            </GameBox>
        )


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
