import { GameAction } from '../../../../client/action/game.action';
import { GameBoxCentered } from '../../component/GameBox';
import { GameDeck } from '../../component/GameDeck';
import { GameContext } from '../../GameContext';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';


export const GameDealerSelection = () => {

    const { dealerCards } = useContext(GameContext);
    const dispatch = useDispatch();

    const handleCardClicked = (id : string) =>
        dispatch(GameAction.dealerPickBlackCard({ card_id : id }));

    return (
        <GameBoxCentered>
            <GameDeck
                onCardClicked={handleCardClicked}
                cards={dealerCards}  />
        </GameBoxCentered>
    );
};
