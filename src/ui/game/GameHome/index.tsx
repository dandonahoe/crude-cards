import { Text, rem, Flex, Stack, TextInput, Button, Group, FocusTrap, Box } from '@mantine/core';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameAction } from '../../../client/action/game.action';
import { CA } from '../../../constant/framework/CoreAction';
import { GameCardContainer } from '../GameCardContainer';
import { GameDeckLayout } from '../GameDeckLayout';
import { useDispatch } from '@app/client/hook';
import { GameButton } from '../GameButton';
import { RFC } from '@app/ui/type';
import { Env } from '../../../Env';
import { useState } from 'react';


export const GameHome : RFC = () => {
    const dispatch = useDispatch();

    const [gameCode, setGameCode] = useState('');

    const handleStartGame = () : CA => dispatch(GameAction.createGame({}));
    const handleJoinGame  = () : CA => dispatch(GameAction.joinGame({
        game_code : gameCode,
    }));

    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) : CA => {
        if(e.key === 'Enter') {
            e.preventDefault();

            return handleJoinGame();
        }

        return dispatch(GameAction.noOp());
    }

    const handleCameCodeChange = (e : React.ChangeEvent<HTMLInputElement>) : CA => {
        setGameCode(e.target.value);

        let userInput = e.target.value;

        // Remove all non alpha numeric characters from, so they
        // can get the code foo123 and all these work (below). Typing is hard, joining should
        // be forgiving and easy to sloppy (usual) input.

        // "foo123"
        // "foo123."
        // " FOO-123"
        // "foo 123"
        // "foo 123 "
        // " FOO       12     3  "
        // "  foo 123  "
        // "  f o o 1 2 3   "
        // " !! fFGGGo$$o##@@1$#2@@3~~"
        // " !! fFGGGO$$O##@@1$#2@@3~~ "
        // " !! fFGGGo$$o##@@1$#2@@3~~  "
        // "  !! FFGGGo$$o##@@1$#2@@3~~  "
        // "  !! fFGGGo$$o##@@1$#2@@3~~   "

        // todo: make a utility and unit test this
        userInput = userInput.replace(/[^a-zA-Z0-9]/g, '').trim().toLowerCase();

        // rapid join before they generally can hit the join button
        // invalid codes submitted this way do not error out, since they
        // may be the result of a typo the user is simply fixing, but
        // the odds of an accidental submission of an invalid code that
        // reaches a wrong but valid game are essentially zero mathmeticaly.
        // On mobile especially this is useful to prevent them from having to move their
        // finger to a new input, and every device works differenty and could potentially
        // interfere with the join button (cover it up). Apple does this with
        // 2FA codes on macOS, where entering the final digit auto submits the form
        // and its pleasantly suprising.

        if(userInput.length !== 6)
            return dispatch(GameAction.noOp());

        const game_code = e.target.value.trim();

        console.log('Dispatching JoinGame with game_code:', game_code);

        return dispatch(GameAction.joinGame({
            game_code,
        }));
    }

    const homepageUrl = Env.getValue<string>('NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN');

    const handleResize = () : void => {
        dispatch(GameAction.logRelay({
            message : 'User clicked the resize button',
            payload : {
                hello : 'world',
            },
        }));

        window.open(homepageUrl, 'CrudeCards', 'width=550,height=850');
    };

    return (
        <Stack
            justify='center'
            align='center'
            h='100vh'
            mt={rem(60)}
            ta='center'>
            <Button
                tabIndex={0}
                size='xs'
                variant='outline'
                c='#fff'
                color='#fff'
                visibleFrom='md'
                onClick={handleResize}>
                {'Resize'}
            </Button>
            <GameDeckLayout
                color={CardColor.Black}
                cards={[
                    <GameCardContainer
                        key='sdf'
                        color={CardColor.White}>
                        <Box
                            pt='xl'
                            mb='xl'>
                            <Text
                                fz={rem(60)}
                                fw={800}
                                mb='xl'
                                lh={1}>
                                {'CrudeCards'}
                            </Text>
                            <Text
                                fz={rem(32)}
                                ta='center'
                                fw={600}>
                                {'A Party Game for Terrible People.'}
                            </Text>
                        </Box>

                        <Flex
                            justify='center'
                            mb='xl'>
                            <GameButton
                                onClick={handleStartGame}
                                text='Go' />
                        </Flex>

                    </GameCardContainer>,
                    <GameCardContainer
                        key='sdssf'
                        color={CardColor.Black}>
                        <Text
                            fw={600}
                            fz={rem(30)}
                            fs='italic'
                            size='sm'>
                            {'- or -'}
                        </Text>
                        <Group
                            justify='center'
                            align='end'>
                            <form>
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
                                        onChange={handleCameCodeChange}
                                        onKeyDown={handleKeyDown}
                                        value={gameCode}
                                        w={rem(300)}
                                        size='md'
                                        pt='xs' />
                                </FocusTrap>
                                <Button
                                    mb='xl'
                                    tabIndex={0}
                                    onClick={handleJoinGame}
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
                    </GameCardContainer>,
            ]} />
        </Stack>
    );
}

