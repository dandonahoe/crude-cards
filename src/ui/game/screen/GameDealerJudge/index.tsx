import { selectSelectedCardsByGameId } from '../../../../client/selector/game';
import { SpecialId } from '../../../../constant/framework/SpecialId';
import { GameBoardContext } from '../../../GameBoardContext';
import { GameAction } from "@app/client/action/game.action";
import { useSelector, useDispatch } from '@app/client/hook';
import { GameDeck } from "../../component/GameDeck";
import { GameBox } from "../../component/GameBox";
import { useContext } from 'react';


export const GameDealerJudge = () => {

    const { gameStateDTO : { game_code }} = useContext(GameBoardContext);

    const selectedCards = useSelector(state => selectSelectedCardsByGameId(state, SpecialId.DefaultGameCode));
    const dispatch      = useDispatch();

    const handleCardClicked = (card_id : string) =>
        dispatch(GameAction.webDealerPickWinner({
            card_id, game_code,
        }));

    return (
        <GameBox>
            <GameDeck
                onCardClicked={handleCardClicked}
                cards={selectedCards} />
        </GameBox>
    );
}
