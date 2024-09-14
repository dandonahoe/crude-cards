import { Flex, Stack } from '@mantine/core';
import { useContext } from 'react';
import { GameContext } from '../GameContext';
import { useIsDealer, usePlayerStatusList } from './hooks';
import { DeckRenderer } from './DeckRenderer';
import { StatusTableRenderer } from './StatusTableRenderer';


export const GameWaiting = () => {
    const { dealerDealtCard, playerDealtCard, gameState: { game_stage, dealer_id } } = useContext(GameContext);
    const playerStatusList = usePlayerStatusList();
    const isDealer = useIsDealer();
    const playersExceptDealer = playerStatusList.filter(player => player.player.id !== dealer_id);

    return (
        <Flex
            justify='center'
            align='center'
            mt='xl'>
            <Stack>
                <DeckRenderer
                    isDealer={isDealer}
                    dealerDealtCard={dealerDealtCard}
                    playerDealtCard={playerDealtCard}/>
                <StatusTableRenderer
                    gameStage={game_stage}
                    playersExceptDealer={playersExceptDealer}/>
            </Stack>
        </Flex>
    );
};
