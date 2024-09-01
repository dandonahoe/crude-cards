import { selectSelectedCards } from '@app/client/selector/game';
import { GameAction } from '../../../client/action/game.action';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { useSelector , useDispatch } from '@app/client/hook';
import { CA } from '../../../constant/framework/CoreAction';
import { GameDeck } from '../GameDeck';
import { Flex } from '@mantine/core';
import { RFC } from '@app/ui/type';


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
