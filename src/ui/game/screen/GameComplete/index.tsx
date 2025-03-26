import { GameTextBanner, GameTextNeon, GameTextSmall } from '../../component/GameText';
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { selectGameComplete } from '../../../../client/selector/game';
import { GameAction } from '../../../../client/action/game.action';
import { GameBoxCentered, GameBox } from '../../component/GameBox';
import { GameStatusTable } from '../../component/GameStatusTable';
import { CA } from '../../../../constant/framework/CoreAction';
import { useDispatch, useSelector } from '@app/client/hook';
import { IconArrowRight } from '@tabler/icons-react';
import { useViewportSize } from '@mantine/hooks';
import { Button, Stack } from '@mantine/core';
import Confetti from 'react-confetti'


export const GameComplete = () => {

    const dispatch = useDispatch();
    const handleExitGame = () : CA => dispatch(GameAction.leaveGame({}));

    const { allPlayerStatus, gameChampion, isWinner } = useSelector(selectGameComplete);
    const { height, width } = useViewportSize();

    return (
        <GameBoxCentered>
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
                <GameBox size='sm'>
                    <GameStatusTable
                        playerStatusList={allPlayerStatus}
                        shouldShowScore={true}
                        shouldShowDone={false} />
                </GameBox>
            </Stack>
        </GameBoxCentered>
    );
}

