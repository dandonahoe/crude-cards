import { Text, rem, Flex, Stack, TextInput, Button, Group, FocusTrap, Box } from '@mantine/core';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { CA } from '../../../constant/framework/CoreAction';
import { GameCardContainer } from '../GameCardContainer';
import { GameAction } from '@app/client/action/game';
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

        if(e.target.value.trim().length === 6)
            return dispatch(GameAction.joinGame({
                game_code : e.target.value.trim(),
            }))

        return dispatch(GameAction.noOp());
    }

    const homepageUrl = Env.getValue<string>('NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN');

    const handleResize = () : void => {
        window.open(homepageUrl, 'CrudeCards', 'width=550,height=800');
    };

    return (
        <Stack
            justify='center'
            align='center'
            h='100vh'
            mt='lg'
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
                            h={rem(260)}
                            pt={rem(60)}>
                            <Text
                                fz={rem(40)}
                                ta='center'
                                fw={600}>
                                {'Cards Against'}
                            </Text>
                            <Text
                                fz={rem(60)}
                                fw={600}
                                mb='xl'
                                pb='xl'
                                lh={1}>
                                {'Humanity'}
                            </Text>
                        </Box>
                        <Flex justify='center'>
                            <GameButton
                                onClick={handleStartGame}
                                text='New' />
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

