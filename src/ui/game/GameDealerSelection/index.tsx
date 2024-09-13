import { GameAction } from '../../../client/action/game.action';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { CA } from '../../../constant/framework/CoreAction';
import { GameContext } from '../GameContext';
import { GameBoxCentered } from '../GameBox';
import { useDispatch } from 'react-redux';
import { GameDeck } from '../GameDeck';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GameDealerSelection : RFC = () => {

    const { dealerCards } = useContext(GameContext);
    const dispatch = useDispatch();

    const handleCardClicked = (card : CardDTO) : CA =>
        dispatch(GameAction.dealerPickBlackCard({
            card_id : card.id,
        }));

    return (
        <GameBoxCentered>
            <GameDeck
                onCardClicked={handleCardClicked}
                cards={dealerCards}  />
        </GameBoxCentered>
    );
};
