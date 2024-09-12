import { selectGameChampion, selectAllPlayerStatus, selectIsPlayerWinner } from '../../../client/selector/game';
import { GameTextBanner, GameTextNeon, GameTextSmall } from '../GameText';
import { Box, Button, Center, Flex, Stack } from '@mantine/core';
import { GameAction } from '../../../client/action/game.action';
import { useDispatch, useSelector } from '@app/client/hook';
import { CA } from '../../../constant/framework/CoreAction';
import { GameStatusTable } from '../GameStatusTable';
import { IconArrowRight } from '@tabler/icons-react';
import { useViewportSize } from '@mantine/hooks';
import Confetti from 'react-confetti'
import { RFC } from '@app/ui/type';


export const GameComplete : RFC = () => {

    const dispatch = useDispatch();

    const allPlayerStatus = useSelector(selectAllPlayerStatus);
    const gameChampion    = useSelector(selectGameChampion);
    const isWinner        = useSelector(selectIsPlayerWinner);

    const { height, width } = useViewportSize();

    const handleExitGame = () : CA => dispatch(GameAction.leaveGame({}));

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
                <GameTextBanner>
                    {'CHAMP'}
                </GameTextBanner>
                <GameTextNeon>
                    {gameChampion?.username}
                </GameTextNeon>
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
                <GameTextSmall>
                    {'Scoreboard'}
                </GameTextSmall>
                <Box>
                    <GameStatusTable
                        playerStatusList={allPlayerStatus!}
                        shouldShowScore={true}
                        shouldShowDone={false} />
                </Box>
            </Stack>
        </Flex>
    );
}

