import { handleStartGame, handleJoinGame, handleKeyDown, sanitizeGameCode } from './GameHomeHandlers';
import { TextInput, Group } from '@mantine/core';
import { useDispatch } from '@app/client/hook';
import { GameBoxCentered } from '../GameBox';
import { GameButton } from '../GameButton';
import { RFC } from '@app/ui/type';
import { useState } from 'react';


export const GameHome: RFC = () => {

    const [gameCode, setGameCode] = useState('');
    const dispatch = useDispatch();

    const handleGameCodeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setGameCode(sanitizeGameCode(e.target.value));

    return (
        <GameBoxCentered>
            <TextInput
                onKeyDown={e => handleKeyDown(dispatch, e, gameCode)}
                onChange={handleGameCodeChange}
                placeholder='Enter game code'
                value={gameCode}
                maxLength={6}
                mb='md'/>
            <Group>
                <GameButton
                    onClick={() => handleStartGame(dispatch)}
                    text='Start Game' />
                <GameButton
                    onClick={() => handleJoinGame(dispatch, gameCode)}
                    text='Join Game' />
            </Group>
        </GameBoxCentered>
    );
};
