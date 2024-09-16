import { GameAction } from '../../../client/action/game.action';
import { useDispatch } from '../../../client/hook';
import { GameStackType } from '../GameStack/type';
import { GameContext } from '../GameContext';
import { GameStack } from '../GameStack';
import { GameDeck } from '../GameDeck';
import { useContext } from 'react';


export const GamePlayerSelection = () => {

    const { playerCards, playerDealtCard } = useContext(GameContext);
    const dispatch = useDispatch();

    const handlePlayWhiteCard = (id : string) =>
        dispatch(GameAction.playerSelectCard({ card_id : id }));

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

