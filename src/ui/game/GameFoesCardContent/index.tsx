import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameCardContainer } from '../GameCardContainer';
import { GameDeckLayout } from '../GameDeckLayout';
import { GameContext } from '../GameContext';
import { Stack, Text } from '@mantine/core';
import { GameFoe } from '../GameFoe';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Props } from './type';
import { GameText } from '../GameText';


export const GameFoesCardContent : RFC<Props> = ({
    foes,
}) => {

    const { gameState } = useContext(GameContext);

    if(foes.length === 0)
        return (
            <Text
                m='xl'
                fw={600}
                ta='center'
                fz='md'>
                {`No Players Yet, Share Game Code "${gameState.game_code}" to Invite People`}
            </Text>
        );

    return (
        <Stack
            justify='center'
            align='center'
            mt='xl'
            mb='xl'>
            <GameDeckLayout
                color={CardColor.Black}
                cards={[
                    <GameCardContainer
                        key='one'
                        color={CardColor.White}>
                        <>
                            <GameText>
                                {'Other Players'}
                            </GameText>
                            {foes.length < 2 &&
                                <GameText size='sm'>
                                    {'Minimum 3 Players 123'}
                                </GameText>
                            }
                        </>
                    </GameCardContainer>,
                    <GameCardContainer
                        key='two'
                        color={CardColor.White}>
                        <GameText>
                            {'Other Players'}
                        </GameText>
                    </GameCardContainer>,
                ]} />


            {foes.map(player =>
                <GameFoe
                    player={player ?? 'Invalid Player'}
                    key={player.id} />)}
        </Stack>
    );
}

