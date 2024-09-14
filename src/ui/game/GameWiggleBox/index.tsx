import { Flex, Stack } from '@mantine/core';
import { GameDeck } from '../GameDeck';
import { GameStatusTable } from '../GameStatusTable';
import { GameCardContainer } from '../GameCardContainer';
import { usePlayerStatusList, useIsDealer } from './hooks';
import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { useContext } from 'react';
import { GameContext } from '../GameContext';
import { RFC } from '@app/ui/type';

export const GameWaiting: RFC = () => {
    const { dealerDealtCard, playerDealtCard, gameState: { game_stage, dealer_id } } = useContext(GameContext);
    const playerStatusList = usePlayerStatusList();
    const isDealer = useIsDealer();

    const playersExceptDealer = playerStatusList.filter(player => player.player.id !== dealer_id);

    const renderDeck = () => {
        if (isDealer)
            return <GameDeck cards={[dealerDealtCard!]} />;


        return <GameDeck cards={[dealerDealtCard!, playerDealtCard!]} />;
    };

    const renderStatusTable = () => {
        if (game_stage === GameStage.PlayerPickWhiteCard)
            return (
                <GameCardContainer color={CardColor.Black}>
                    <GameStatusTable
                        playerStatusList={playersExceptDealer}
                        shouldShowScore={false}
                        shouldShowDone={true}
                        title='Waiting on Players'/>
                </GameCardContainer>
            );


        return null;
    };

    return (
        <Flex
            justify='center'
            align='center'
            mt='xl'>
            <Stack>
                {renderDeck()}
                {renderStatusTable()}
            </Stack>
        </Flex>
    );
};
