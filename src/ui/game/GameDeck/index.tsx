import { GameStackType } from '../GameStack/type';
import { GameCardList } from './GameCardList';
import { GameStack } from '../GameStack';
import { RFC } from '@app/ui/type';
import { Props } from './type';


export const GameDeck: RFC<Props> = ({
    onCardClicked, cards,
}) =>
    <GameStack type={GameStackType.FullHeightCentered}>
        <GameCardList
            onCardClicked={onCardClicked}
            cards={cards} />
    </GameStack>
