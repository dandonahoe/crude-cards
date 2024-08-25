import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameStage } from '../../../api/src/constant/game-stage.enum';
import { UsernameCardContent } from '../UsernameCardContent/index';
import { selectFoes } from '../../../client/selector/game';
import { GameCardContainer } from '../GameCardContainer';
import { ShareCardContent } from '../ShareCardContent';
import { GameDeckLayout } from '../GameDeckLayout';
import { Flex, List, Text } from '@mantine/core';
import { useSelector } from '@app/client/hook';
import { GameContext } from '../GameContext';
import { GameFoe } from '../GameFoe';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GameLobby: RFC = () => {

    const foes = useSelector(selectFoes);

    const foeCount = foes.length;

    const { gameState } = useContext(GameContext);

    const warningMessage = foes.length >= 2
        ? null
        : (
            <GameCardContainer color={CardColor.Black}>
                <Text
                    fw={600}
                    mb='xl'>
                    {'Minimum 3 Players'}
                </Text>
                <Text
                    ta='center'
                    fz='sm'
                    fw={600}>
                    {`Need ${2 - foes.length} more players`}
                </Text>
            </GameCardContainer>
        );

    const shareCard = gameState.game_stage === GameStage.DealerPickBlackCard
        ? null
        : (
            <GameCardContainer
                color={CardColor.Black}
                isClickable={true}>
                <ShareCardContent />
            </GameCardContainer>
        );

    return (
        <Flex
            justify='center'
            align='center'>
            <GameDeckLayout
                verticleWiggleFactor={100}
                cardOverlapFactor={400}
                color={CardColor.Black}
                wiggleFactor={40}
                tiltFactor={10}
                cards={[
                    shareCard,
                    <GameCardContainer
                        key='two'
                        color={CardColor.White}>
                        <UsernameCardContent />
                    </GameCardContainer>,
                    warningMessage,
                    <GameCardContainer
                        key='foes'
                        color={CardColor.White}>
                        {foeCount === 0 &&
                            <Text
                                m='xl'
                                fw={600}
                                ta='center'
                                fz='md'>
                                {`No Players Yet, Share Game Code "${gameState.game_code}" to Invite People`}
                            </Text>
                        }
                        {foeCount > 0 &&
                            <>
                                <Text
                                    size='md'
                                    fw={600}
                                    mt='xl'
                                    mb='md'>
                                    {'Other Players'}
                                </Text>
                                <List>
                                    {foes.map(player =>
                                        <List.Item key={player.id}>
                                            <GameFoe player={player ?? 'Invalid Player'} />
                                        </List.Item>,
                                    )}
                                </List>
                            </>
                        }
                    </GameCardContainer>,
            ]} />
        </Flex>
    );
};
