import { selectSelectedCards } from '@app/client/selector/game';
import { GameAction } from '../../../client/action/game.action';
import { useSelector , useDispatch } from '@app/client/hook';
import { GameDeck } from '../GameDeck';
import { GameBox } from '../GameBox';
import { RFC } from '@app/ui/type';


export const GameDealerJudge : RFC = () => {

    const selectedCards = useSelector(selectSelectedCards);
    const dispatch      = useDispatch();

    const handleCardClicked = (id : string) =>
        dispatch(GameAction.dealerPickWinner({ card_id : id }));

    return (
        <GameBox>
            <GameDeck
                onCardClicked={handleCardClicked}
                cards={selectedCards} />
        </GameBox>
    );
}
