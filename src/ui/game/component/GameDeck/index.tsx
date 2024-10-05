import { GameDeckCards } from './GameDeckCards';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameDeck: RFC<Props> = ({
    onCardClicked, cards,
}) =>
    <GameDeckCards
        onCardClicked={onCardClicked}
        cards={cards} />

