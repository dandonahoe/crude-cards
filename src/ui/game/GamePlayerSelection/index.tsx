import { GameAction } from '../../../client/action/game.action';
import { CardDTO } from '../../../api/src/game/dtos/card.dto';
import { CA } from '../../../constant/framework/CoreAction';
import { useDispatch } from '../../../client/hook';
import { GameStackType } from '../GameStack/type';
import { GameContext } from '../GameContext';
import { GameStack } from '../GameStack';
import { GameDeck } from '../GameDeck';
import { RFC } from '@app/ui/type';
import { useContext } from 'react';


export const GamePlayerSelection : RFC = () => {

    const { playerCards, playerDealtCard } = useContext(GameContext);
    const dispatch = useDispatch();

    const handlePlayWhiteCard = (card : CardDTO) : CA =>
        dispatch(GameAction.playerSelectCard({
            card_id : card.id,
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

