import { CardColor } from '../../../api/src/constant/card-color.enum';
import { GameCardContainer } from '../GameCardContainer';
import { GameText } from '../GameText';
import { FoeListProps } from './type';
import { List } from '@mantine/core';
import { GameFoe } from '../GameFoe';
import { RFC } from '../../type';

export const FoeList : RFC<FoeListProps> = ({
    foes, gameCode,
}) =>
    <GameCardContainer color={CardColor.White}>
        {foes.length === 0 ? (
            <GameText>
                {`No Players Yet, Share Game Code "${gameCode}" to Invite People`}
            </GameText>
        ) : (
            <>
                <GameText>
                    {'Other Players'}
                </GameText>
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
