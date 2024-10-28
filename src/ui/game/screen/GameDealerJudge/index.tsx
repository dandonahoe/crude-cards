import { selectSelectedCardsByGameId } from '../../../../client/selector/game';
import { SpecialId } from '../../../../constant/framework/SpecialId';
import { GameAction } from "@app/client/action/game.action";
import { useSelector, useDispatch } from '@app/client/hook';
import { GameDeck } from "../../component/GameDeck";
import { GameBox } from "../../component/GameBox";


export const GameDealerJudge = () => {

    const selectedCards = useSelector(state => selectSelectedCardsByGameId(state, SpecialId.DefaultGameId));
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
