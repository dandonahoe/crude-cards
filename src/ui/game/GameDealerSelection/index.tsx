import { GameAction } from '../../../client/action/game';
import { CA } from '../../../constant/framework/CoreAction';
import { GameContext } from '../GameContext';
import { useDispatch } from 'react-redux';
import { GameDeck } from '../GameDeck';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';
import { Flex } from '@mantine/core';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';


export const GameDealerSelection : RFC = () => {

    const { dealerCards } = useContext(GameContext);

    const dispatch = useDispatch();

    const handleCardClicked = (card : CardDTO) : CA =>
        dispatch(GameAction.dealerPickBlackCard({
            card_id : card.id,
        }));

    return (
        <Flex
            justify='center'
            align='center'>

            <GameDeck
                onCardClicked={handleCardClicked}
                cards={dealerCards}  />
        </Flex>
    );
};
