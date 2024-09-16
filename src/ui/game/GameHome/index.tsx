import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameAction } from '../../../client/action/game.action';
import { GameDeckLayout } from '../GameDeckLayout';
import { useDispatch } from '@app/client/hook';
import { GameCardStack } from '../GameCard';
import { GameButton } from '../GameButton';
import { Env } from '../../../Env';
import { useState } from 'react';
import {
    Stack, TextInput, Button, Group,
    Text, rem, Flex, Box, FocusTrap,
    Space,
} from '@mantine/core';
import { GameStack } from '../GameStack';
import { GameText, GameTextSmall, GameTextSubtitle, GameTextTitle } from '../GameText';
import { GameBox } from '../GameBox';
import { GameDeck } from '../GameDeck';
import { GameStackType } from '../GameStack/type';
import { GameBoxType } from '../GameBox/type';


// Utility function for sanitizing game code input
const sanitizeGameCode = (input: string): string =>
    input.replace(/[^a-zA-Z0-9]/g, '').trim().toLowerCase();

export const GameHome = () => {
    const dispatch = useDispatch();
    const [gameCode, setGameCode] = useState('');

    const handleStartGame = () => dispatch(GameAction.createGame({}));
    const handleJoinGame = () => dispatch(GameAction.joinGame({ game_code : gameCode }));

    const handleKeyDown = (evt : React.KeyboardEvent<HTMLInputElement>): void => {

        if (evt.key !== 'Enter')  return;

        evt.preventDefault();
        handleJoinGame();
    };

    const handleGameCodeChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const sanitizedInput = sanitizeGameCode(evt.target.value);

        setGameCode(sanitizedInput);

        if (sanitizedInput.length === 6)
            handleJoinGame();
    };

    const homepageUrl = Env.getValue<string>('NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN');

    const handleResize = (): void => {
        dispatch(
            GameAction.logRelay({
                message : 'User clicked the resize button',
                payload : {
                    hello : 'world',
                }}));

        window.open(homepageUrl, 'CrudeCards', 'width=550,height=850');
    };

    return (
        <GameStack type={GameStackType.FullHeightCentered}>
            <Button
                tabIndex={0}
                size='md'
                variant='outline'
                c={CardColor.White}
                color={CardColor.White}
                onClick={handleResize}>
                <GameTextSmall>
                    {'Resize'}
                </GameTextSmall>
            </Button>
            <GameDeck cards={[
                <GameCardStack color={CardColor.Black}>
                    <GameBox>
                        <GameTextTitle>
                            {'CrudeCards'}
                        </GameTextTitle>
                        <GameTextSubtitle>
                            {'A Party Game for Terrible People.'}
                        </GameTextSubtitle>
                    </GameBox>
                    <GameBox type={GameBoxType.Centered}>
                        <GameButton
                            onClick={handleStartGame}
                            text='Go' />
                    </GameBox>
                </GameCardStack>,
                <GameCardStack color={CardColor.White}>
                    <GameText>
                        {'~ or ~'}
                    </GameText>

                    <Group
                        justify='center'
                        align='end'>
                        <form onSubmit={handleJoinGame}>
                            <FocusTrap active={true}>
                                <TextInput
                                    tabIndex={0}
                                    styles={{
                                            input : {
                                                textAlign : 'center',
                                            },
                                        }}
                                    mb='md'
                                    aria-label='Game Code'
                                    onChange={handleGameCodeChange}
                                    onKeyDown={handleKeyDown}
                                    value={gameCode}
                                    w={rem(300)}
                                    size='md'
                                    pt='xs' />
                            </FocusTrap>
                            <Button
                                mb='xl'
                                tabIndex={0}
                                type='submit'
                                style={{
                                        border : '1px solid #fff',
                                    }}
                                variant='outline'
                                aria-label='Join Game Button'
                                c='#fff'
                                size='md'>
                                {'Join by Code'}
                            </Button>
                        </form>
                    </Group>
                </GameCardStack>
            ]} />

            </GameDeck>
        </GameStack>
    );
};
