import { selectSelectedCards } from "@app/client/selector/game";
import { GameAction } from "@app/client/action/game.action";
import { useSelector, useDispatch } from "react-redux";
import { GameDeck } from "../../component/GameDeck";
import { GameBox } from "../../component/GameBox";


export const GameDealerJudge = () => {

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
