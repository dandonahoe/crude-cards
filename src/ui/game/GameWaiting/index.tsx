import { Flex, Stack } from '@mantine/core';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { useContext } from 'react';
import { useSelector } from '@app/client/hook';
import { selectPlayerWaitStatus, selectIsDealer } from '../../../client/selector/game';
import { GameContext } from '../GameContext';
import { DealerDeck } from './DealerDeck';
import { PlayerDeck } from './PlayerDeck';
import { StatusTable } from './StatusTable';

export const GameWaiting = () => {
    const { dealerDealtCard, playerDealtCard, gameState } = useContext(GameContext);
    const isDealer = useSelector(selectIsDealer);
    const playerStatusList = useSelector(selectPlayerWaitStatus);
    const playersExceptDealer = playerStatusList.filter(playerStatus => playerStatus.player.id !== gameState.dealer_id);

    return (
        <Flex
            justify='center'
            align='center'
            mt='xl'>
            <Stack>
                {isDealer ? <DealerDeck dealerDealtCard={dealerDealtCard} /> : <PlayerDeck
                    dealerDealtCard={dealerDealtCard}
                    playerDealtCard={playerDealtCard} />}
                {gameState.game_stage === GameStage.PlayerPickWhiteCard && (
                    <StatusTable playerStatusList={playersExceptDealer} />
                )}
            </Stack>
        </Flex>
    );
};
