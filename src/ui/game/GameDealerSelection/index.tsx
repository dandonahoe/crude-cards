import { GameAction } from '../../../client/action/game.action';
import { GameContext } from '../GameContext';
import { GameBoxCentered } from '../GameBox';
import { useDispatch } from 'react-redux';
import { GameDeck } from '../GameDeck';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GameDealerSelection : RFC = () => {

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
