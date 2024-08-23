import { selectIsDealer, selectPlayerWaitStatus } from '../../../client/selector/game';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameCardContainer } from '../GameCardContainer';
import { GameStatusTable } from '../GameStatusTable';
import { useSelector } from '@app/client/hook';
import { GameContext } from '../GameContext';
import { Flex, Stack } from '@mantine/core';
import { GameDeck } from '../GameDeck';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GameWaiting: RFC = () => {

    const {
        dealerDealtCard, playerDealtCard,
        gameState: {
            game_stage, dealer_id,
        },
    } = useContext(GameContext);

    const playerStatusList = useSelector(selectPlayerWaitStatus);
    const isDealer = useSelector(selectIsDealer);

    const playersExceptDealer = playerStatusList.filter(
        playerStatus => playerStatus.player.id !== dealer_id);

    return (
        <Flex
            justify='center'
            align='center'
            mt='xl'>
            <Stack>
                {isDealer &&
                    <GameDeck
                        cards={[
                            dealerDealtCard!,
                        ]} />
                }
                {!isDealer &&
                    <GameDeck
                        cards={[
                            dealerDealtCard!,
                            playerDealtCard!,
                        ]} />
                }
                {game_stage === GameStage.PlayerPickWhiteCard &&

                    <GameCardContainer color={CardColor.Black}>
                        <GameStatusTable
                            playerStatusList={playersExceptDealer}
                            shouldShowScore={false}
                            shouldShowDone={true}
                            title='Waiting on Players' />
                    </GameCardContainer>
                }
            </Stack>
        </Flex>
    );
}
