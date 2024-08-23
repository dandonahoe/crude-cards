import { selectSelectedCards } from '@app/client/selector/game';
import { useSelector , useDispatch } from '@app/client/hook';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { GameAction } from '@app/client/action/game';
import { GameDeck } from '../GameDeck';
import { Flex } from '@mantine/core';
import { RFC } from '@app/ui/type';
import { CA } from '../../../constant/framework/CoreAction';


export const GameDealerJudge : RFC = () => {

    const selectedCards = useSelector(selectSelectedCards);

    const dispatch = useDispatch();

    const handleCardClicked = (card : CardDTO) : CA =>
        dispatch(GameAction.dealerPickWinner({
            card_id : card.id,
        }));

    return (
        <Flex
            justify='center'
            align='center'>
            <GameDeck
                onCardClicked={handleCardClicked}
                cards={selectedCards} />
        </Flex>
    );
}
