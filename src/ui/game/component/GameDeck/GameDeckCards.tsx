import { GameCardListProps } from './type';
import { GameCard } from '../GameCard';
import { RFC } from '@app/ui/type';
import { GameCardType } from '../../type';
import { GameText } from '../GameText';


export const GameDeckCards: RFC<GameCardListProps> = ({
    cards, onCardClicked,
}) =>
    cards.map((card, index) =>
        <GameCard
            onClick={onCardClicked}
            cardType={GameCardType.Children}
            card={card}
            key={index}
            id={`${card.id}_${index}`}>
            <GameText>
                {card.text}
            </GameText>
        </GameCard>,
    );
