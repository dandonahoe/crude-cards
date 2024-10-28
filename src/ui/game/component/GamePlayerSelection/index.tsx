import { GameBoardContext } from '../../../GameBoardContext';
import { GameAction } from '@app/client/action/game.action';
import { GameStackType } from '../GameStack/type';
import { useDispatch } from 'react-redux';
import { GameStack } from '../GameStack';
import { GameDeck } from '../GameDeck';
import { useContext } from 'react';


export const GamePlayerSelection = () => {

    const {
        playerCards, playerDealtCard, gameStateDTO : { game_code },
    } = useContext(GameBoardContext);

    const dispatch = useDispatch();

    const handlePlayWhiteCard = (card_id : string) =>
        dispatch(GameAction.webPlayerSelectCard({
            game_code, card_id,
        }));

    return (
        <GameStack type={GameStackType.Centered}>
            {!playerDealtCard &&
                <GameDeck
                    onCardClicked={handlePlayWhiteCard}
                    cards={playerCards} />
            }
        </GameStack>
    );
}

