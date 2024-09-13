import { TextInput, Group } from '@mantine/core';
import { useDispatch } from '@app/client/hook';
import { GameBoxCentered } from '../GameBox';
import { GameButton } from '../GameButton';
import { Logic } from './GameHomeLogic';
import { RFC } from '@app/ui/type';
import { useState } from 'react';


export const GameHome: RFC = () => {

    const [gameCode, setGameCode] = useState('');
    const dispatch = useDispatch();

    const handleGameCodeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setGameCode(Logic.sanitizeGameCode(e.target.value));

    return (
        <GameBoxCentered>
            <TextInput
                onKeyDown={e => Logic.handleKeyDown(dispatch, e, gameCode)}
                onChange={handleGameCodeChange}
                placeholder='Enter game code'
                value={gameCode}
                maxLength={6}
                mb='md'/>
            <Group>
                <GameButton
                    onClick={() => Logic.handleStartGame(dispatch)}
                    text='Start Game' />
                <GameButton
                    onClick={() => Logic.handleJoinGame(dispatch, gameCode)}
                    text='Join Game'/>
            </Group>
        </GameBoxCentered>
    );
};
