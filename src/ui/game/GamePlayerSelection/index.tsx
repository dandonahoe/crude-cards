import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { CA } from '../../../constant/framework/CoreAction';
import { GameAction } from '../../../client/action/game.action';
import { useDispatch } from '../../../client/hook';
import { GameContext } from '../GameContext';
import { GameDeck } from '../GameDeck';
import { Flex } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GamePlayerSelection : RFC = () => {

    const {
        playerCards, playerDealtCard,
    } = useContext(GameContext);

    const dispatch = useDispatch();

    const handlePlayWhiteCard = (card : CardDTO) : CA =>
        dispatch(GameAction.playerSelectCard({
            card_id : card.id,
        }));

    return (
        <Flex
            justify='center'
            align='center'
            mb='xl'>
            {!playerDealtCard &&
                <GameDeck
                    onCardClicked={handlePlayWhiteCard}
                    cards={playerCards} />
            }
        </Flex>
    );
}

