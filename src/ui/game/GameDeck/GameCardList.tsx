import { GameWiggleBox } from '../GameWiggleBox';
import { GameCardListProps } from './type';
import { GameCard } from '../GameCard';
import { RFC } from '@app/ui/type';


export const GameCardList: RFC<GameCardListProps> = ({
    cards, onCardClicked,
}) =>
    cards.map((card, index) => (
        <GameWiggleBox
            index={index}
            key={index}>
            <GameCard
                onClick={onCardClicked}
                card={card} />
        </GameWiggleBox>));
