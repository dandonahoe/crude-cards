import { GameAction } from '../../../../client/action/game.action';
import { GameBoardContext } from '../../../GameBoardContext';
import { GameBoxCentered } from '../../component/GameBox';
import { GameDeck } from '../../component/GameDeck';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';


export const GameDealerSelection = () => {

    const dispatch = useDispatch();

    const { dealerCards } = useContext(GameBoardContext);
    const { gameStateDTO : { game_code }} = useContext(GameBoardContext);

    const handleCardClicked = (card_id : string) =>
        dispatch(GameAction.webDealerPickBlackCard({
            card_id, game_code,
        }));

    return (
        <GameBoxCentered>
            <GameDeck
                onCardClicked={handleCardClicked}
                cards={dealerCards}  />
        </GameBoxCentered>
    );
};
