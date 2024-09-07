import { selectGameChampion, selectAllPlayerStatus, selectIsPlayerWinner } from '../../../client/selector/game';
import { Box, Button, Center, Flex, Stack, Text } from '@mantine/core';
import { GameAction } from '../../../client/action/game.action';
import { useDispatch, useSelector } from '@app/client/hook';
import { CA } from '../../../constant/framework/CoreAction';
import { GameStatusTable } from '../GameStatusTable';
import { IconArrowRight } from '@tabler/icons-react';
import { useViewportSize } from '@mantine/hooks';
import classes from './GameComplete.module.css';
import Confetti from 'react-confetti'
import { RFC } from '@app/ui/type';


export const GameComplete : RFC = () => {

    const dispatch = useDispatch();

    const allPlayerStatus = useSelector(selectAllPlayerStatus);
    const gameChampion    = useSelector(selectGameChampion);
    const isWinner        = useSelector(selectIsPlayerWinner);

    const { height, width } = useViewportSize();

    const handleExitGame = () : CA =>
        dispatch(GameAction.leaveGame({}));

    console.log('GameComplete', { allPlayerStatus, gameChampion, isWinner });

    return (
        <Flex
            justify='center'
            align='center'>
            {isWinner &&
                <Confetti
                    width={width}
                    height={height}/>
            }
            <Stack c='#fff'>
                <Text
                    mt='xl'
                    fz='lg'
                    fw={600}
                    c='#fff'
                    pt='xl'
                    ta='center'>
                    {'CHAMP'}
                </Text>
                <Text
                    fw={600}
                    className={classes.neonText}
                    ta='center'
                    fz='lg'>
                    {gameChampion?.username}
                </Text>
                <Center mb='xl'>
                    <Button
                        onClick={handleExitGame}
                        variant='subtle'
                        size='lg'
                        mt='xl'>
                        {'Home'}
                        <IconArrowRight size={50} />
                    </Button>
                </Center>
                <Text
                    fz='sm'
                    fw={600}
                    ta='center'>
                    {'Scoreboard'}
                </Text>
                <Box >
                    <GameStatusTable
                        playerStatusList={allPlayerStatus!}
                        shouldShowScore={true}
                        shouldShowDone={false} />
                </Box>
            </Stack>
        </Flex>
    );
}

