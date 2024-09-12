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
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameBoxCentered } from '../GameBox/index';


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
            <Stack>
                <GameTextBanner color={CardColor.White}>
                    {'CHAMP'}
                </GameTextBanner>
                <GameTextNeon>
                    {gameChampion?.username}
                </GameTextNeon>
                <GameBoxCentered>
                    <Button
                        onClick={handleExitGame}
                        variant='subtle'
                        size='lg'
                        mt='xl'>
                        {'Home'}
                        <IconArrowRight size={50} />
                    </Button>
                </GameBoxCentered>
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

