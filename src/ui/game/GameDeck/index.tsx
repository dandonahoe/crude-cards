import { GameStackType } from '../GameStack/type';
import { GameCardList } from './GameDeckCards';
import { GameStack } from '../GameStack';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameDeck: RFC<Props> = ({
    onCardClicked, cards,
}) =>

    <GameCardList
        onCardClicked={onCardClicked}
        cards={cards} />

