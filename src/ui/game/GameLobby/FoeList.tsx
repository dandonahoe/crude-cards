import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameCardContainer } from '../GameCardContainer';
import { List, Text } from '@mantine/core';
import { FoeListProps } from './type';
import { GameFoe } from '../GameFoe';
import { RFC } from '../../type';

export const FoeList : RFC<FoeListProps> = ({ foes, gameCode }) =>
    <GameCardContainer color={CardColor.White}>
        {foes.length === 0 ? (
            <Text
                m='xl'
                fw={600}
                ta='center'
                fz='md'>
                {`No Players Yet, Share Game Code "${gameCode}" to Invite People`}
            </Text>
        ) : (
            <>
                <Text
                    size='md'
                    fw={600}
                    mt='xl'
                    mb='md'>{'Other Players'}</Text>
                <List>
                    {foes.map(player => (
                        <List.Item key={player.id}>
                            <GameFoe player={player} />
                        </List.Item>
                    ))}
                </List>
            </>
        )}
    </GameCardContainer>;
