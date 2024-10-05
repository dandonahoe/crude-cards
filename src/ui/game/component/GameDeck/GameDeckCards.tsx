import { GameCardListProps } from './type';
import { GameCardDTO } from '../GameCard';
import { RFC } from '@app/ui/type';


export const GameDeckCards: RFC<GameCardListProps> = ({
    cards, onCardClicked,
}) =>
    cards.map((card, index) =>
        <GameCardDTO
            onClick={onCardClicked}
            card={card}
            key={index} />,
    );
